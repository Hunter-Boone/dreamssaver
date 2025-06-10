-- Dreams Saver Database Schema
-- Run this in your Supabase SQL Editor

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'subscribed', 'cancelled', 'past_due')) NOT NULL,
  stripe_customer_id TEXT UNIQUE,
  ai_insight_count INTEGER DEFAULT 0 NOT NULL,
  ai_insight_limit INTEGER DEFAULT 5
);

-- Create dreams table
CREATE TABLE IF NOT EXISTS dreams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  title VARCHAR(255),
  description TEXT NOT NULL,  -- This is the main dream content field
  dream_date DATE NOT NULL,
  mood_upon_waking TEXT CHECK (mood_upon_waking IN ('Happy', 'Anxious', 'Calm', 'Neutral', 'Excited')) NOT NULL,
  is_lucid BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create dream_insights table
CREATE TABLE IF NOT EXISTS dream_insights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  dream_id UUID REFERENCES dreams(id) UNIQUE NOT NULL,
  insight_text TEXT NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  ai_model_version VARCHAR(50) DEFAULT 'Gemini 2.5 Flash' NOT NULL
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

-- Create dream_tags junction table
CREATE TABLE IF NOT EXISTS dream_tags (
  dream_id UUID REFERENCES dreams(id) NOT NULL,
  tag_id UUID REFERENCES tags(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (dream_id, tag_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE dreams ENABLE ROW LEVEL SECURITY;
ALTER TABLE dream_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE dream_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

DROP POLICY IF EXISTS "Users can view own dreams" ON dreams;
DROP POLICY IF EXISTS "Users can insert own dreams" ON dreams;
DROP POLICY IF EXISTS "Users can update own dreams" ON dreams;
DROP POLICY IF EXISTS "Users can delete own dreams" ON dreams;

DROP POLICY IF EXISTS "Users can view insights for own dreams" ON dream_insights;
DROP POLICY IF EXISTS "Users can insert insights for own dreams" ON dream_insights;

DROP POLICY IF EXISTS "Users can view tags for own dreams" ON dream_tags;
DROP POLICY IF EXISTS "Users can insert tags for own dreams" ON dream_tags;
DROP POLICY IF EXISTS "Users can delete tags for own dreams" ON dream_tags;

DROP POLICY IF EXISTS "All users can view tags" ON tags;
DROP POLICY IF EXISTS "All users can insert tags" ON tags;

-- Users policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- Dreams policies
CREATE POLICY "Users can view own dreams" ON dreams FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own dreams" ON dreams FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own dreams" ON dreams FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own dreams" ON dreams FOR DELETE USING (auth.uid() = user_id);

-- Dream insights policies
CREATE POLICY "Users can view insights for own dreams" ON dream_insights FOR SELECT 
  USING (EXISTS (SELECT 1 FROM dreams WHERE dreams.id = dream_id AND dreams.user_id = auth.uid()));
CREATE POLICY "Users can insert insights for own dreams" ON dream_insights FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM dreams WHERE dreams.id = dream_id AND dreams.user_id = auth.uid()));

-- Dream tags policies  
CREATE POLICY "Users can view tags for own dreams" ON dream_tags FOR SELECT 
  USING (EXISTS (SELECT 1 FROM dreams WHERE dreams.id = dream_id AND dreams.user_id = auth.uid()));
CREATE POLICY "Users can insert tags for own dreams" ON dream_tags FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM dreams WHERE dreams.id = dream_id AND dreams.user_id = auth.uid()));
CREATE POLICY "Users can delete tags for own dreams" ON dream_tags FOR DELETE 
  USING (EXISTS (SELECT 1 FROM dreams WHERE dreams.id = dream_id AND dreams.user_id = auth.uid()));

-- Tags policies (public read for tag suggestions, authenticated write)
CREATE POLICY "All users can view tags" ON tags FOR SELECT TO authenticated USING (true);
CREATE POLICY "All users can insert tags" ON tags FOR INSERT TO authenticated WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_dreams_user_id ON dreams(user_id);
CREATE INDEX IF NOT EXISTS idx_dreams_created_at ON dreams(created_at);
CREATE INDEX IF NOT EXISTS idx_dream_insights_dream_id ON dream_insights(dream_id);
CREATE INDEX IF NOT EXISTS idx_dream_tags_dream_id ON dream_tags(dream_id);
CREATE INDEX IF NOT EXISTS idx_dream_tags_tag_id ON dream_tags(tag_id);

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_dreams_updated_at ON dreams;

-- Create updated_at trigger for users table
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dreams_updated_at BEFORE UPDATE ON dreams
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 