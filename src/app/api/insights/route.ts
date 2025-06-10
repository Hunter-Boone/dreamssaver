import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/supabaseAuth";
import { supabase } from "@/lib/db/supabaseClient";
import { generateDreamInsight } from "@/lib/ai/geminiClient";
import { incrementUserInsightCount } from "@/lib/stripe/subscriptionUtils";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { dream_id } = body;

    if (!dream_id) {
      return NextResponse.json(
        { error: "Dream ID is required" },
        { status: 400 }
      );
    }

    // Get the dream details
    const { data: dream, error: dreamError } = await supabase
      .from("dreams")
      .select(
        `
        *,
        dream_tags(
          tag:tags(name)
        )
      `
      )
      .eq("id", dream_id)
      .eq("user_id", user.id)
      .single();

    if (dreamError || !dream) {
      return NextResponse.json({ error: "Dream not found" }, { status: 404 });
    }

    // Check if insight already exists
    const { data: existingInsight } = await supabase
      .from("dream_insights")
      .select("id")
      .eq("dream_id", dream_id)
      .single();

    if (existingInsight) {
      return NextResponse.json(
        { error: "Insight already exists for this dream" },
        { status: 409 }
      );
    }

    // Get user profile to check subscription status
    const { data: userProfile, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (userError || !userProfile) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    // Check if user can generate insights (premium or has free insights remaining)
    const isPremium = userProfile.subscription_status === "subscribed";
    const hasInsightsRemaining =
      userProfile.ai_insight_count < userProfile.ai_insight_limit;

    if (!isPremium && !hasInsightsRemaining) {
      return NextResponse.json(
        {
          error:
            "No AI insights remaining. Please upgrade to premium for unlimited insights.",
        },
        { status: 403 }
      );
    }

    // Extract tags for the AI request
    const tags = dream.dream_tags?.map((dt: any) => dt.tag.name) || [];

    // Generate AI insight
    const insightText = await generateDreamInsight({
      dream_description: dream.description,
      mood_upon_waking: dream.mood_upon_waking,
      is_lucid: dream.is_lucid,
      tags,
    });

    // Save the insight to database
    const { data: savedInsight, error: insightError } = await supabase
      .from("dream_insights")
      .insert({
        dream_id: dream_id,
        insight_text: insightText,
        ai_model_version: "Gemini 2.5 Flash",
      })
      .select()
      .single();

    if (insightError) {
      console.error("Error saving insight:", insightError);
      return NextResponse.json(
        { error: "Failed to save insight" },
        { status: 500 }
      );
    }

    // Increment user's insight count if not premium
    if (userProfile.subscription_status !== "subscribed") {
      await incrementUserInsightCount(user.id);
    }

    return NextResponse.json({ insight: savedInsight });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate insight. Please try again.",
      },
      { status: 500 }
    );
  }
}
