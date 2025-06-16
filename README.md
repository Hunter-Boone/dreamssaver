# Dreams Saver - Complete Tutorial

Build a modern dream journaling web application with AI insights from scratch. This repository contains the complete source code for the Dreams Saver app, which allows users to record their dreams and receive AI-powered insights.

## 🎯 What You'll Build

A full-stack web application featuring:

- 🌙 Dream recording and management
- 🤖 AI-powered dream insights using Google Gemini
- 💳 Stripe subscription integration (Free tier: 5 insights, Premium: $8/month unlimited)
- 🔐 Google OAuth authentication via Supabase
- 📱 Responsive, modern UI with a dreamy aesthetic
- ☁️ Production deployment on Vercel

## 📋 Required Software

Before starting, install these tools:

- **Cursor AI**: [https://www.cursor.com/](https://www.cursor.com/) - AI-powered code editor
- **Node.js**: [https://nodejs.org/en/download](https://nodejs.org/en/download) - JavaScript runtime
- **Git**: [https://git-scm.com/](https://git-scm.com/) - Version control
- **Claude Desktop**: [https://claude.ai/download](https://claude.ai/download) - AI assistant for initial development

## 🔗 Useful Links

- **Hostinger** (Domain): [https://hostinger.com?REFERRALCODE=TZKHUNTERM0F](https://hostinger.com?REFERRALCODE=TZKHUNTERM0F)
- **Supabase** (Database): [https://supabase.com/](https://supabase.com/)
- **Vercel** (Hosting): [https://vercel.com/](https://vercel.com/)
- **VibeCodeDocs** (Documentation): [https://www.vibecodedocs.dev/](https://www.vibecodedocs.dev/)
- **GitHub** (Code Repository): [https://github.com/](https://github.com/)
- **Google Cloud Console**: [https://console.cloud.google.com/](https://console.cloud.google.com/)
- **Stripe** (Payments): [https://stripe.com/](https://stripe.com/)

## 🚀 Quick Start Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Stop running process
Ctrl+C

# Stripe CLI commands
stripe login
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

> **Note**: Your webhook endpoint may be different. Ask AI what your specific webhook endpoint is.

## 📖 Complete Tutorial

### Step 1: Planning and Domain Setup

1. **Generate Your Idea**: Use any AI tool to brainstorm a product/application idea
2. **Get Your Domain**:
   - Visit [Hostinger](https://hostinger.com?REFERRALCODE=TZKHUNTERM0F)
   - Create an account
   - Use the "Generative Domain using AI" option to find available domains
   - Purchase your chosen domain

### Step 2: Project Documentation

1. **Visit** [VibeCodeDocs](https://vibecodedocs.dev)
2. **Sign up** and create a new project
3. **Answer questions** about your application
4. **Generate and download** the project documents

### Step 3: Setup Claude Desktop MCP Server

1. **Open Claude Desktop**
2. **Install MCP Server** for filesystem access:
   - Go to `File -> Settings -> Developer -> Edit Config`
   - Update `claude_desktop_config.json` with:

```json
{
  "mcpServers": {
    "desktop-commander": {
      "command": "npx",
      "args": ["-y", "@wonderwhy-er/desktop-commander"]
    }
  }
}
```

3. **Restart Claude Desktop** to apply changes

### Step 4: Generate Initial Application

1. **Attach your documentation** to Claude Desktop chat
2. **Use this prompt**:

```
Create this webapp in the Projects folder under dreamssaver. For any API keys or secrets, put them in a .env.local file so they can be set later. Use the most recent versions for packages and third party dependencies.
```

3. **Continue prompting** if Claude stops during generation

### Step 5: Setup Development Environment

1. **Open Cursor AI**
2. **Select "Open Folder"**
3. **Navigate to** the folder Claude created
4. **Select the project folder**

### Step 6: Initialize Git Repository

1. **Open Source Control panel** (`Ctrl+Shift+G` on Windows)
2. **Click "Initialize Repository"**
3. **Stage all changes** (hover over changes, click stage all icon)
4. **Write commit message**: "Initial Commit"
5. **Click "Commit"**

### Step 7: Upload to GitHub

1. **Click "Publish Branch"**
2. **Sign in** to GitHub when prompted
3. **Enter project name** in command palette
4. **Choose** public or private repository
5. **Hit enter** to publish

**Future commits**: Use "Commit and Push" from the Commit dropdown

### Step 8: Run the Application

```bash
npm run dev
```

Your app will be available at `http://localhost:3000`

### Step 9: Development Loop

1. **Ask AI** to implement features or fix bugs
2. **Test changes** in browser
3. **Create commits** (checkpoints) regularly
4. **Feed errors** from console or terminal to AI
5. **Use "Discard Changes"** if AI breaks something (reverts to last commit)

**Pro Tips**:

- Take screenshots for visual context
- Be verbose and use correct terminology
- Use AI to understand the codebase
- Create frequent Git checkpoints

## 🗄️ Database Setup (Supabase)

### Create Project and Database

1. **Create Supabase account** and new project
2. **Ask AI** to output all required SQL
3. **Go to SQL Editor** in Supabase (left sidebar)
4. **Paste and run** the SQL
5. **Debug with AI** if queries fail

### Get API Keys

1. **Home page**: Scroll down for Public URL and Anon Key
2. **Project Settings > API**: Get Service API Key (keep secret!)
3. **Add to `.env.local`** file

### Setup Authentication

1. **Authentication > Sign-In/Providers**
2. **Scroll to Google** provider
3. **Enable** Google authentication

### Google Cloud Console Setup

1. **Sign in** to [Google Cloud Console](https://console.cloud.google.com/)
2. **Select/Create Project** (upper right "New Project")
3. **APIs & Services > OAuth Consent Screen**
4. **Click "Get Started"** and fill out information
5. **Create OAuth Client**:
   - Application type: **Web application**
   - Name: Your app name
   - Authorized redirect URIs: Copy from Supabase Auth settings
6. **Copy Client ID and Secret** to Supabase
7. **Save and enable** Google sign-in

### URL Configuration

1. **Authentication > URL Configuration**
2. **Site URL**: `http://localhost:3000` (dev) / `https://yourdomain.com` (prod)
3. **Add redirect URL**: `http://localhost:3000/auth/callback` (ask AI for your specific endpoint)

> **Production Note**: Create separate Supabase project for production with new URLs

## 💳 Stripe Integration

### Setup Account

1. **Create Stripe account**
2. **Setup business** (starts in Sandbox mode)
3. **Follow setup guide** in bottom right

### Get API Keys

1. **Home page**: Copy Publishable and Secret keys
2. **Add to `.env.local`** file

### Create Products

1. **Create your first product**
2. **Copy Product ID** from product page
3. **Click price** and copy Pricing ID
4. **Prompt Cursor**:

```
I have created my Stripe account and am currently in the sandbox. For the Premium subscription here are my product and pricing ID's. Please make these environment variables so that I can change them in production
product_id: [YOUR_PRODUCT_ID]
pricing_id: [YOUR_PRICING_ID]
```

> **Important**: Both environment variables need `NEXT_PUBLIC_` prefix for client access

### Webhook Setup (Development)

1. **Install Stripe CLI**: [https://docs.stripe.com/stripe-cli#install](https://docs.stripe.com/stripe-cli#install)
2. **Add to PATH** environment variable
3. **Login**: `stripe login`
4. **Forward webhooks**: `stripe listen --forward-to http://localhost:3000/api/webhook/stripe`
5. **Copy signing secret** to `.env.local`

### Webhook Setup (Production)

1. **Search "Webhook"** in Stripe dashboard
2. **Add endpoint/destination**
3. **Ask AI for webhook events**:

```
What events does my webhook listen for in Stripe? I need to setup the Stripe webhook and need to select the appropriate events for my application
```

4. **Add events** and endpoint URL: `https://yourdomain.com/api/webhook/stripe`
5. **Copy signing secret** for production environment

## 🚀 Deploy to Production (Vercel)

### Initial Deployment

1. **Sign in** to Vercel
2. **Continue with GitHub** and link accounts
3. **Import project** from dashboard
4. **Add environment variables**:
   - Copy entire `.env.local` file
   - Paste in Environment Variables section
   - Update keys for production (Supabase, Stripe, domain URL)

### Domain Setup

1. **Domains tab** (upper right on Overview page)
2. **Add Domain** with your purchased domain
3. **Verify domain**:
   - Expand domain dropdown
   - Follow verification instructions
   - Add DNS records to your domain provider
   - Click refresh after adding records

### Production Environment Variables

Update these for production:

- All Supabase keys (from production project)
- All Stripe keys (from live mode)
- Webapp URL variable
- Any other environment-specific variables

## 🔄 Git Workflow

### Main Branch Development

- **Every push** to main deploys to production
- **Be careful** what you commit to main

### Feature Branch Development

1. **Create new branch**:

   - Click branch name (bottom left of Cursor)
   - Select "Create new branch"
   - Name it descriptively (e.g., "develop", "feature/auth")

2. **Merge via Cursor**:

   - Switch back to main branch
   - Source Control > Three dots > Pull, Push > Pull from...
   - Select feature branch
   - Sync with remote

3. **Merge via GitHub**:
   - Push feature branch to remote
   - Create Pull Request on GitHub
   - Merge and close PR

## 🎯 Project Structure

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
├── .env.local              # Environment variables (local)
├── README.md
└── package.json
```

## 📱 Features

- **Dream Recording**: Rich text with date, mood, lucid status, and tags
- **AI Insights**: Google Gemini analysis of dream symbolism and emotions
- **Subscription Model**: Free tier (5 insights) and Premium ($8/month unlimited)
- **Authentication**: Google OAuth via Supabase
- **Security**: Row Level Security, encrypted data
- **Responsive Design**: Modern, dreamy UI

## 🔧 Environment Variables

Create `.env.local` file with:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_STRIPE_PRODUCT_ID=your_product_id
NEXT_PUBLIC_STRIPE_PRICE_ID=your_price_id

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Tips for Success

- **Frequent commits**: Create checkpoints regularly
- **Use screenshots**: Provide visual context to AI
- **Be specific**: Use correct terminology when prompting AI
- **Test thoroughly**: Check both browser and terminal for errors
- **Separate environments**: Keep development and production configurations separate
- **Security first**: Never commit `.env` files to public repositories

## 🆘 Support

If you encounter issues while following this tutorial:

1. **Check console errors** (browser and terminal)
2. **Feed errors to AI** for debugging
3. **Revert to last working commit** if needed
4. **Ask AI** for clarification on any step
5. **Create an issue** in this repository for persistent problems

---

**Happy coding! 🌙✨**

Built with ❤️ using Next.js, Supabase, Stripe, and Google Gemini AI.
