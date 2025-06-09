d UUID REFERENCES tags(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (dream_id, tag_id)
);

-- Row Level Security policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE dreams ENABLE ROW LEVEL SECURITY;
ALTER TABLE dream_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE dream_tags ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

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

-- Tags policies (public read for tag suggestions)
CREATE POLICY "Anyone can view tags" ON tags FOR SELECT TO authenticated USING (true);
CREATE POLICY "Anyone can create tags" ON tags FOR INSERT TO authenticated WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_dreams_user_id ON dreams(user_id);
CREATE INDEX idx_dreams_created_at ON dreams(created_at);
CREATE INDEX idx_dreams_dream_date ON dreams(dream_date);
CREATE INDEX idx_dream_insights_dream_id ON dream_insights(dream_id);
CREATE INDEX idx_dream_tags_dream_id ON dream_tags(dream_id);
CREATE INDEX idx_dream_tags_tag_id ON dream_tags(tag_id);

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

3. Enable OAuth providers in Supabase Auth settings (Google recommended)

### Installation

```bash
# Install dependencies
npm install

# or with pnpm
pnpm install

# Run development server
npm run dev

# or with pnpm
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### API Keys Setup

#### Supabase
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your URL and anon key
3. Go to Settings > API > Service roles to get your service role key

#### Google Gemini AI
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your environment variables

#### Stripe
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Go to Developers > API keys to get your secret and publishable keys
3. Set up a webhook endpoint pointing to your app's `/api/webhook/stripe` route
4. Add the webhook secret to your environment variables

## Project Structure

```
dreamssaver/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (auth)/            # Auth route group
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── settings/          # Settings pages
│   │   ├── api/              # API routes
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── common/          # Common components
│   │   └── dashboard/       # Dashboard-specific components
│   ├── lib/                 # Utility functions and configurations
│   │   ├── auth/           # Authentication helpers
│   │   ├── db/             # Database client and types
│   │   ├── ai/             # AI integration
│   │   ├── stripe/         # Stripe integration
│   │   └── hooks/          # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   └── config/             # App configuration
└── README.md
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Features in Detail

### Dream Recording
- Rich text description with unlimited length
- Date picker for dream occurrence
- Mood tracking upon waking
- Lucid dream indicator
- Tag system for categorization

### AI Insights
- Powered by Google Gemini AI
- Analyzes dream symbolism and emotional content
- Considers mood, lucid status, and tags
- Presents insights as suggestions, not definitive meanings

### Subscription Model
- **Free Tier**: Unlimited dream recording, 5 AI insights
- **Premium Tier**: $8/month for unlimited AI insights
- Stripe integration for secure payments
- Customer portal for subscription management

### Security & Privacy
- Row Level Security (RLS) ensures data isolation
- OAuth authentication via Supabase
- Dreams are private and never shared
- HTTPS/SSL encryption for all data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@dreamssaver.com or create an issue in this repository.
