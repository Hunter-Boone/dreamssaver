'use client'

import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/db/supabaseClient'
import { User as AppUser } from '@/types/user'

export function useAuthSession() {
  const [user, setUser] = useState<User | null>(null)
  const [appUser, setAppUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await fetchAppUser(session.user.id)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchAppUser(session.user.id)
        } else {
          setAppUser(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchAppUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching app user:', error)
        return
      }

      setAppUser(data)
    } catch (error) {
      console.error('Error in fetchAppUser:', error)
    }
  }

  const refreshAppUser = async () => {
    if (user) {
      await fetchAppUser(user.id)
    }
  }

  return {
    user,
    appUser,
    loading,
    refreshAppUser,
    isAuthenticated: !!user,
    isPremium: appUser?.subscription_status === 'subscribed'
  }
}
