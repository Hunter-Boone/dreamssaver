import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/supabaseAuth'
import { createCheckoutSession } from '@/lib/stripe/stripeClient'

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { userId, userEmail } = body

    if (userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const session = await createCheckoutSession(userId, userEmail)
    
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ 
      error: 'Failed to create checkout session' 
    }, { status: 500 })
  }
}
