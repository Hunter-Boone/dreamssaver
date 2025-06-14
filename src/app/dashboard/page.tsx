"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthSession } from "@/lib/hooks/useAuthSession";
import { supabase } from "@/lib/db/supabaseClient";
import { Dream } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Moon,
  Plus,
  Search,
  Sparkles,
  CalendarDays,
  Filter,
  Loader2,
} from "lucide-react";
import { formatDate, truncateText, getMoodEmoji } from "@/lib/utils";

export default function DashboardPage() {
  const router = useRouter();
  const { user, appUser, loading: authLoading } = useAuthSession();

  const [dreams, setDreams] = useState<Dream[]>([]);
  const [dreamsLoading, setDreamsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterMood, setFilterMood] = useState("all");
  const [filterLucid, setFilterLucid] = useState("all");
  const [sortBy, setSortBy] = useState("created_at_desc");

  console.log(
    `%c[DashboardPage] Component rendered. Auth loading: ${authLoading}`,
    authLoading ? "color: red" : "color: green"
  );

  useEffect(() => {
    console.log(
      `%c[DashboardPage] Dreams effect triggered. User: ${user?.id}, AuthLoading: ${authLoading}, Filters changed.`,
      "color: blue"
    );
    if (!authLoading && user) {
      fetchDreams();
    } else if (!authLoading && !user) {
      console.log(
        "[DashboardPage] No user after auth, setting dreams loading to false."
      );
      setDreamsLoading(false);
    }
  }, [user?.id, authLoading, filterMood, filterLucid, sortBy]);

  const fetchDreams = async () => {
    console.log("[DashboardPage] Fetching dreams...");
    setDreamsLoading(true);
    try {
      let query = supabase
        .from("dreams")
        .select(
          `
          *,
          insight:dream_insights(*)
        `
        )
        .eq("user_id", user!.id);

      // Apply filters
      if (filterMood !== "all") {
        query = query.eq("mood_upon_waking", filterMood);
      }
      if (filterLucid !== "all") {
        query = query.eq("is_lucid", filterLucid === "true");
      }

      // Apply sorting
      const lastUnderscoreIndex = sortBy.lastIndexOf("_");
      const sortField = sortBy.substring(0, lastUnderscoreIndex);
      const sortDirection = sortBy.substring(lastUnderscoreIndex + 1);
      const ascending = sortDirection === "asc";
      query = query.order(sortField, { ascending });

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching dreams:", error);
        setDreams([]);
      } else {
        console.log(`[DashboardPage] Fetched ${data?.length || 0} dreams.`);
        setDreams(data || []);
      }
    } catch (error) {
      console.error("Error in fetchDreams:", error);
      setDreams([]);
    } finally {
      console.log("[DashboardPage] Setting dreams loading to false.");
      setDreamsLoading(false);
    }
  };

  const filteredDreams = dreams.filter((dream) => {
    if (!searchTerm) return true;
    return (
      dream.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dream.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (authLoading) {
    console.log("[DashboardPage] Rendering AUTH loading spinner.");
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-dreamy-lavender-600 mx-auto mb-4" />
          <p className="text-dreamy-lavender-800">Authenticating...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-serif text-dreamy-lavender-900 mb-4">
          Welcome back, {appUser?.email?.split("@")[0] || "dreamer"}
        </h1>
        <p className="text-soft-gray-600 text-lg">
          {dreamsLoading
            ? "Loading your dreams..."
            : dreams.length === 0
            ? "Ready to start your dream journey?"
            : `You have recorded ${dreams.length} dream${
                dreams.length === 1 ? "" : "s"
              }`}
        </p>
      </div>

      {/* Quick Stats */}
      {appUser && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="dream-card">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Moon className="h-5 w-5 text-dreamy-lavender-600" />
                <div>
                  <p className="text-sm text-soft-gray-600">Total Dreams</p>
                  <p className="text-2xl font-bold text-dreamy-lavender-900">
                    {dreams.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dream-card">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-dreamy-lavender-600" />
                <div>
                  <p className="text-sm text-soft-gray-600">AI Insights Used</p>
                  <p className="text-2xl font-bold text-dreamy-lavender-900">
                    {appUser.is_premium
                      ? "∞"
                      : `${appUser.ai_insights_used_count ?? 0} / ${
                          appUser.ai_insight_limit ?? 5
                        }`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dream-card">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <CalendarDays className="h-5 w-5 text-dreamy-lavender-600" />
                <div>
                  <p className="text-sm text-soft-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-dreamy-lavender-900">
                    {
                      dreams.filter((dream) => {
                        const dreamDate = new Date(dream.created_at);
                        const now = new Date();
                        return (
                          dreamDate.getMonth() === now.getMonth() &&
                          dreamDate.getFullYear() === now.getFullYear()
                        );
                      }).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Controls: New Dream, Search, Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Button
          onClick={() => router.push("/dashboard/new")}
          className="w-full md:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Record New Dream
        </Button>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-soft-gray-500" />
            <Input
              type="search"
              placeholder="Search dreams..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Select value={filterMood} onValueChange={setFilterMood}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by mood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Moods</SelectItem>
                <SelectItem value="Happy">Happy</SelectItem>
                <SelectItem value="Anxious">Anxious</SelectItem>
                <SelectItem value="Calm">Calm</SelectItem>
                <SelectItem value="Neutral">Neutral</SelectItem>
                <SelectItem value="Excited">Excited</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at_desc">Newest First</SelectItem>
                <SelectItem value="created_at_asc">Oldest First</SelectItem>
                <SelectItem value="dream_date_desc">
                  Dream Date (Newest)
                </SelectItem>
                <SelectItem value="dream_date_asc">
                  Dream Date (Oldest)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Dreams List */}
      {dreamsLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-10 w-10 animate-spin text-dreamy-lavender-600" />
        </div>
      ) : filteredDreams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDreams.map((dream) => (
            <Card
              key={dream.id}
              className="dream-card-hover cursor-pointer"
              onClick={() => router.push(`/dashboard/${dream.id}`)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-serif text-dreamy-lavender-800">
                    {truncateText(dream.title || "Untitled Dream", 50)}
                  </CardTitle>
                  <span className="text-2xl">
                    {getMoodEmoji(dream.mood_upon_waking)}
                  </span>
                </div>
                <CardDescription>
                  {formatDate(dream.dream_date)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-soft-gray-600 mb-4">
                  {truncateText(dream.description, 100)}
                </p>
                <div className="flex justify-between items-center">
                  <Badge
                    variant={
                      dream.insight && dream.insight.length > 0
                        ? "default"
                        : "secondary"
                    }
                  >
                    {dream.insight && dream.insight.length > 0
                      ? "Insightful"
                      : "No Insight"}
                  </Badge>
                  {dream.is_lucid && (
                    <Badge className="bg-whisper-gold-100 text-whisper-gold-800">
                      Lucid
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="dream-card text-center py-12">
          <CardContent>
            <Moon className="h-16 w-16 text-dreamy-lavender-400 mx-auto mb-6" />
            <h2 className="text-2xl font-serif text-dreamy-lavender-800 mb-4">
              No dreams match your filters
            </h2>
            <p className="text-soft-gray-600 mb-8 max-w-md mx-auto">
              Try adjusting your search or filter settings to find what you're
              looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setFilterMood("all");
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
