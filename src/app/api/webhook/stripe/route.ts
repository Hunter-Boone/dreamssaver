import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe/stripeClient";
import { createClient } from "@supabase/supabase-js";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = headers();
    const signature = headersList.get("stripe-signature")!;

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Use service role client for webhooks to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        console.log("Checkout session completed:", session.id);

        // Get the customer and subscription details
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;
        const userId = session.metadata?.userId;

        if (!userId) {
          console.error("No userId found in session metadata");
          break;
        }

        // Update user record with Stripe customer ID and premium status
        const { error: updateError } = await supabase
          .from("users")
          .update({
            stripe_customer_id: customerId,
            is_premium: true,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId);

        if (updateError) {
          console.error("Error updating user:", updateError);
        } else {
          console.log(`User ${userId} updated with customer ID ${customerId}`);
        }
        break;

      case "customer.subscription.updated":
        const subscription = event.data.object;
        console.log("Subscription updated:", subscription.id);

        // Find user by customer ID and update subscription status
        const { data: user } = await supabase
          .from("users")
          .select("id")
          .eq("stripe_customer_id", subscription.customer)
          .single();

        if (user) {
          const isPremium = subscription.status === "active";
          const { error } = await supabase
            .from("users")
            .update({
              is_premium: isPremium,
              updated_at: new Date().toISOString(),
            })
            .eq("id", user.id);

          if (error) {
            console.error("Error updating premium status:", error);
          } else {
            console.log(
              `User ${user.id} premium status updated to ${isPremium}`
            );
          }
        }
        break;

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object;
        console.log("Subscription deleted:", deletedSubscription.id);

        // Find user by customer ID and set to free
        const { data: freeUser } = await supabase
          .from("users")
          .select("id")
          .eq("stripe_customer_id", deletedSubscription.customer)
          .single();

        if (freeUser) {
          const { error } = await supabase
            .from("users")
            .update({
              is_premium: false,
              updated_at: new Date().toISOString(),
            })
            .eq("id", freeUser.id);

          if (error) {
            console.error("Error updating subscription to free:", error);
          } else {
            console.log(`User ${freeUser.id} premium status set to false`);
          }
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
