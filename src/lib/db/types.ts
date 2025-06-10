export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
          subscription_status: "free" | "subscribed" | "cancelled" | "past_due";
          stripe_customer_id: string | null;
          ai_insight_count: number;
          ai_insight_limit: number;
        };
        Insert: {
          id: string;
          email: string;
          created_at?: string;
          updated_at?: string;
          subscription_status?:
            | "free"
            | "subscribed"
            | "cancelled"
            | "past_due";
          stripe_customer_id?: string | null;
          ai_insight_count?: number;
          ai_insight_limit?: number;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
          subscription_status?:
            | "free"
            | "subscribed"
            | "cancelled"
            | "past_due";
          stripe_customer_id?: string | null;
          ai_insight_count?: number;
          ai_insight_limit?: number;
        };
      };
      dreams: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          description: string;
          dream_date: string;
          mood_upon_waking:
            | "Happy"
            | "Anxious"
            | "Calm"
            | "Neutral"
            | "Excited";
          is_lucid: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string | null;
          description: string;
          dream_date: string;
          mood_upon_waking:
            | "Happy"
            | "Anxious"
            | "Calm"
            | "Neutral"
            | "Excited";
          is_lucid?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string | null;
          description?: string;
          dream_date?: string;
          mood_upon_waking?:
            | "Happy"
            | "Anxious"
            | "Calm"
            | "Neutral"
            | "Excited";
          is_lucid?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      dream_insights: {
        Row: {
          id: string;
          dream_id: string;
          insight_text: string;
          generated_at: string;
          ai_model_version: string;
        };
        Insert: {
          id?: string;
          dream_id: string;
          insight_text: string;
          generated_at?: string;
          ai_model_version?: string;
        };
        Update: {
          id?: string;
          dream_id?: string;
          insight_text?: string;
          generated_at?: string;
          ai_model_version?: string;
        };
      };
      tags: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id?: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
      };
      dream_tags: {
        Row: {
          dream_id: string;
          tag_id: string;
          created_at: string;
        };
        Insert: {
          dream_id: string;
          tag_id: string;
          created_at?: string;
        };
        Update: {
          dream_id?: string;
          tag_id?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
