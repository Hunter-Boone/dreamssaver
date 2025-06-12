"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, Moon, Brain, Shield } from "lucide-react";
import { useAuthSession } from "@/lib/hooks/useAuthSession";
import { signInWithGoogle } from "@/lib/auth/supabaseAuth";
import { supabase } from "@/lib/db/supabaseClient";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [firstDream, setFirstDream] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, loading } = useAuthSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect if already authenticated
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  // Show a loading state or nothing while checking auth/redirecting
  if (loading || user) {
    return (
      <div className="flex items-center justify-center h-screen dream-gradient">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-dreamy-lavender-400"></div>
      </div>
    );
  }

  const handleSubmitFirstDream = async () => {
    if (!firstDream.trim()) {
      setError("Please describe your dream before continuing");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Sign in with Google
      await signInWithGoogle();

      // Store the first dream in localStorage temporarily
      // It will be saved after authentication completes
      localStorage.setItem("firstDream", firstDream);
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Failed to sign up. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen dream-gradient">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-semibold text-dreamy-lavender-900 mb-6 leading-tight">
              Dreams Saver
            </h1>
            <p className="text-xl sm:text-2xl text-soft-gray-600 mb-8 leading-relaxed">
              Unlock the secrets of your dreams with AI insights
            </p>
            <p className="text-lg text-soft-gray-500 mb-12 max-w-2xl mx-auto">
              Track your dreams, discover patterns, and gain meaningful insights
              with the power of artificial intelligence. Start your journey of
              self-discovery today.
            </p>
          </div>
        </div>
      </section>

      {/* Dream Submission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="dream-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-dreamy-lavender-800">
                Share Your First Dream
              </CardTitle>
              <CardDescription className="text-soft-gray-600">
                Describe a recent dream to get started with your journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Textarea
                placeholder="I dreamed that I was flying over a beautiful landscape..."
                value={firstDream}
                onChange={(e) => setFirstDream(e.target.value)}
                className="min-h-32 dream-input text-lg"
                disabled={isSubmitting}
              />

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <Button
                onClick={handleSubmitFirstDream}
                disabled={isSubmitting || !firstDream.trim()}
                className="w-full dream-button text-lg py-6"
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Creating Your Account...
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-5 w-5" />
                    Submit Dream & Sign Up
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-soft-gray-500">
                Already have an account?{" "}
                <button
                  onClick={() => signInWithGoogle()}
                  className="text-dreamy-lavender-600 hover:underline"
                >
                  Sign In
                </button>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-serif text-center text-dreamy-lavender-900 mb-16">
            Why Dreams Saver?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="dream-card text-center">
              <CardContent className="pt-8">
                <Brain className="h-12 w-12 text-dreamy-lavender-600 mx-auto mb-4" />
                <h3 className="text-xl font-serif mb-3 text-dreamy-lavender-800">
                  AI Insights
                </h3>
                <p className="text-soft-gray-600">
                  Get personalized interpretations of your dreams using advanced
                  AI technology
                </p>
              </CardContent>
            </Card>

            <Card className="dream-card text-center">
              <CardContent className="pt-8">
                <Moon className="h-12 w-12 text-serene-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-serif mb-3 text-dreamy-lavender-800">
                  Track Patterns
                </h3>
                <p className="text-soft-gray-600">
                  Discover recurring themes and patterns in your dream world
                  over time
                </p>
              </CardContent>
            </Card>

            <Card className="dream-card text-center">
              <CardContent className="pt-8">
                <Shield className="h-12 w-12 text-dawn-peach-600 mx-auto mb-4" />
                <h3 className="text-xl font-serif mb-3 text-dreamy-lavender-800">
                  Private & Secure
                </h3>
                <p className="text-soft-gray-600">
                  Your dreams are safely stored and never shared. Complete
                  privacy guaranteed
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-dreamy-lavender-900 mb-8">
            Simple Pricing
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="dream-card">
              <CardHeader>
                <CardTitle className="text-dreamy-lavender-800">Free</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-dreamy-lavender-900 mb-4">
                  $0
                </div>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center">
                    <Sparkles className="h-4 w-4 text-dreamy-lavender-600 mr-2" />
                    Unlimited dream recording
                  </li>
                  <li className="flex items-center">
                    <Sparkles className="h-4 w-4 text-dreamy-lavender-600 mr-2" />
                    5 free AI insights
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="dream-card border-dreamy-lavender-300">
              <CardHeader>
                <CardTitle className="text-dreamy-lavender-800">
                  Premium
                </CardTitle>
                <CardDescription>
                  Unlimited insights and analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-dreamy-lavender-900 mb-4">
                  $8<span className="text-lg text-soft-gray-600">/month</span>
                </div>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center">
                    <Sparkles className="h-4 w-4 text-dreamy-lavender-600 mr-2" />
                    Everything in Free
                  </li>
                  <li className="flex items-center">
                    <Sparkles className="h-4 w-4 text-dreamy-lavender-600 mr-2" />
                    Unlimited AI insights
                  </li>
                  <li className="flex items-center">
                    <Sparkles className="h-4 w-4 text-dreamy-lavender-600 mr-2" />
                    Advanced pattern analysis
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
