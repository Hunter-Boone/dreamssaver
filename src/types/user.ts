export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  subscription_status: "free" | "subscribed" | "cancelled" | "past_due" | null;
  stripe_customer_id: string | null;
  ai_insights_used_count: number | null;
  ai_insight_limit: number | null;
}

export interface UserProfile extends User {
  dreams_count?: number;
  insights_remaining?: number;
}
