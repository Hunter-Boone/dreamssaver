import { FREE_TIER_INSIGHTS_LIMIT } from "@/config/dashboard";

export const constants = {
  AI_INSIGHTS: {
    FREE_LIMIT: FREE_TIER_INSIGHTS_LIMIT,
    PREMIUM_UNLIMITED: -1,
  },
  SUBSCRIPTION: {
    PRICE_MONTHLY: 8,
    CURRENCY: "USD",
    STRIPE_PRODUCT_ID: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_ID || "",
    STRIPE_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || "",
  },
  LIMITS: {
    DREAM_DESCRIPTION_MAX: 5000,
    DREAM_TITLE_MAX: 255,
    TAGS_MAX: 10,
    TAG_LENGTH_MAX: 50,
  },
  API_ENDPOINTS: {
    DREAMS: "/api/dreams",
    INSIGHTS: "/api/insights",
    TAGS: "/api/tags",
    STRIPE_WEBHOOK: "/api/webhook/stripe",
  },
} as const;

export type Constants = typeof constants;
