import { supabase } from "@/lib/db/supabaseClient";
import type { SupabaseClient } from "@supabase/supabase-js";
import { User } from "@/types/user";

export async function updateUserSubscription(
  userId: string,
  isPremium: boolean,
  stripeCustomerId?: string
) {
  const updateData: any = {
    is_premium: isPremium,
    updated_at: new Date().toISOString(),
  };

  if (stripeCustomerId) {
    updateData.stripe_customer_id = stripeCustomerId;
  }

  // Reset insight count if becoming premium
  if (isPremium) {
    updateData.ai_insights_used_count = 0;
    updateData.ai_insight_limit = -1; // -1 indicates unlimited
  } else {
    updateData.ai_insight_limit = 5;
  }

  const { data, error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export function canUserAccessAIInsights(user: User): boolean {
  if (user.is_premium) {
    return true;
  }

  // Provide fallback values for null/undefined fields
  const insightCount = user.ai_insights_used_count ?? 0;
  const insightLimit = user.ai_insight_limit ?? 5;

  return insightCount < insightLimit;
}

export function getRemainingInsights(user: User): number {
  if (user.is_premium) {
    return -1; // Unlimited
  }

  // Provide fallback values for null/undefined fields
  const insightCount = user.ai_insights_used_count ?? 0;
  const insightLimit = user.ai_insight_limit ?? 5;

  return Math.max(0, insightLimit - insightCount);
}

export async function incrementUserInsightCount(
  userId: string,
  supabaseClient?: SupabaseClient
): Promise<void> {
  const client = supabaseClient || supabase;

  // First get current count
  const { data: user, error: fetchError } = await client
    .from("users")
    .select("ai_insights_used_count")
    .eq("id", userId)
    .maybeSingle();

  if (fetchError) {
    throw fetchError;
  }

  // If user doesn't exist in users table, create them first
  if (!user) {
    const { error: createError } = await client.from("users").insert({
      id: userId,
      email: "", // This will need to be filled by a separate process
      ai_insights_used_count: 1,
      ai_insight_limit: 5,
      is_premium: false,
    });

    if (createError) {
      throw createError;
    }
    return;
  }

  // Increment by 1
  const { error } = await client
    .from("users")
    .update({
      ai_insights_used_count: (user.ai_insights_used_count ?? 0) + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) {
    throw error;
  }
}
