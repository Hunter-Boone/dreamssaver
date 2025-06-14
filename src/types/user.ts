export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  is_premium: boolean;
  stripe_customer_id: string | null;
  ai_insights_used_count: number | null;
  ai_insight_limit: number | null;
}

export interface UserProfile extends User {
  dreams_count?: number;
  insights_remaining?: number;
}
