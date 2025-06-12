import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/db/supabase-server";
import { generateDreamInsight } from "@/lib/ai/geminiClient";
import { incrementUserInsightCount } from "@/lib/stripe/subscriptionUtils";

export async function POST(request: NextRequest) {
  try {
    console.log("Insights API: Starting authentication check");
    const supabase = createSupabaseServerClient();

    // Get the authorization header
    const authorization = request.headers.get("authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
      console.log("Insights API: No authorization header found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authorization.split(" ")[1];

    // Create a Supabase client and verify the token
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    console.log(
      "Insights API: User from token:",
      user ? "Found user" : "No user",
      authError ? `Error: ${authError.message}` : ""
    );

    if (authError || !user) {
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

    console.log(
      "Insights API: Processing dream_id:",
      dream_id,
      "for user:",
      user.id
    );

    // Get the dream details
    const { data: dream, error: dreamError } = await supabase
      .from("dreams")
      .select("*")
      .eq("id", dream_id)
      .eq("user_id", user.id)
      .single();

    if (dreamError || !dream) {
      console.log("Insights API: Dream not found or error:", dreamError);
      return NextResponse.json({ error: "Dream not found" }, { status: 404 });
    }

    // Get the tags for this dream separately
    const { data: dreamTags } = await supabase
      .from("dream_tags")
      .select(
        `
        tags (
          id,
          name
        )
      `
      )
      .eq("dream_id", dream_id);

    // Check if insight already exists
    const { data: existingInsight } = await supabase
      .from("dream_insights")
      .select("id")
      .eq("dream_id", dream_id)
      .maybeSingle();

    if (existingInsight) {
      return NextResponse.json(
        { error: "Insight already exists for this dream" },
        { status: 409 }
      );
    }

    // Get user profile to check subscription status
    const { data: appUser, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Error fetching user profile:", profileError);
      return NextResponse.json(
        { error: "Error fetching user profile" },
        { status: 500 }
      );
    }

    console.log("Insights API: User profile:", {
      subscription_status: appUser.subscription_status,
      ai_insights_used_count: appUser.ai_insights_used_count,
      ai_insight_limit: appUser.ai_insight_limit,
    });

    // Check if user can generate insights (premium or has free insights remaining)
    const isPremium = appUser.subscription_status === "subscribed";
    const hasInsightsRemaining =
      (appUser.ai_insights_used_count ?? 0) < (appUser.ai_insight_limit ?? 5);

    console.log("Insights API: Can generate insights?", {
      isPremium,
      hasInsightsRemaining,
    });

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
    const tags = dreamTags?.map((dt: any) => dt.tags.name) || [];

    // Generate AI insight
    console.log("Insights API: Generating AI insight...");
    const insightText = await generateDreamInsight({
      id: dream.id,
      user_id: dream.user_id,
      description: dream.description,
      dream_date: dream.dream_date,
      mood_upon_waking: dream.mood_upon_waking,
      is_lucid: dream.is_lucid,
      created_at: dream.created_at,
      updated_at: dream.updated_at,
      dream_tags:
        dreamTags?.map((dt: any) => ({
          tag: {
            id: dt.tags.id || "",
            name: dt.tags.name,
            created_at: "",
            updated_at: "",
          },
        })) || [],
    });

    console.log("Insights API: AI insight generated, saving to database...");

    // Save the insight to database
    const { data: savedInsight, error: insightError } = await supabase
      .from("dream_insights")
      .insert({
        dream_id: dream_id,
        insight_text: insightText,
      })
      .select();

    console.log("Insights API: Insert result:", { savedInsight, insightError });

    if (insightError) {
      console.error("Error saving insight:", insightError);
      return NextResponse.json(
        { error: "Failed to save insight" },
        { status: 500 }
      );
    }

    if (!savedInsight || savedInsight.length === 0) {
      console.error("No insight was saved");
      return NextResponse.json(
        { error: "Failed to save insight - no data returned" },
        { status: 500 }
      );
    }

    const finalInsight = savedInsight[0];

    // Increment user's insight count if not premium
    if (appUser.subscription_status !== "subscribed") {
      await incrementUserInsightCount(user.id, supabase);
    }

    console.log("Insights API: Successfully generated insight");
    return NextResponse.json({ insight: finalInsight });
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
