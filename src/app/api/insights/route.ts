 } = await supabase
      .from('dream_insights')
      .insert({
        dream_id: dream_id,
        insight_text: insightText,
        ai_model_version: 'Gemini Pro 1.5'
      })
      .select()
      .single()

    if (insightError) {
      console.error('Error saving insight:', insightError)
      return NextResponse.json({ error: 'Failed to save insight' }, { status: 500 })
    }

    // Increment user's insight count if not premium
    if (userProfile.subscription_status !== 'subscribed') {
      await incrementUserInsightCount(user.id)
    }

    return NextResponse.json({ insight: savedInsight })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate insight. Please try again.' 
    }, { status: 500 })
  }
}
