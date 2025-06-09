export interface Dream {
  id: string;
  user_id: string;
  title?: string;
  description: string;
  dream_date: string;
  mood_upon_waking: 'Happy' | 'Anxious' | 'Calm' | 'Neutral' | 'Excited';
  is_lucid: boolean;
  created_at: string;
  updated_at: string;
  tags?: Tag[];
  insight?: DreamInsight;
}

export interface DreamInsert {
  title?: string;
  description: string;
  dream_date: string;
  mood_upon_waking: 'Happy' | 'Anxious' | 'Calm' | 'Neutral' | 'Excited';
  is_lucid: boolean;
  tag_names?: string[];
}

export interface DreamWithTags extends Dream {
  dream_tags: {
    tag: Tag;
  }[];
}
