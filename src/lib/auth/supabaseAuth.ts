import { supabase } from "@/lib/db/supabaseClient";
import { User } from "@supabase/supabase-js";

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

// Create or update user profile after authentication
export async function createUserProfile(user: User) {
  // First check if user already exists
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (existingUser) {
    // User exists, just update email and timestamp
    const { data, error } = await supabase
      .from("users")
      .update({
        email: user.email!,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } else {
    // New user, create with default values
    const { data, error } = await supabase
      .from("users")
      .insert({
        id: user.id,
        email: user.email!,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        subscription_status: "free",
        ai_insights_used_count: 0,
        ai_insight_limit: 5,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }
}
