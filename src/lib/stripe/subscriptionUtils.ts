import { supabase } from '@/lib/db/supabaseClient'
import { User } from '@/types/user'

export async function updateUserSubscription(
  userId: string, 
  subscriptionStatus: 'free' | 'subscribed' | 'cancelled' | 'past_due',
  stripeCustomerId?: string
) {
  const updateData: any = {
    subscription_status: subscriptionStatus,
    updated_at: new Date().toISOString(),
  }

  if (stripeCustomerId) {
    updateData.stripe_customer_id = stripeCustomerId
  }

  // Reset insight count if becoming premium
  if (subscriptionStatus === 'subscribed') {
    updateData.ai_insight_count = 0
    updateData.ai_insight_limit = -1 // -1 indicates unlimited
  } else if (subscriptionStatus === 'free') {
    updateData.ai_insight_limit = 5
  }

  const { data, error } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export function canUserAccessAIInsights(user: User): boolean {
  if (user.subscription_status === 'subscribed') {
    return true
  }
  
  return user.ai_insight_count < user.ai_insight_limit
}

export function getRemainingInsights(user: User): number {
  if (user.subscription_status === 'subscribed') {
    return -1 // Unlimited
  }
  
  return Math.max(0, user.ai_insight_limit - user.ai_insight_count)
}

export async function incrementUserInsightCount(userId: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .update({
      ai_insight_count: supabase.raw('ai_insight_count + 1'),
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)

  if (error) {
    throw error
  }
}
