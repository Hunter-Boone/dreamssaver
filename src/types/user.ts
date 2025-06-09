export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  subscription_status: 'free' | 'subscribed' | 'cancelled' | 'past_due';
  stripe_customer_id?: string;
  ai_insight_count: number;
  ai_insight_limit: number;
}

export interface UserProfile extends User {
  dreams_count?: number;
  insights_remaining?: number;
}
