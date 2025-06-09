'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthSession } from "@/lib/hooks/useAuthSession"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth/supabaseAuth"
import { Plus, Settings, Sparkles } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, appUser, loading, isPremium } = useAuthSession()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen dream-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dreamy-lavender-600 mx-auto mb-4"></div>
          <p className="text-dreamy-lavender-800">Loading your dreams...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const remainingInsights = appUser 
    ? (isPremium ? -1 : Math.max(0, appUser.ai_insight_limit - appUser.ai_insight_count))
    : 0

  return (
    <div className="min-h-screen dream-gradient">
      {/* Header */}
      <header className="border-b border-soft-gray-200 bg-white/70 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 
                className="text-2xl font-serif font-semibold text-dreamy-lavender-900 cursor-pointer"
                onClick={() => router.push('/dashboard')}
              >
                Dreams Saver
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* AI Insights Counter */}
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-dreamy-lavender-50 rounded-full">
                <Sparkles className="h-4 w-4 text-dreamy-lavender-600" />
                <span className="text-sm text-dreamy-lavender-800">
                  {isPremium 
                    ? 'Unlimited Insights' 
                    : `${remainingInsights}/5 Insights`
                  }
                </span>
              </div>
              
              {!isPremium && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/settings/subscription')}
                  className="hidden sm:inline-flex"
                >
                  Upgrade
                </Button>
              )}
              
              <Button
                onClick={() => router.push('/dashboard/new')}
                className="dream-button"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Dream
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/settings/profile')}
              >
                <Settings className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
