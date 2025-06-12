import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db/supabaseClient";

export async function POST(request: NextRequest) {
  try {
    // Get all users with null or undefined ai_insights_used_count or ai_insight_limit
    const { data: usersToFix, error: fetchError } = await supabase
      .from("users")
      .select(
        "id, ai_insights_used_count, ai_insight_limit, subscription_status"
      )
      .or("ai_insights_used_count.is.null,ai_insight_limit.is.null");

    if (fetchError) {
      console.error("Error fetching users to fix:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch users" },
        { status: 500 }
      );
    }

    if (!usersToFix || usersToFix.length === 0) {
      return NextResponse.json({
        message: "No users need fixing",
        fixed: 0,
      });
    }

    let fixedCount = 0;

    // Fix each user
    for (const user of usersToFix) {
      const { error: updateError } = await supabase
        .from("users")
        .update({
          ai_insights_used_count: user.ai_insights_used_count ?? 0,
          ai_insight_limit: user.ai_insight_limit ?? 5,
          subscription_status: user.subscription_status ?? "free",
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) {
        console.error(`Error fixing user ${user.id}:`, updateError);
        continue;
      }

      fixedCount++;
    }

    return NextResponse.json({
      message: `Fixed ${fixedCount} users`,
      fixed: fixedCount,
      total: usersToFix.length,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
