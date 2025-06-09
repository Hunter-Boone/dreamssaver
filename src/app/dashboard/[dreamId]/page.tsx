'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuthSession } from "@/lib/hooks/useAuthSession"
import { supabase } from "@/lib/db/supabaseClient"
import { Dream, DreamInsight } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Sparkles, Brain, Loader2 } from "lucide-react"
import { formatDate, getMoodEmoji, getMoodColor } from "@/lib/utils"
import { canUserAccessAIInsights } from "@/lib/stripe/subscriptionUtils"

export default function DreamDetailPage() {
  const { user, appUser, isPremium } = useAuthSession()
  const router = useRouter()
  const params = useParams()
  const dreamId = params.dreamId as string

  const [dream, setDream] = useState<Dream | null>(null)
  const [insight, setInsight] = useState<DreamInsight | null>(null)
  const [loading, setLoading] = useState(true)
  const [generatingInsight, setGeneratingInsight] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (dreamId && user) {
      fetchDream()
    }
  }, [dreamId, user])

  const fetchDream = async () => {
    try {
      const { data, error } = await supabase
        .from('dreams')
        .select(`
          *,
          dream_tags(
            tag:tags(*)
          ),
          insight:dream_insights(*)
        `)
        .eq('id', dreamId)
        .eq('user_id', user!.id)
        .single()

      if (error) {
        console.error('Error fetching dream:', error)
        setError('Dream not found')
        return
      }

      setDream(data)
      if (data.insight && data.insight.length > 0) {
        setInsight(data.insight[0])
      }
    } catch (error) {
      console.error('Error in fetchDream:', error)
      setError('Failed to load dream')
    } finally {
      setLoading(false)
    }
  }

  const generateInsight = async () => {
    if (!appUser || !canUserAccessAIInsights(appUser)) {
      router.push('/settings/subscription')
      return
    }

    setGeneratingInsight(true)
    setError(null)

    try {
      const response = await fetch('/api/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dream_id: dreamId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate insight')
      }

      setInsight(data.insight)
    } catch (error) {
      console.error('Error generating insight:', error)
      setError(error instanceof Error ? error.message : 'Failed to generate insight')
    } finally {
      setGeneratingInsight(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dreamy-lavender-600 mx-auto mb-4"></div>
          <p className="text-dreamy-lavender-800">Loading dream...</p>
        </div>
      </div>
    )
  }

  if (error || !dream) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || 'Dream not found'}</p>
        <Button onClick={() => router.push('/dashboard')} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    )
  }

  const tags = dream.dream_tags?.map((dt: any) => dt.tag) || []
  const canGenerateInsight = appUser && canUserAccessAIInsights(appUser)
  const remainingInsights = appUser 
    ? (isPremium ? -1 : Math.max(0, appUser.ai_insight_limit - appUser.ai_insight_count))
    : 0

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => router.push('/dashboard')}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-serif text-dreamy-lavender-900">
            {dream.title || 'Dream Details'}
          </h1>
          <p className="text-soft-gray-600">
            {formatDate(dream.dream_date)} • {formatDate(dream.created_at)}
          </p>
        </div>
      </div>

      {/* Dream Content */}
      <Card className="dream-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl text-dreamy-lavender-800">
                {dream.title || 'Untitled Dream'}
              </CardTitle>
              <CardDescription className="flex items-center space-x-4 mt-2">
                <span className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(dream.dream_date)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>{getMoodEmoji(dream.mood_upon_waking)}</span>
                  <span>{dream.mood_upon_waking}</span>
                </span>
              </CardDescription>
            </div>
            {dream.is_lucid && (
              <Badge className="bg-whisper-gold-100 text-whisper-gold-800">
                Lucid Dream
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Dream Description */}
          <div>
            <h3 className="font-semibold text-dreamy-lavender-800 mb-3">Dream Description</h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-soft-gray-700 leading-relaxed whitespace-pre-wrap">
                {dream.description}
              </p>
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <h3 className="font-semibold text-dreamy-lavender-800 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: any) => (
                  <Badge 
                    key={tag.id} 
                    variant="secondary"
                    className="bg-serene-blue-100 text-serene-blue-800"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Insight Section */}
      <Card className="dream-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-dreamy-lavender-600" />
            <span>AI Insight</span>
          </CardTitle>
          <CardDescription>
            AI-powered interpretation of your dream's potential meaning and symbolism
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {insight ? (
            <div className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <p className="text-soft-gray-700 leading-relaxed whitespace-pre-wrap">
                  {insight.insight_text}
                </p>
              </div>
              <div className="text-xs text-soft-gray-500 border-t pt-4">
                <p>
                  Generated on {formatDate(insight.generated_at)} using {insight.ai_model_version}
                </p>
                <p className="mt-1">
                  <strong>Disclaimer:</strong> AI insights are interpretive suggestions, not definitive meanings. 
                  Consider what resonates with your personal experience.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <Brain className="h-12 w-12 text-soft-gray-400 mx-auto" />
              
              {canGenerateInsight ? (
                <>
                  <div>
                    <h3 className="text-lg font-semibold text-dreamy-lavender-800 mb-2">
                      Generate AI Insight
                    </h3>
                    <p className="text-soft-gray-600 mb-4">
                      Get AI-powered insights about the potential meaning and symbolism in your dream.
                    </p>
                    {!isPremium && (
                      <p className="text-sm text-dreamy-lavender-600">
                        You have {remainingInsights} free insight{remainingInsights === 1 ? '' : 's'} remaining.
                      </p>
                    )}
                  </div>
                  
                  <Button
                    onClick={generateInsight}
                    disabled={generatingInsight}
                    className="dream-button"
                  >
                    {generatingInsight ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating Insight...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate AI Insight
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-lg font-semibold text-dreamy-lavender-800 mb-2">
                      Unlock AI Insights
                    </h3>
                    <p className="text-soft-gray-600 mb-4">
                      You've used all your free AI insights. Upgrade to premium for unlimited insights.
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => router.push('/settings/subscription')}
                    className="dream-button"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Upgrade to Premium
                  </Button>
                </>
              )}
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
