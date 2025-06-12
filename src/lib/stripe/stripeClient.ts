import Stripe from "stripe";
import { constants } from "@/lib/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
  appInfo: {
    name: "Dreams Saver",
    version: "1.0.0",
  },
});

export { stripe };

export async function createCheckoutSession(userId: string, userEmail: string) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer_email: userEmail,
      line_items: [
        {
          price: constants.SUBSCRIPTION.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/subscription?canceled=true`,
      metadata: {
        userId,
      },
    });

    return session;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error("Failed to create checkout session");
  }
}

export async function createCustomerPortalSession(customerId: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/subscription`,
    });

    return session;
  } catch (error) {
    console.error("Error creating customer portal session:", error);
    throw new Error("Failed to create customer portal session");
  }
}
