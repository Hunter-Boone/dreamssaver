'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/db/supabaseClient'
import { createUserProfile } from '@/lib/auth/supabaseAuth'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          router.push('/')
          return
        }

        if (data.session?.user) {
          // Create or update user profile
          await createUserProfile(data.session.user)
          
          // Check if there's a first dream to save
          const firstDream = localStorage.getItem('firstDream')
          if (firstDream) {
            // Save the first dream
            const dreamData = {
              user_id: data.session.user.id,
              description: firstDream,
              dream_date: new Date().toISOString().split('T')[0],
              mood_upon_waking: 'Neutral' as const,
              is_lucid: false,
            }

            await supabase.from('dreams').insert(dreamData)
            
            // Clear the stored dream
            localStorage.removeItem('firstDream')
          }
          
          router.push('/dashboard')
        } else {
          router.push('/')
        }
      } catch (error) {
        console.error('Error in auth callback:', error)
        router.push('/')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen dream-gradient flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dreamy-lavender-600 mx-auto mb-4"></div>
        <p className="text-dreamy-lavender-800">Setting up your account...</p>
      </div>
    </div>
  )
}
