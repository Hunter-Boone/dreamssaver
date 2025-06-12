import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, isValid } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      return "Invalid date";
    }
    return format(dateObj, "MMM dd, yyyy");
  } catch (error) {
    return "Invalid date";
  }
}

export function formatDateTime(date: string | Date): string {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      return "Invalid date";
    }
    return format(dateObj, "MMM dd, yyyy at h:mm a");
  } catch (error) {
    return "Invalid date";
  }
}

export function formatDateForInput(date: string | Date): string {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    if (!isValid(dateObj)) {
      return format(new Date(), "yyyy-MM-dd");
    }
    return format(dateObj, "yyyy-MM-dd");
  } catch (error) {
    return format(new Date(), "yyyy-MM-dd");
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function extractTags(tagString: string): string[] {
  if (!tagString.trim()) return [];

  return tagString
    .split(/[,\n]/)
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)
    .slice(0, 10); // Limit to 10 tags
}

export function getMoodEmoji(mood: string): string {
  const moodEmojis: Record<string, string> = {
    Happy: "😊",
    Anxious: "😰",
    Calm: "😌",
    Neutral: "😐",
    Excited: "🤩",
  };
  return moodEmojis[mood] || "😐";
}

export function getMoodColor(mood: string): string {
  const moodColors: Record<string, string> = {
    Happy: "text-yellow-600 bg-yellow-50",
    Anxious: "text-red-600 bg-red-50",
    Calm: "text-blue-600 bg-blue-50",
    Neutral: "text-gray-600 bg-gray-50",
    Excited: "text-purple-600 bg-purple-50",
  };
  return moodColors[mood] || "text-gray-600 bg-gray-50";
}
