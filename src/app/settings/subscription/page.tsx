"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthSession } from "@/lib/hooks/useAuthSession";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Crown, Sparkles, Check, ExternalLink } from "lucide-react";
import {
  createCheckoutSession,
  createCustomerPortalSession,
} from "@/lib/stripe/stripeClient";

export default function SubscriptionPage() {
  const { user, appUser, isPremium, refreshAppUser } = useAuthSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpgrade = async () => {
    if (!user || !appUser) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          userEmail: user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      setError(
        error instanceof Error ? error.message : "Failed to start checkout"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!appUser?.stripe_customer_id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/customer-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: appUser.stripe_customer_id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to create customer portal session"
        );
      }

      // Redirect to Stripe Customer Portal
      window.location.href = data.url;
    } catch (error) {
      console.error("Error accessing customer portal:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to access billing portal"
      );
    } finally {
      setLoading(false);
    }
  };

  const remainingInsights = appUser
    ? isPremium
      ? -1
      : Math.max(
          0,
          (appUser.ai_insight_limit ?? 5) -
            (appUser.ai_insights_used_count ?? 0)
        )
    : 0;

  return (
    <div className="min-h-screen dream-gradient">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-serif text-dreamy-lavender-900">
              Subscription
            </h1>
            <p className="text-soft-gray-600">
              Manage your Dreams Saver subscription
            </p>
          </div>
        </div>

        {/* Current Plan Status */}
        <Card className="dream-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {isPremium ? (
                <>
                  <Crown className="h-5 w-5 text-whisper-gold-600" />
                  <span>Premium Plan</span>
                  <Badge className="bg-whisper-gold-100 text-whisper-gold-800">
                    Active
                  </Badge>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 text-dreamy-lavender-600" />
                  <span>Free Plan</span>
                  <Badge variant="secondary">Current</Badge>
                </>
              )}
            </CardTitle>
            <CardDescription>
              {isPremium
                ? "You have unlimited access to AI insights and premium features"
                : `You have ${remainingInsights} out of 5 free AI insights remaining`}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {isPremium ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Unlimited AI insights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Advanced pattern analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Priority support</span>
                </div>

                {appUser?.stripe_customer_id && (
                  <Button
                    onClick={handleManageSubscription}
                    disabled={loading}
                    variant="outline"
                    className="mt-4"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Manage Billing
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Unlimited dream recording</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>5 free AI insights</span>
                </div>
                <div className="flex items-center space-x-2 text-soft-gray-500">
                  <span className="h-4 w-4 mr-2">×</span>
                  <span>Advanced pattern analysis</span>
                </div>
                <div className="flex items-center space-x-2 text-soft-gray-500">
                  <span className="h-4 w-4 mr-2">×</span>
                  <span>Unlimited AI insights</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upgrade Section */}
        {!isPremium && (
          <Card className="dream-card border-dreamy-lavender-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-whisper-gold-600" />
                <span>Upgrade to Premium</span>
              </CardTitle>
              <CardDescription>
                Unlock unlimited AI insights and advanced features
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-dreamy-lavender-900 mb-2">
                  $8<span className="text-lg text-soft-gray-600">/month</span>
                </div>
                <p className="text-soft-gray-600">
                  Billed monthly, cancel anytime
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Everything in Free plan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>
                    <strong>Unlimited AI insights</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Advanced dream pattern analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Priority customer support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Future premium features</span>
                </div>
              </div>

              <Button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full dream-button text-lg py-6"
                size="lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Crown className="h-5 w-5 mr-2" />
                    Upgrade to Premium
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-soft-gray-500">
                Secure payment processed by Stripe. Cancel anytime.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Card className="border-red-200 bg-red-50 mt-6">
            <CardContent className="pt-6">
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
