"use client";

import { useRouter } from "next/navigation";
import { useDreamForm } from "@/lib/hooks/useDreamForm";
import { useAuthSession } from "@/lib/hooks/useAuthSession";
import { supabase } from "@/lib/db/supabaseClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Moon } from "lucide-react";
import { getMoodEmoji } from "@/lib/utils";

export default function NewDreamPage() {
  const { user } = useAuthSession();
  const router = useRouter();
  const { form, isSubmitting, submitError, onSubmit, setSubmitError } =
    useDreamForm();

  const handleSaveDream = async (dreamData: any) => {
    if (!user) {
      setSubmitError("You must be logged in to save dreams");
      return;
    }

    try {
      // Save the dream
      const { data: savedDream, error: dreamError } = await supabase
        .from("dreams")
        .insert({
          ...dreamData,
          user_id: user.id,
        })
        .select()
        .single();

      if (dreamError) {
        throw dreamError;
      }

      // Handle tags if provided
      if (dreamData.tag_names && dreamData.tag_names.length > 0) {
        // Get or create tags
        const tagPromises = dreamData.tag_names.map(async (tagName: string) => {
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

        const { error: dreamTagsError } = await supabase
          .from("dream_tags")
          .insert(dreamTagsData);

        if (dreamTagsError) {
          console.error("Error saving dream tags:", dreamTagsError);
          // Don't throw here, as the dream was saved successfully
        }
      }

      // Redirect to the dream detail page
      router.push(`/dashboard/${savedDream.id}`);
    } catch (error) {
      console.error("Error saving dream:", error);
      throw new Error("Failed to save dream. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.back()} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-serif text-dreamy-lavender-900">
            Record New Dream
          </h1>
          <p className="text-soft-gray-600">
            Capture the details while they're still fresh
          </p>
        </div>
      </div>

      {/* Dream Form */}
      <Card className="dream-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Moon className="h-5 w-5 text-dreamy-lavender-600" />
            <span>Dream Details</span>
          </CardTitle>
          <CardDescription>
            Fill in as much detail as you can remember about your dream
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form
            onSubmit={form.handleSubmit((data) =>
              onSubmit(data, handleSaveDream)
            )}
            className="space-y-6"
          >
            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="dream_date">Dream Date</Label>
              <Input
                id="dream_date"
                type="date"
                className="dream-input"
                {...form.register("dream_date")}
              />
              {form.formState.errors.dream_date && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.dream_date.message}
                </p>
              )}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Dream Title (Optional)</Label>
              <Input
                id="title"
                placeholder="Give your dream a memorable title..."
                className="dream-input"
                {...form.register("title")}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Dream Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your dream in as much detail as you can remember..."
                className="min-h-40 dream-input"
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            {/* Mood Upon Waking */}
            <div className="space-y-2">
              <Label htmlFor="mood">How did you feel when you woke up? *</Label>
              <Select
                value={form.watch("mood_upon_waking")}
                onValueChange={(value) =>
                  form.setValue("mood_upon_waking", value as any)
                }
              >
                <SelectTrigger className="dream-input">
                  <SelectValue placeholder="Select your mood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Happy">
                    <span className="flex items-center space-x-2">
                      <span>{getMoodEmoji("Happy")}</span>
                      <span>Happy</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="Anxious">
                    <span className="flex items-center space-x-2">
                      <span>{getMoodEmoji("Anxious")}</span>
                      <span>Anxious</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="Calm">
                    <span className="flex items-center space-x-2">
                      <span>{getMoodEmoji("Calm")}</span>
                      <span>Calm</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="Neutral">
                    <span className="flex items-center space-x-2">
                      <span>{getMoodEmoji("Neutral")}</span>
                      <span>Neutral</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="Excited">
                    <span className="flex items-center space-x-2">
                      <span>{getMoodEmoji("Excited")}</span>
                      <span>Excited</span>
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Lucid Dream */}
            <div className="flex items-center space-x-2">
              <input
                id="is_lucid"
                type="checkbox"
                className="rounded border-soft-gray-300 text-dreamy-lavender-600 focus:ring-dreamy-lavender-500"
                {...form.register("is_lucid")}
              />
              <Label htmlFor="is_lucid" className="text-sm">
                This was a lucid dream (I was aware I was dreaming)
              </Label>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tag_input">Tags (Optional)</Label>
              <Textarea
                id="tag_input"
                placeholder="Add tags separated by commas (e.g., flying, water, school, anxiety)..."
                className="min-h-20 dream-input"
                {...form.register("tag_input")}
              />
              <p className="text-xs text-soft-gray-500">
                Tags help you categorize and find your dreams later
              </p>
            </div>

            {/* Error Display */}
            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{submitError}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="dream-button flex-1"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    Saving Dream...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Dream
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
