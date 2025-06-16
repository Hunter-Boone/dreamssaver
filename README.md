# Dreams Saver - Complete YouTube Tutorial Guide

Build a modern dream journaling web application with AI insights from scratch. This repository contains the complete source code for the Dreams Saver app, which allows users to record their dreams and receive AI-powered insights. This guide follows the exact workflow from the YouTube tutorial.

## 🎥 **Watch the Complete Video Tutorial**

[![Dreams Saver Tutorial](https://img.shields.io/badge/▶️_Watch_Tutorial-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/lbzsbaJfv10)

**👆 Click above to watch the full video tutorial on YouTube!**

This written guide complements the video perfectly - use them together for the best learning experience. The video shows you exactly what to click and provides visual context, while this README serves as your detailed reference guide.

## 🎯 What You'll Build

A full-stack web application featuring:

- 🌙 **Dream Recording**: Capture dreams with date, mood, lucid status, and custom tags
- 🤖 **AI-Powered Insights**: Google Gemini analyzes dream symbolism and emotional content
- 💳 **Stripe Subscriptions**: Free tier (5 insights) and Premium ($8/month unlimited insights)
- 🔐 **Google OAuth**: Secure authentication through Supabase
- 📱 **Modern UI**: Responsive, dreamy aesthetic built with Next.js and Tailwind
- ☁️ **Production Ready**: Deployed on Vercel with custom domain

## 📋 Required Software

Before we start building, you'll need to install these tools. Make sure you have all of these before proceeding:

- **Cursor AI**: [https://www.cursor.com/](https://www.cursor.com/) - This is our AI-powered code editor that will help us write code intelligently
- **Node.js**: [https://nodejs.org/en/download](https://nodejs.org/en/download) - JavaScript runtime needed to run our Next.js application
- **Git**: [https://git-scm.com/](https://git-scm.com/) - Version control system for tracking our code changes and deploying to GitHub
- **Claude Desktop**: [https://claude.ai/download](https://claude.ai/download) - AI assistant that will generate our initial application structure

## 🔗 Useful Links

Keep these tabs open during development - you'll need them throughout the process:

- **Hostinger** (Domain Registration): [https://hostinger.com?REFERRALCODE=TZKHUNTERM0F](https://hostinger.com?REFERRALCODE=TZKHUNTERM0F)
- **Supabase** (Database & Auth): [https://supabase.com/](https://supabase.com/)
- **Vercel** (Hosting & Deployment): [https://vercel.com/](https://vercel.com/)
- **VibeCodeDocs** (AI Documentation): [https://www.vibecodedocs.dev/](https://www.vibecodedocs.dev/)
- **GitHub** (Code Repository): [https://github.com/](https://github.com/)
- **Google Cloud Console** (OAuth Setup): [https://console.cloud.google.com/](https://console.cloud.google.com/)
- **Stripe** (Payment Processing): [https://stripe.com/](https://stripe.com/)

## 🚀 Essential Commands

You'll use these commands throughout development:

```bash
# Install all dependencies
npm install

# Fix vulnerabilities
npm audit fix --force

# Start your development server (use this every time you want to run your app locally)
npm run dev

# Build your application for production (Vercel does this automatically)
npm run build

# Stop any running process in terminal
Ctrl+C

# Stripe CLI commands for webhook testing
stripe login
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

> **Important Note**: Your webhook endpoint URL may be different depending on how your application is structured. When in doubt, ask the AI in Cursor what your specific webhook endpoint should be.

## 📖 Complete Step-by-Step Tutorial

### Step 1: Brainstorm Your Idea and Secure Your Domain

**Generate Your Application Idea**
First, you need to come up with an idea for your application. You can use any AI tool (ChatGPT, Claude, Gemini) to help brainstorm. Think about problems you want to solve or interesting applications you'd like to build. For this tutorial, we're building Dreams Saver, but you can adapt this process for any web application.

**Purchase Your Domain**

1. **Visit Hostinger**: Go to [https://hostinger.com?REFERRALCODE=TZKHUNTERM0F](https://hostinger.com?REFERRALCODE=TZKHUNTERM0F) and create an account
2. **Use AI Domain Generator**: Look for the "Generative Domain using AI" option - this is a fantastic feature that uses AI to suggest available domains based on your project idea
3. **Choose and Purchase**: Select a domain that fits your project and purchase it. You'll need this later when we deploy to production
4. **Keep Domain Info Handy**: Write down your domain name - you'll need it for several configuration steps later

### Step 2: Generate Professional Project Documentation

This step is crucial for getting better results from AI tools throughout development.

1. **Visit VibeCodeDocs**: Navigate to [https://www.vibecodedocs.dev/](https://www.vibecodedocs.dev/)
2. **Create Account**: Sign up for a new account
3. **Start New Project**: Click to create a new project and give it your application name
4. **Answer Questions Thoroughly**: The system will ask you detailed questions about your application. Be as specific as possible - this helps generate better documentation.
   - It's also worth noting that the rest of the tutorial is using Next.js/React/shadcn/Tailwind. So if you want to follow this exactly then you can use these technologies and you'll want to answer the questions with this in mind
5. **Generate Documentation**: Let the AI create comprehensive project documents
6. **Download Everything**: Download all generated documents - you'll attach these to Claude in the next step

### Step 3: Setup Claude Desktop with Filesystem Access

Claude Desktop needs special permissions to create files on your computer. Here's how to set that up:

**Configure the MCP Server**

1. **Open Claude Desktop** application on your computer
2. **Access Settings**: Go to `File -> Settings -> Developer -> Edit Config`
3. **Edit Configuration**: This opens your `claude_desktop_config.json` file. Replace the entire contents with:

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

4. **Save and Restart**: Save the file and completely restart Claude Desktop for the changes to take effect
5. **Verify Installation**: When you restart, Claude should now have the ability to create and modify files on your system

### Step 4: Generate Your Initial Application with Claude

This is where the magic happens - Claude will create your entire application structure.

**Prepare Your Documentation**

1. **Open Claude Desktop** (make sure it's the restarted version with MCP server)
2. **Attach Documentation**: Upload all the documentation files you downloaded from VibeCodeDocs
3. **Use This Exact Prompt**: Copy and paste this prompt exactly:

```
Create this webapp in the Projects folder under dreamssaver. For any API keys or secrets, put them in a .env.local file so they can be set later. Use the most recent versions for packages and third party dependencies.
```

**Monitor the Generation Process**

- Claude will start creating your application file by file
- This process can take several minutes
- **Important**: Claude will occasionally pause and stop generating. When this happens, simply tell it "continue" and it will resume
- Don't worry if it seems to take a long time - Claude is creating a lot of files and setting up a complete application structure

### Step 5: Open Your Project in Cursor AI

Now we'll switch to Cursor for the rest of our development process.

1. **Launch Cursor AI** application
2. **Open Folder**: Click "Open Folder" (or use Ctrl+O)
3. **Navigate to Your Project**: Find the folder that Claude created. It should be in your Projects folder under "dreamssaver"
4. **Select the Project**: Click on the dreamssaver folder and select it
5. **Explore the Structure**: Take a moment to look at what Claude created - you should see a complete Next.js application with components, pages, and configuration files

### Step 6: Initialize Your Git Repository

Git is essential for tracking changes and deploying your application. Here's how to set it up:

**Initialize Git**

1. **Open Source Control**: In Cursor, look for the Source Control panel on the left sidebar, or use the keyboard shortcut `Ctrl+Shift+G G` on Windows
2. **Initialize Repository**: Click the "Initialize Repository" button
3. **Stage All Changes**: Hover over the "Changes" section and you'll see icons appear. Click the "+" icon to stage all changes
4. **Write Commit Message**: In the message box, type "Initial Commit" (this is your first checkpoint)
5. **Commit Changes**: Click the "Commit" button

**Why This Matters**: Every commit is like a save point for your project. If something goes wrong later, you can always revert back to any previous commit.

### Step 7: Upload Your Code to GitHub

GitHub will store your code in the cloud and enable automatic deployment.

**Publish to GitHub**

1. **Publish Branch**: Click the "Publish Branch" button in the Source Control panel
2. **GitHub Login**: Cursor will open a browser tab asking you to sign in to GitHub. Complete the login process
3. **Repository Settings**: Back in Cursor, you'll see a command palette at the top where you can:
   - Enter your repository name (e.g., "dreamssaver")
   - Choose between public or private repository
   - Press Enter to create the repository
4. **Confirm Upload**: Cursor will upload all your code to GitHub

**For Future Changes**: After this initial setup, you'll use the "Commit and Push" option from the Commit dropdown to automatically push changes to GitHub.

### Step 8: Run Your Application Locally

Let's see your application in action!

**Install all the dependencies**

1. **Open Terminal**: In Cursor, open the integrated terminal (Terminal -> New Terminal), and run the following command

```bash
npm install
```

**Start the Development Server**

1. **Open Terminal**: In Cursor, open the integrated terminal (Terminal -> New Terminal)
2. **Run the Application**: Type the following command:

```bash
npm run dev
```

3. **Access Your App**: Open your browser and go to `http://localhost:3000`
4. **Explore**: You should see your Dreams Saver application running! Click around and explore what Claude created

**Stopping the Application**: When you want to stop the development server, go back to the terminal and press `Ctrl+C`.

### Step 9: Master the Development Loop

This is the core workflow you'll use throughout development:

**The Development Cycle**

1. **Identify What to Change**: Look at your application and decide what you want to add, modify, or fix
2. **Ask the AI**: Use Cursor's AI features to implement changes. Be specific about what you want
3. **Test Your Changes**: Refresh your browser to see the changes in action
4. **Check for Errors**: Always monitor both:
   - **Browser Console**: Press F12 and check the Console tab for JavaScript errors
   - **Terminal Output**: Look for any error messages in your terminal where npm run dev is running
5. **Create Checkpoints**: When something works well, create a Git commit
6. **Handle Problems**: If something breaks, you have options:
   - Feed error messages to the AI for fixes
   - Use "Discard Changes" in Source Control to revert to your last working commit

**Pro Development Tips**

- **Take Screenshots**: When asking AI for help, screenshots provide valuable context
- **Be Verbose**: Explain exactly what you want, use proper terminology
- **Use AI for Understanding**: Ask the AI to explain parts of the codebase when you need more context
- **Commit Frequently**: Think of commits as save points in a video game

## 🗄️ Complete Supabase Database Setup

Supabase will handle our database and authentication. Here's the complete setup process:

### Create Your Supabase Project

1. **Create Account**: Go to [https://supabase.com/](https://supabase.com/) and sign up
2. **New Project**: Click "New Project" and fill out:
   - Project name (e.g., "dreamssaver-dev")
   - Database password (save this somewhere safe)
   - Region (choose closest to your users)
3. **Wait for Setup**: Supabase will create your project (takes 1-2 minutes)

### Setup Your Database Schema

1. **Ask AI for SQL**: In Cursor, ask the AI: "Please output all the SQL needed to create the database tables for this application"
2. **Copy SQL Output**: The AI will provide CREATE TABLE statements and other SQL commands
3. **Open SQL Editor**: In Supabase, click "SQL Editor" on the left sidebar
4. **Paste and Execute**:
   - Paste the SQL into the editor
   - Click "Run" to execute
   - If you get errors, copy them back to the AI in Cursor for fixes
5. **Verify Tables**: Check the "Table editor" to confirm your tables were created

### Get Your API Keys

**From the Home Page**:

1. **Scroll Down**: On your project's home page, scroll down to find the API details
2. **Copy These Values**:
   - Project URL (starts with https://)
   - Anon/Public Key (long string starting with "eyJ")

**Get Service Role Key**:

1. **Go to Settings**: Click the gear icon, then "API"
2. **Find Service Role**: Look for "service_role" key
3. **Copy Key**: This is your secret key - never share this publicly!

**Add to Environment Variables**:
Create or update your `.env.local` file with these keys (we'll set this up completely later).

### Setup Google Authentication

**In Supabase**:

1. **Authentication Settings**: Go to Authentication -> Sign-In/Providers
2. **Find Google**: Scroll down to the Google provider
3. **Enable Google**: Toggle it on (but don't save yet - we need the OAuth setup first)

**Create Google OAuth Application**:

1. **Google Cloud Console**: Visit [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. **Sign In**: Use your Google account
3. **Create Project**:
   - Click "Select a project" at the top
   - Click "New Project" in the upper right
   - Give it a name (e.g., "dreamssaver-oauth")
   - Click "Create"
4. **Select Your Project**: Make sure your new project is selected
5. **Setup OAuth Consent**:
   - Go to "APIs & Services" -> "OAuth consent screen"
   - Click "Get Started"
   - Fill out the required information
   - Save and continue through the steps
6. **Create OAuth Client**:
   - Go to "APIs & Services" -> "Credentials"
   - Click "Create Credentials" -> "OAuth client ID"
   - Application type: "Web application"
   - Name: Your app name
   - **Authorized redirect URIs**: Go back to Supabase Auth settings and copy the "Callback URL" - paste this here
7. **Get Credentials**: Google will show you a Client ID and Client Secret

**Back in Supabase**:

1. **Paste Credentials**: Enter the Client ID and Client Secret from Google
2. **Save Configuration**: Click Save
3. **Enable Provider**: Make sure "Enable sign in with Google" is checked

### Configure URL Settings

1. **URL Configuration**: In Supabase, go to Authentication -> URL Configuration
2. **Site URL**:
   - Development: `http://localhost:3000`
   - Production: `https://www.yourdomain.com` (use your actual domain)
3. **Redirect URLs**: Add your callback URL:
   - Development: `http://localhost:3000/auth/callback`
   - Production: `https://www.yourdomain.com/auth/callback`
   - (Ask the AI in Cursor what your specific callback path should be)

**Important for Production**: You'll need to create a separate Supabase project for production with production URLs. You can reuse the same Google OAuth client for both environments.

## 💳 Complete Stripe Integration Setup

Stripe handles all payment processing for our subscription model.

### Initial Stripe Account Setup

1. **Create Account**: Go to [https://stripe.com/](https://stripe.com/) and sign up
2. **Complete Business Setup**: Follow the setup guide in the bottom right of the dashboard
3. **Understand Test Mode**: You'll start in "Test Mode" which means no real money changes hands - perfect for development

### Get Your API Keys

1. **Dashboard Home**: On your Stripe dashboard home page
2. **Find API Keys**: Look for a section on the right showing "Publishable key" and "Secret key"
3. **Copy Both Keys**: You'll need both for your environment variables
4. **Sandbox vs Live**: Make sure you're copying from "Sandbox" mode for development

### Create Your Subscription Product

1. **Create Product**: In Stripe dashboard, create a new product
2. **Product Settings**:
   - Name: "Premium Subscription" (or whatever you prefer)
   - Description: "Unlimited AI dream insights"
3. **Set Price**:
   - Create a new price
   - Set to $8.00 per month
   - Recurring billing
4. **Get IDs**: After creating:
   - **Product ID**: Found on the product page (starts with "prod\_")
   - **Price ID**: Click on the price, copy the Price ID (starts with "price\_")

**Configure in Your App**:
Ask Cursor AI with this exact prompt:

```
I have created my Stripe account and am currently in the sandbox. For the Premium subscription here are my product and pricing ID's. Please make these environment variables so that I can change them in production
product_id: [paste your product ID]
pricing_id: [paste your price ID]
```

**Important**: Both environment variables should have `NEXT_PUBLIC_` prefix so they're accessible from the browser.

### Webhook Setup for Development

Webhooks notify your app when payments succeed. Here's how to test this locally:

**Install Stripe CLI**:

1. **Download**: Go to [https://docs.stripe.com/stripe-cli#install](https://docs.stripe.com/stripe-cli#install)
2. **Install for Your OS**: Follow instructions for Windows, Mac, or Linux
3. **Add to PATH**: Make sure the stripe command is available in your terminal
4. **Verify**: Open terminal and type `stripe --version` to confirm installation

**Setup Development Webhook**:

1. **Login**: In terminal, run `stripe login` and complete the browser login
2. **Forward Events**: Run this command:

```bash
stripe listen --forward-to http://localhost:3000/api/webhook/stripe
```

3. **Get Webhook Secret**: The command output includes a webhook signing secret (starts with "whsec\_")
4. **Add to Environment**: Copy this secret to your `.env.local` file

**Test the Integration**: With your app running (`npm run dev`) and the stripe listen command running, you should be able to complete test purchases that trigger your webhook.

### Webhook Setup for Production

When you deploy to production, you'll need a real webhook:

1. **Stripe Dashboard**: Search for "Webhooks" at the top of Stripe
2. **Add Endpoint**: Click "Add endpoint" or "Add destination"
3. **Endpoint URL**: Enter `https://yourdomain.com/api/webhook/stripe` (use your actual domain)
4. **Select Events**: Ask the AI what events your app needs:

```
What events does my webhook listen for in Stripe? I need to setup the Stripe webhook and need to select the appropriate events for my application
```

5. **Add Events**: Search for and add each event the AI mentions
6. **Get Signing Secret**: After saving, copy the webhook signing secret for your production environment variables

## 🚀 Deploy to Production with Vercel

Vercel makes deployment incredibly easy and integrates perfectly with GitHub.

### Initial Deployment Setup

1. **Create Vercel Account**: Go to [https://vercel.com/](https://vercel.com/) and sign up
2. **Connect GitHub**: Click "Continue with GitHub" and authorize Vercel to access your repositories
3. **Import Project**:
   - From the Vercel dashboard, click "Import"
   - Find your dreamssaver repository
   - Click "Import" next to it

### Configure Environment Variables

This is the most critical step - your app won't work without proper environment variables:

1. **Environment Variables Section**: During import, you'll see an "Environment Variables" section
2. **Easy Method**:
   - Open your local `.env.local` file
   - Select all content and copy it
   - In Vercel, click in the first text box (should say "NAME")
   - Paste - Vercel will automatically parse all your variables
3. **Update Values**: Change these variables for production:
   - Supabase keys (from your production Supabase project)
   - Stripe keys (from live mode when ready to accept real payments)
   - `NEXT_PUBLIC_APP_URL` (change to your domain)

### Complete Deployment

1. **Deploy**: Click "Deploy" - Vercel will build and deploy your app
2. **Wait for Build**: This takes 2-5 minutes
3. **Test Deployment**: Vercel provides a temporary URL to test your app

### Setup Custom Domain

1. **Domains Tab**: In your Vercel project, click "Domains" in the top navigation
2. **Add Domain**: Click "Add Domain" and enter the domain you purchased from Hostinger
3. **Verify Ownership**: Vercel will give you DNS records to add
4. **Configure DNS**:
   - Log into your Hostinger account
   - Go to DNS management for your domain
   - Add the DNS records exactly as Vercel specifies
   - This varies by provider, but usually involves adding A records or CNAME records
5. **Verify**: Back in Vercel, click "Refresh" - your domain should become active

### Production Environment Setup

**Create Production Supabase Project**:

1. Follow the same Supabase setup steps as development
2. Use production URLs in all configurations
3. Update Vercel environment variables with production Supabase keys

**Switch Stripe to Live Mode** (when ready for real payments):

1. In Stripe dashboard, exit from "Sandbox" to "Live" mode
2. Recreate your products in live mode
3. Setup production webhooks
4. Update Vercel environment variables with live Stripe keys

## 🔄 Git Workflow and Branching Strategy

Understanding Git workflow is crucial for safe development and deployment.

### Understanding the Main Branch

- **Auto-Deployment**: Every time you push to the main branch, Vercel automatically deploys to production
- **Be Careful**: Only push to main when you're confident your changes work properly
- **Test First**: Always test changes locally before pushing to main

### Feature Branch Development

When working on larger features or experimental changes:

**Create a Feature Branch**:

1. **Branch Selector**: In Cursor, look at the bottom left corner - you'll see the current branch name (probably "main")
2. **Create New Branch**: Click on it, and select "Create new branch"
3. **Name Your Branch**: Use descriptive names like:
   - "develop" (for general development)
   - "feature/user-profiles" (for specific features)
   - "fix/login-bug" (for bug fixes)

**Work on Your Feature**:

- Make changes and commits as normal
- Your commits go to the feature branch, not main
- Production remains unaffected

### Merging Changes

**Method 1: Using Cursor**

1. **Switch to Main**: Click the branch selector and choose "main"
2. **Pull Changes**: Source Control panel -> Three dots (...) -> "Pull, Push" -> "Pull from..."
3. **Select Feature Branch**: Choose your feature branch to merge its changes into main
4. **Push to Remote**: Use "Sync Changes" or "Push" to send the updated main branch to GitHub
5. **Automatic Deployment**: Vercel automatically deploys the updated main branch

**Method 2: Using GitHub Pull Requests**

1. **Push Feature Branch**: Make sure your feature branch is pushed to GitHub
2. **Create Pull Request**: On GitHub, you'll see a banner asking if you want to create a pull request
3. **Review Changes**: Fill out the pull request with description of changes
4. **Merge**: Click "Merge pull request" to merge into main
5. **Automatic Deployment**: Vercel deploys the updated main branch

## 🎯 Complete Project Structure

Understanding your project structure helps with development:

```
dreamssaver/
├── src/
│   ├── app/                          # Next.js 13+ app directory
│   │   ├── (auth)/                   # Route group for auth pages
│   │   │   ├── login/                # Login page
│   │   │   └── signup/               # Signup page
│   │   ├── dashboard/                # Protected dashboard pages
│   │   │   ├── page.tsx              # Main dashboard
│   │   │   └── dreams/               # Dream-related pages
│   │   ├── settings/                 # User settings pages
│   │   ├── api/                      # API routes (backend)
│   │   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── dreams/               # Dream CRUD operations
│   │   │   ├── stripe/               # Stripe webhook and payments
│   │   │   └── ai/                   # AI insight generation
│   │   ├── globals.css               # Global styles and Tailwind
│   │   ├── layout.tsx                # Root layout component
│   │   └── page.tsx                  # Home/landing page
│   ├── components/                   # Reusable React components
│   │   ├── ui/                       # shadcn/ui components (buttons, forms, etc.)
│   │   ├── common/                   # Shared components (header, footer, etc.)
│   │   ├── dashboard/                # Dashboard-specific components
│   │   ├── auth/                     # Authentication components
│   │   └── forms/                    # Form components
│   ├── lib/                          # Utility functions and configurations
│   │   ├── auth/                     # Authentication helpers and middleware
│   │   ├── db/                       # Database client (Supabase) and type definitions
│   │   ├── ai/                       # AI integration (Google Gemini)
│   │   ├── stripe/                   # Stripe client and utility functions
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── utils.ts                  # General utility functions
│   │   └── validations.ts            # Form validation schemas
│   ├── types/                        # TypeScript type definitions
│   │   ├── database.ts               # Database types
│   │   ├── auth.ts                   # Authentication types
│   │   └── index.ts                  # General types
│   └── config/                       # Application configuration
│       ├── database.ts               # Database configuration
│       ├── auth.ts                   # Auth configuration
│       └── constants.ts              # App constants
├── .env.local                        # Environment variables (DO NOT COMMIT)
├── .env.example                      # Example environment file
├── .gitignore                        # Files to ignore in Git
├── README.md                         # This documentation
├── package.json                      # Dependencies and scripts
├── tailwind.config.js                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
└── next.config.js                    # Next.js configuration
```

## 📱 Application Features Deep Dive

### Dream Recording System

- **Rich Text Input**: Users can write detailed dream descriptions
- **Metadata Capture**: Date, mood upon waking, lucid dream status
- **Tagging System**: Free-form tags for categorization and search
- **Auto-Save**: Prevents data loss during entry

### AI Insight Generation

- **Google Gemini Integration**: Advanced AI analysis of dream content
- **Symbolism Analysis**: Identifies common dream symbols and meanings
- **Emotional Analysis**: Correlates dream content with waking mood
- **Respectful Interpretation**: Presents insights as suggestions, not definitive meanings

### Subscription Management

- **Free Tier**: Unlimited dream recording, 5 AI insights
- **Premium Tier**: $8/month for unlimited AI insights
- **Stripe Integration**: Secure payment processing
- **Customer Portal**: Users can manage subscriptions independently

### Security and Privacy

- **Row Level Security**: Database ensures users only see their own data
- **OAuth Authentication**: Secure login through Google
- **Data Encryption**: All data encrypted in transit and at rest
- **Privacy First**: Dreams are private and never shared

## 🔧 Complete Environment Variables Guide

Create a `.env.local` file in your project root with these variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key-here

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-publishable-key
STRIPE_SECRET_KEY=sk_test_your-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
NEXT_PUBLIC_STRIPE_PRODUCT_ID=prod_your-product-id
NEXT_PUBLIC_STRIPE_PRICE_ID=price_your-price-id

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Key Points**:

- **Never commit `.env.local`** - it's in `.gitignore` for security
- **NEXT_PUBLIC** variables are accessible in the browser
- **Non-prefixed** variables are server-side only
- **Production**: Use different values for each environment

## 💡 Expert Development Tips

### AI-Assisted Development

- **Be Specific**: Instead of "fix this", say "the login button should redirect to dashboard after successful authentication"
- **Provide Context**: Include error messages, screenshots, and expected behavior
- **Use Proper Terminology**: Learn the terms for what you're building (components, hooks, middleware, etc.)
- **Ask for Explanations**: When AI changes code, ask it to explain what it did and why

### Debugging Strategies

- **Browser Console**: Always have dev tools open (F12) to catch JavaScript errors
- **Network Tab**: Check API calls and responses when things aren't working
- **Terminal Output**: Watch for build errors and warnings in your npm run dev terminal
- **Step-by-Step Testing**: Test one change at a time to isolate issues

### Git Best Practices

- **Commit Early and Often**: Think of commits as save points
- **Descriptive Messages**: Write commit messages that explain what changed
- **Test Before Committing**: Always test your changes before creating a commit
- **Use Branches**: Keep experimental work separate from working code

### Performance Considerations

- **Image Optimization**: Use Next.js Image component for better performance
- **API Rate Limits**: Be mindful of AI API usage and implement caching where appropriate
- **Database Queries**: Use proper indexing and avoid N+1 query problems
- **Bundle Size**: Monitor your bundle size and remove unused dependencies

## 🆘 Comprehensive Troubleshooting Guide

### Common Issues and Solutions

**"npm run dev" Fails**:

- Check that Node.js is installed: `node --version`
- Delete `node_modules` and `package-lock.json`, then run `npm install`
- Check for syntax errors in your code

**Supabase Connection Issues**:

- Verify environment variables are correct
- Check that your Supabase project is running
- Ensure RLS policies are properly configured

**Stripe Webhook Not Working**:

- Confirm `stripe listen` is running for development
- Check webhook secret matches your environment variable
- Verify webhook endpoint URL is correct

**Google OAuth Issues**:

- Check that redirect URLs match exactly between Google Cloud and Supabase
- Ensure OAuth consent screen is configured
- Verify client ID and secret are correct

**Deployment Issues on Vercel**:

- Check build logs for specific error messages
- Verify all environment variables are set in Vercel
- Ensure production database and services are configured

### Getting Help

1. **Read Error Messages Carefully**: Most errors tell you exactly what's wrong
2. **Copy Full Error Messages**: When asking for help, include the complete error
3. **Check Recent Changes**: If something just broke, look at what you changed recently
4. **Use Git History**: Compare working vs broken versions of your code
5. **Ask AI for Help**: Paste error messages into Cursor for AI assistance

### Emergency Recovery

- **Discard All Changes**: Source Control -> Discard Changes (reverts to last commit)
- **Revert to Specific Commit**: Source Control -> View history -> Reset to commit
- **Redeploy**: Sometimes redeploying to Vercel fixes deployment issues

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎉 Conclusion

Congratulations! You now have a complete guide to building and deploying a modern web application. This tutorial covers everything from initial idea to production deployment, including:

- ✅ Domain registration and project planning
- ✅ AI-assisted code generation and development
- ✅ Database setup and authentication
- ✅ Payment processing integration
- ✅ Production deployment and domain configuration
- ✅ Professional development workflows

**Next Steps**:

- Customize the design to match your vision
- Add additional features based on user feedback
- Implement analytics to understand user behavior
- Scale your infrastructure as your user base grows

**Remember**: This is just the beginning. The real magic happens when you start iterating based on user feedback and your own creative ideas. Keep experimenting, keep learning, and most importantly, keep building!

---

**Happy coding! 🌙✨**

_Built with ❤️ using Next.js, Supabase, Stripe, and Google Gemini AI_

_Follow the YouTube tutorial for visual guidance and additional tips!_
