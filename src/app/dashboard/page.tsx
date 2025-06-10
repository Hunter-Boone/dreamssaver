"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
} from "lucide-react";
import { formatDate, truncateText, getMoodEmoji } from "@/lib/utils";

interface Dream {
  id: string;
  description: string;
  dream_date: string;
  title?: string;
  mood_upon_waking: string;
  is_lucid: boolean;
  created_at: string;
  insight?: any[];
}

interface AppUser {
  id: string;
  email: string;
  ai_insight_count: number;
  ai_insight_limit: number;
  subscription_status: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthSession();
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMood, setFilterMood] = useState("all");
  const [filterLucid, setFilterLucid] = useState("all");
  const [sortBy, setSortBy] = useState("created_at_desc");

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchDreams();
    }
  }, [user, filterMood, filterLucid, sortBy]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }

      setAppUser(data);
    } catch (error) {
      console.error("Error in fetchUserData:", error);
    }
  };

  const fetchDreams = async () => {
    if (!user) return;

    try {
      setLoading(true);

      let query = supabase
        .from("dreams")
        .select(
          `
          *,
          insight:dream_insights(*)
        `
        )
        .eq("user_id", user.id);

      // Apply filters
      if (filterMood !== "all") {
        query = query.eq("mood_upon_waking", filterMood);
      }

      if (filterLucid !== "all") {
        query = query.eq("is_lucid", filterLucid === "true");
      }

      // Apply sorting
      const [sortField, sortDirection] = sortBy.split("_");
      const ascending = sortDirection === "asc";

      if (sortField === "dream") {
        query = query.order("dream_date", { ascending });
      } else {
        query = query.order(sortField, { ascending });
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching dreams:", error);
        return;
      }

      setDreams(data || []);
    } catch (error) {
      console.error("Error in fetchDreams:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDreams = dreams.filter((dream) => {
    if (!searchTerm) return true;
    return (
      dream.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dream.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dreamy-lavender-600 mx-auto mb-4"></div>
          <p className="text-dreamy-lavender-800">Loading your dreams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-serif text-dreamy-lavender-900 mb-4">
          Welcome back, {user?.email?.split("@")[0]}
        </h1>
        <p className="text-soft-gray-600 text-lg">
          {dreams.length === 0
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
                  <p className="text-sm text-soft-gray-600">AI Insights</p>
                  <p className="text-2xl font-bold text-dreamy-lavender-900">
                    {appUser.subscription_status === "subscribed"
                      ? "∞"
                      : `${Math.max(
                          0,
                          appUser.ai_insight_limit - appUser.ai_insight_count
                        )}`}
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

      {dreams.length === 0 ? (
        /* Empty State */
        <Card className="dream-card text-center py-12">
          <CardContent>
            <Moon className="h-16 w-16 text-dreamy-lavender-400 mx-auto mb-6" />
            <h2 className="text-2xl font-serif text-dreamy-lavender-800 mb-4">
              No dreams recorded yet
            </h2>
            <p className="text-soft-gray-600 mb-8 max-w-md mx-auto">
              Start your dream journey by recording your first dream. Every
              dream is a step closer to understanding your subconscious mind.
            </p>
            <Button
              onClick={() => router.push("/dashboard/new")}
              className="dream-button"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Record Your First Dream
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Search and Filters */}
          <Card className="dream-card">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-soft-gray-400" />
                  <Input
                    placeholder="Search dreams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 dream-input"
                  />
                </div>

                <Select value={filterMood} onValueChange={setFilterMood}>
                  <SelectTrigger className="dream-input">
                    <SelectValue placeholder="Filter by mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Moods</SelectItem>
                    <SelectItem value="Happy">😊 Happy</SelectItem>
                    <SelectItem value="Anxious">😰 Anxious</SelectItem>
                    <SelectItem value="Calm">😌 Calm</SelectItem>
                    <SelectItem value="Neutral">😐 Neutral</SelectItem>
                    <SelectItem value="Excited">🤩 Excited</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterLucid} onValueChange={setFilterLucid}>
                  <SelectTrigger className="dream-input">
                    <SelectValue placeholder="Lucid dreams" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dreams</SelectItem>
                    <SelectItem value="true">Lucid Dreams</SelectItem>
                    <SelectItem value="false">Regular Dreams</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="dream-input">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created_at_desc">
                      Newest First
                    </SelectItem>
                    <SelectItem value="created_at_asc">Oldest First</SelectItem>
                    <SelectItem value="dream_date_desc">
                      Dream Date (Recent)
                    </SelectItem>
                    <SelectItem value="dream_date_asc">
                      Dream Date (Oldest)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Dreams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDreams.map((dream) => (
              <Card
                key={dream.id}
                className="dream-card cursor-pointer hover:scale-105 transition-transform"
                onClick={() => router.push(`/dashboard/${dream.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-dreamy-lavender-800 line-clamp-1">
                        {dream.title || "Untitled Dream"}
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-2 mt-1">
                        <CalendarDays className="h-3 w-3" />
                        <span>{formatDate(dream.dream_date)}</span>
                      </CardDescription>
                    </div>
                    {dream.is_lucid && (
                      <Badge
                        variant="secondary"
                        className="bg-whisper-gold-100 text-whisper-gold-800"
                      >
                        Lucid
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-soft-gray-600 text-sm line-clamp-3 mb-4">
                    {truncateText(dream.description, 120)}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        {getMoodEmoji(dream.mood_upon_waking)}
                      </span>
                      <span className="text-xs text-soft-gray-500">
                        {dream.mood_upon_waking}
                      </span>
                    </div>

                    {dream.insight && dream.insight.length > 0 ? (
                      <div className="flex items-center space-x-1">
                        <Sparkles className="h-4 w-4 text-dreamy-lavender-600" />
                        <span className="text-xs text-dreamy-lavender-600">
                          Insight Available
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-soft-gray-400">
                        No insight yet
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDreams.length === 0 && (
            <Card className="dream-card text-center py-8">
              <CardContent>
                <Search className="h-12 w-12 text-soft-gray-400 mx-auto mb-4" />
                <p className="text-soft-gray-600">
                  No dreams match your current filters. Try adjusting your
                  search terms.
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
