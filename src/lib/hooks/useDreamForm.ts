'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { DreamInsert } from '@/types/dream'
import { extractTags } from '@/lib/utils'

const dreamFormSchema = z.object({
  title: z.string().optional(),
  description: z.string().min(1, 'Dream description is required').max(5000),
  dream_date: z.string().min(1, 'Dream date is required'),
  mood_upon_waking: z.enum(['Happy', 'Anxious', 'Calm', 'Neutral', 'Excited']),
  is_lucid: z.boolean().default(false),
  tag_input: z.string().optional(),
})

type DreamFormData = z.infer<typeof dreamFormSchema>

export function useDreamForm(initialData?: Partial<DreamFormData>) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<DreamFormData>({
    resolver: zodResolver(dreamFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      dream_date: initialData?.dream_date || new Date().toISOString().split('T')[0],
      mood_upon_waking: initialData?.mood_upon_waking || 'Neutral',
      is_lucid: initialData?.is_lucid || false,
      tag_input: initialData?.tag_input || '',
    },
  })

  const onSubmit = async (
    data: DreamFormData,
    onSuccess?: (dreamData: DreamInsert) => void | Promise<void>
  ) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const dreamData: DreamInsert = {
        title: data.title || undefined,
        description: data.description,
        dream_date: data.dream_date,
        mood_upon_waking: data.mood_upon_waking,
        is_lucid: data.is_lucid,
        tag_names: data.tag_input ? extractTags(data.tag_input) : undefined,
      }

      if (onSuccess) {
        await onSuccess(dreamData)
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to save dream'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    form,
    isSubmitting,
    submitError,
    onSubmit,
    setSubmitError,
  }
}
