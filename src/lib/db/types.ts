_text?: string
          generated_at?: string
          ai_model_version?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      dream_tags: {
        Row: {
          dream_id: string
          tag_id: string
          created_at: string
        }
        Insert: {
          dream_id: string
          tag_id: string
          created_at?: string
        }
        Update: {
          dream_id?: string
          tag_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
