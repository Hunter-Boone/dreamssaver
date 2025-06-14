import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db/supabaseClient";
import { getCurrentUser } from "@/lib/auth/supabaseAuth";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: dreams, error } = await supabase
      .from("dreams")
      .select(
        `
        *,
        dream_tags(
          tag:tags(*)
        ),
        insight:dream_insights(*)
      `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching dreams:", error);
      return NextResponse.json(
        { error: "Failed to fetch dreams" },
        { status: 500 }
      );
    }

    return NextResponse.json({ dreams });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      dream_date,
      mood_upon_waking,
      is_lucid,
      tag_names,
    } = body;

    if (!description || !dream_date || !mood_upon_waking) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save the dream
    const { data: savedDream, error: dreamError } = await supabase
      .from("dreams")
      .insert({
        user_id: user.id,
        title: title || null,
        description,
        dream_date,
        mood_upon_waking,
        is_lucid: is_lucid || false,
      })
      .select()
      .single();

    if (dreamError) {
      console.error("Error saving dream:", dreamError);
      return NextResponse.json(
        { error: "Failed to save dream" },
        { status: 500 }
      );
    }

    // Handle tags if provided
    if (tag_names && tag_names.length > 0) {
      const tagPromises = tag_names.map(async (tagName: string) => {
        // Try to find existing tag
        let { data: existingTag } = await supabase
          .from("tags")
          .select("id")
          .eq("name", tagName)
          .single();

        if (!existingTag) {
          // Create new tag
          const { data: newTag, error: tagError } = await supabase
            .from("tags")
            .insert({ name: tagName })
            .select()
            .single();

          if (tagError) throw tagError;
          existingTag = newTag;
        }

        return existingTag!.id;
      });

      const tagIds = await Promise.all(tagPromises);

      // Create dream-tag associations
      const dreamTagsData = tagIds.map((tagId) => ({
        dream_id: savedDream.id,
        tag_id: tagId,
      }));

      await supabase.from("dream_tags").insert(dreamTagsData);
    }

    return NextResponse.json({ dream: savedDream });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
