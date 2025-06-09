import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/supabaseAuth'
import { createCustomerPortalSession } from '@/lib/stripe/stripeClient'

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { customerId } = body

    if (!customerId) {
      return NextResponse.json({ error: 'Customer ID required' }, { status: 400 })
    }

    const session = await createCustomerPortalSession(customerId)
    
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating customer portal session:', error)
    return NextResponse.json({ 
      error: 'Failed to create customer portal session' 
    }, { status: 500 })
  }
}
