"use client";

import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/db/supabaseClient";
import { User as AppUser } from "@/types/user";

export function useAuthSession() {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let mounted = true; // Track if component is still mounted
    let profileFetchInProgress = false; // Track if profile fetch is in progress

    console.log(
      "%c[useAuthSession] Hook mounted. Setting up auth listener.",
      "color: orange"
    );

    // Helper function to safely set loading state
    const safeSetLoading = (loadingState: boolean) => {
      if (mounted && !profileFetchInProgress) {
        console.log(
          `%c[useAuthSession] Setting loading to ${loadingState}`,
          "color: blue"
        );
        setLoading(loadingState);
      }
    };

    // Helper function to fetch user profile
    const fetchUserProfile = async (userId: string, context: string) => {
      if (!mounted || profileFetchInProgress) return;

      profileFetchInProgress = true;
      console.log(
        `[useAuthSession] Fetching user profile from DB... (${context})`
      );

      try {
        const { data: profile, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .single();

        if (!mounted) {
          console.log(
            "[useAuthSession] Component unmounted during profile fetch"
          );
          return;
        }

        if (error) {
          console.error(
            `[useAuthSession] Error fetching user profile (${context}):`,
            error
          );
          setAppUser(null);
        } else {
          console.log(
            `[useAuthSession] Profile fetched (${context}):`,
            profile
          );
          setAppUser(profile);
        }
      } catch (err) {
        console.error(
          `[useAuthSession] Exception in profile fetch (${context}):`,
          err
        );
        if (mounted) setAppUser(null);
      } finally {
        profileFetchInProgress = false;
        if (mounted) {
          console.log(
            `%c[useAuthSession] Profile fetch complete (${context}), setting loading to false.`,
            "color: lightgreen"
          );
          setLoading(false);
          setInitializing(false);
        }
      }
    };

    // First, try to get the current session
    const initializeAuth = async () => {
      console.log("[useAuthSession] Checking for existing session...");

      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (!mounted) return; // Don't update state if unmounted

        if (error) {
          console.error("[useAuthSession] Error getting session:", error);
          safeSetLoading(false);
          setInitializing(false);
          return;
        }

        if (session?.user) {
          console.log(
            "[useAuthSession] Existing session found. User:",
            session.user.id
          );
          setUser(session.user);
          await fetchUserProfile(session.user.id, "initial");
        } else {
          console.log("[useAuthSession] No existing session found.");
          safeSetLoading(false);
          setInitializing(false);
        }
      } catch (err) {
        console.error("[useAuthSession] Exception in initializeAuth:", err);
        if (mounted) {
          safeSetLoading(false);
          setInitializing(false);
        }
      }
    };

    // Initialize auth state
    initializeAuth();

    // Then set up the listener for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event: string, session: Session | null) => {
        console.log(
          `%c[useAuthSession] onAuthStateChange event: ${event}`,
          "color: yellow"
        );

        if (!mounted) return; // Don't update state if unmounted

        // Skip processing if we're still initializing and this is a SIGNED_IN event
        // This prevents duplicate processing during initial load
        if (initializing && event === "SIGNED_IN") {
          console.log(
            "[useAuthSession] Skipping SIGNED_IN during initialization"
          );
          return;
        }

        if (session?.user) {
          console.log("[useAuthSession] Session found. User:", session.user.id);
          setUser(session.user);
          await fetchUserProfile(session.user.id, `auth-change-${event}`);
        } else {
          console.log("[useAuthSession] No session found.");
          setUser(null);
          setAppUser(null);
          profileFetchInProgress = false; // Reset the flag
          safeSetLoading(false);
          setInitializing(false);
        }
      }
    );

    return () => {
      mounted = false; // Mark as unmounted
      profileFetchInProgress = false; // Reset the flag
      console.log(
        "%c[useAuthSession] Hook unmounted. Unsubscribing from auth listener.",
        "color: red"
      );
      subscription.unsubscribe();
    };
  }, []);

  const refreshAppUser = async () => {
    if (user) {
      const { data: profile, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error) {
        setAppUser(profile);
      }
    }
  };

  return {
    user,
    appUser,
    loading,
    refreshAppUser,
    isAuthenticated: !!user,
    isPremium: appUser?.is_premium || false,
  };
}
