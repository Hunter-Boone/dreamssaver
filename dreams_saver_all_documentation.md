# Dreams Saver

## Project Description

A webapp that tracks your dreams and gives insights using AI. We'll use Gemini AI to give insights. The app should be stylized and somewhat dreamy.

There should be a landing page describing the product along with a text box for users to submit their first dream. This will sign the user up and submit their dream. The user will have a dashboard page that displays all of their recordings. If they click on a recording, they should be taken to another page that contains their recording and meta information as well as the AI insight/significance.

For the free tier they will be able to record as many dreams as they wish, but they'll only get 5 free AI insights. There will just be one subscription that allows them unlimited AI insights for $8/month.

## Product Requirements Document

Product Requirements Document: Dreams Saver

1. Introduction
   The "Dreams Saver" web application aims to provide users with a dedicated platform to meticulously track and record their dreams, offering a unique blend of personal journaling with advanced artificial intelligence insights. Leveraging Gemini AI, the app will analyze dream content to provide potential symbolism and emotional correlations, helping users better understand their subconscious narratives. The application will feature a stylized, dreamy aesthetic, fostering a calming and reflective user experience.

2. Goals

- To create an intuitive and visually appealing platform for users to record their dreams.
- To provide meaningful, interpretive insights into recorded dreams using Gemini AI, fostering self-reflection.
- To enable users to fulfill their desire for lucid dreaming by consistently tracking their dream experiences.
- To offer a centralized, easily accessible repository for all recorded dreams, preventing them from being forgotten.
- To establish a sustainable monetization model through a subscription service for unlimited AI insights.
- To ensure a performant, scalable, and secure environment for sensitive user data.

3. Target Audience & Value Proposition
   **Target Audience:** Individuals interested in dream journaling, self-discovery, psychology, and those aspiring to achieve lucid dreams. Users who seek a structured yet fluid way to document their nocturnal experiences.
   **Value Proposition:** "Dreams Saver" allows users to fulfill their desire to lucid dream by providing a consistent dream recording habit. It also gives the user a centralized place to store and revisit all of their recorded dreams that they may have forgotten. Ideally, the user would open this app first thing in the morning and write down their dream, making it an integral part of their morning routine for introspection and memory retention. The AI insights provide a unique value by offering objective interpretations and connections to waking life emotions, enriching the journaling experience without making definitive claims.

4. User Stories

**General**

- As a first-time user, I want to easily submit my first dream to get started with the app.
- As a returning user, I want to quickly access my dashboard to view past dream recordings.
- As a user, I want the app to feel calming and intuitive, without visual clutter.

**Dream Recording & Management**

- As a user, I want to record a dream entry with the date it occurred, an optional title, my mood upon waking, and whether it was a lucid dream.
- As a user, I want to add free-form tags/keywords to my dream entries for easy categorization and future retrieval.
- As a user, I want to be able to view a list of all my recorded dreams on a dashboard.
- As a user, I want to click on a specific dream from my dashboard to view its full details and associated insights.

**AI Insights**

- As a user, I want Gemini AI to provide insights into potential symbolism of key elements in my dream.
- As a user, I want the AI to analyze the overall emotional tone of my dream and relate it to my 'Mood upon Waking'.
- As a user, I want the AI insights to be framed as possibilities or common themes, not definitive declarations, encouraging my personal reflection.
- As a free-tier user, I want to receive 5 free AI insights to experience the feature before subscribing.

**Monetization & Subscription**

- As a user, I want to understand the difference between the free and premium tiers.
- As a user, I want to easily subscribe to the premium tier for unlimited AI insights.
- As a subscribed user, I want to manage my subscription and billing details.

**Data & Analytics (Future)**

- As a user with many dreams, I want to filter my dreams by 'Mood upon Waking', 'Lucid Dream' status, and specific 'Tags/Keywords'.
- As a user, I want to search for keywords within my dream descriptions.
- As a user, I want a dedicated section to manage all my tags, showing how many dreams are associated with each tag.

5. Features

5.1. Landing Page

- **Description**: The initial entry point for new users. It will clearly describe the "Dreams Saver" product.
- **Components**:

  - Product description and value proposition.
  - Large text box for users to submit their first dream.
  - Call-to-action (CTA) to "Submit First Dream" which also initiates the signup process.

    5.2. Authentication & Onboarding

- **Description**: Seamless user signup and login flow.
- **Mechanism**: Supabase OAuth for authentication.
- **Flow**: Submitting the first dream on the landing page will trigger the signup via Supabase OAuth. Subsequent logins will direct users to their dashboard.

  5.3. Dream Recording

- **Description**: Interface for users to input new dream entries.
- **Fields**:
  - **Dream Content (Textarea)**: Primary field for the user to write down their dream in detail.
  - **Date (Date Picker)**: Date the dream occurred or was recorded. Default to current date.
  - **Dream Title (Text Input, Optional)**: Short, optional title for easy identification.
  - **Mood upon Waking (Dropdown/Radio Buttons)**: Simple selection from predefined options ('Happy', 'Anxious', 'Calm', 'Neutral', 'Excited').
  - **Lucid Dream (Checkbox)**: Simple checkbox for 'Was this a Lucid Dream?'.
  - **Tags/Keywords (Free-form Input)**: Field for users to type in multiple relevant tags like 'flying', 'school', 'ex-partner', 'anxiety', 'water'. These should be stored as distinct tags.
- **Submission**: Button to save the dream entry.

  5.4. Dashboard (Dream List)

- **Description**: Main user page displaying all recorded dreams.
- **Components**:

  - List of all recorded dreams, possibly paginated or infinite scroll.
  - Each list item should display: Dream Title, Date, Mood upon Waking, and a snippet of the dream content.
  - Clicking on a dream entry navigates to the individual dream view page.
  - Prominent "Record New Dream" button.
  - **Future Feature (Phase 2/3)**: Search bar for dream descriptions.
  - **Future Feature (Phase 2/3)**: Filtering options by:
    - Mood upon Waking
    - Lucid Dream status
    - Tags/Keywords (multi-select)
  - **Future Feature (Phase 2/3)**: Dedicated "Tags Management" section showing all unique tags and their associated dream counts.

    5.5. Individual Dream View

- **Description**: Dedicated page for a single dream entry, displaying all its details and AI insights.
- **Components**:

  - Dream Title.
  - Date.
  - Mood upon Waking.
  - Lucid Dream status.
  - Full Dream Content.
  - Tags/Keywords.
  - **AI Insight Section**: Displays the analysis generated by Gemini AI.

    5.6. AI Insights

- **Description**: Automated analysis of dream content provided by Gemini AI.
- **Functionality**:
  - Analyzes key elements for potential symbolism based on common dream interpretations (e.g., flying, water).
  - Analyzes the overall emotional tone of the dream and its relation to the 'Mood upon Waking'.
  - Presents insights as possibilities or common themes, encouraging personal reflection.
  - **Crucially, it will not make definitive declarations about the dream's meaning.**
- **Limitations**:

  - **Free Tier**: Users receive 5 free AI insights. After consuming these, a prompt to subscribe will appear when attempting to generate further insights.
  - **Premium Tier**: Unlimited AI insights upon subscription.

    5.7. Subscription Management

- **Description**: Page for users to subscribe and manage their premium membership.
- **Components**:
  - Pricing information for the premium tier ($8/month).
  - Option to subscribe.
  - Display of current subscription status (Free/Premium).
  - Options to manage subscription (e.g., cancel, update payment info) for premium users.
- **Payment Processing**: Stripe integration.

6. Information Architecture / Data Model

**Dream Entry Object:**

- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to Supabase Auth user)
- `dream_content`: TEXT (The detailed description of the dream)
- `dream_date`: DATE (Date the dream occurred or was recorded)
- `dream_title`: VARCHAR(255) (Optional short title)
- `mood_upon_waking`: ENUM('Happy', 'Anxious', 'Calm', 'Neutral', 'Excited')
- `is_lucid_dream`: BOOLEAN
- `created_at`: TIMESTAMP (Auto-generated)
- `updated_at`: TIMESTAMP (Auto-generated)

**Tags Table:**

- `tag_id`: UUID (Primary Key)
- `tag_name`: VARCHAR(100) (e.g., 'flying', 'water', 'anxiety')
- `user_id`: UUID (Foreign Key to Supabase Auth user, for user-specific tags or general tags)

**Dream_Tags Junction Table:**

- `dream_id`: UUID (Foreign Key to Dream Entry)
- `tag_id`: UUID (Foreign Key to Tags)
- (Composite Primary Key: `dream_id`, `tag_id`)

**AI Insight Object:**

- `id`: UUID (Primary Key)
- `dream_id`: UUID (Foreign Key to Dream Entry)
- `insight_text`: TEXT (The AI-generated interpretation)
- `generated_at`: TIMESTAMP
- `tokens_used`: INT (Optional, for internal tracking of AI costs)

**User Profile (Supabase Auth extended):**

- `user_id`: UUID (Supabase Auth ID)
- `ai_insights_used_count`: INT (For free tier tracking)
- `is_premium`: BOOLEAN
- `stripe_customer_id`: VARCHAR(255) (Stripe customer ID for subscription management)

7. User Experience (UX) & Design Aesthetic

**Overall Vision:** The app should feel calming and spacious, much like a serene journaling experience, with ample whitespace to prevent visual clutter. The desired emotional feeling is one of tranquility, introspection, and quiet reflection, encouraging users to easily capture their dreams without feeling rushed or overwhelmed. Heavily inspired by the soothing design of apps like Calm or Headspace.

**Color Palette:** Primarily muted pastel blues, lavenders, and soft grays. Subtle accents of peach or very light gold. Evokes peaceful hues of dawn or twilight.

**Typography:**

- **Body Text:** Highly legible sans-serif font (e.g., Lato or Montserrat) for ease of reading, especially when recording dreams first thing in the morning.
- **Headings & Dream Titles:** Slightly more elegant, thin serif font (e.g., Lora or Playfair Display) to add a touch of sophistication without being overly ornate.

**Imagery & Icons:**

- **Imagery:** Minimalistic. Subtle, abstract watercolor textures in the background or very light, almost imperceptible cloud patterns that hint at the ethereal.
- **Icons:** Simple, line-based, and monochromatic to maintain the clean feel.

**Transitions & Animations:**

- **Navigation:** Intuitive and seamless, utilizing soft fade transitions between pages to avoid any jarring movements.
- **User Actions:** Gentle animations (e.g., subtle glow, text appearing smoothly) to confirm actions like dream submission without disruption.

8. Technical Specifications

**8.1. Technology Stack:**

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui.
- **Backend/Database/Authentication**: Supabase (PostgreSQL for persistence, built-in Auth for user management).
- **AI Integration**: Google Gemini AI API.
- **Payment Processing**: Stripe API.
- **Deployment**: Vercel.

**8.2. API Integrations:**

- **Supabase API**: For all CRUD operations on dream data and user management.
- **Gemini AI API**: For sending dream content and receiving insightful analysis.
- **Stripe API**: For handling subscriptions, payments, and webhooks.

9. Non-Functional Requirements

**9.1. Performance:**

- **Page Load Times**:
  - Static content (landing page): Ideally under 1 second.
  - Dynamic pages (dashboard, individual dream view): No more than 2-3 seconds.
- **AI Response Times**: Insights from Gemini AI expected within 5-10 seconds. Anything significantly longer would disrupt the morning flow.

**9.2. Scalability:**

- **User Base Growth**:
  - Initial target: 5,000-10,000 users in the first year.
  - Mid-term target: 50,000-100,000 users within 3 years.
- **Infrastructure**: Supabase and Vercel are chosen for their managed services and inherent scalability to support projected growth.

**9.3. Security:**

- **Data Encryption**: All sensitive dream content must be encrypted both at rest (in the database) and in transit (via HTTPS/SSL).
- **Authentication**: Secure user authentication via Supabase OAuth.
- **Payment Security**: PCI DSS compliance handled by Stripe. No sensitive payment information will be stored directly on our servers.
- **Access Control**: Strict role-based access control (RBAC) to ensure users can only access their own dream data.
- **Vulnerability Management**: Regular security audits and prompt patching of any identified vulnerabilities.

**9.4. Data Privacy:**

- **Compliance**: Strict adherence to data privacy regulations such as GDPR and CCPA.
- **Transparency**: Clear and concise Terms of Service and Privacy Policy.
- **User Control**: Users must have easy options for data deletion and export.
- **Data Usage**: Absolute assurance that personal dream data will never be shared, sold, or misused for purposes other than providing the core service and AI insights.

10. Monetization Strategy

**10.1. Free Tier:**

- **Features**: Unlimited dream recording and storage.
- **Limitation**: Limited to 5 free AI insights per user account.

**10.2. Premium Tier (Subscription):**

- **Cost**: $8 per month.
- **Benefits**: Unlimited AI insights.
- **Payment Method**: Handled via Stripe.

11. Constraints and Limitations

- **No Timeline Specified**: The project currently has no strict timeline or budget constraints provided, allowing for flexible development iterations.
- **AI Limitations**: The AI insights are interpretive and suggestive, not definitive. This must be clearly communicated to the user.
- **Initial Scope**: Advanced analytics, community features, and highly customized AI models are considered future enhancements beyond the initial MVP.

12. Future Considerations

- **Advanced Analytics & Visualization**: Graphical representations of dream patterns, recurring themes, mood trends, and tag frequency.
- **Guided Lucid Dreaming Program**: In-app guides or exercises to help users achieve lucid dreams.
- **AI Personalization**: Over time, the AI could potentially learn from user feedback on insights to offer more personalized interpretations.
- **Cross-Device Sync**: Ensure seamless experience across multiple devices (though implicitly supported by web app nature).
- **Export Functionality**: Allow users to export their dream data in various formats (e.g., JSON, CSV, PDF).

## Technology Stack

TECHSTACK

This document outlines the recommended technology stack for the "Dreams Saver" web application, providing justifications based on project requirements, desired user experience, scalability goals, and security considerations.

1. Frontend Framework & Libraries

- **Next.js (React Framework)**
  - **Justification**: Explicitly selected as per project requirements, Next.js provides a robust foundation for building the "Dreams Saver" web application. Its capabilities, including Server-Side Rendering (SSR) and Static Site Generation (SSG), are crucial for ensuring "very quick page load times" (under 1 second for the landing page, 2-3 seconds for dynamic pages like the dashboard), significantly enhancing the initial user experience and SEO. Next.js also supports API routes for lightweight serverless functions, complementing the Supabase backend. The framework's flexibility aligns perfectly with the desired "clean, soft aesthetic" and facilitates "intuitive and seamless navigation" with "soft fade transitions."
- **React**
  - **Justification**: As the core library powering Next.js, React is the ideal choice for developing highly interactive and dynamic user interfaces. Its component-based architecture promotes modularity, reusability, and maintainability, which is essential for building complex sections like the dashboard, dream recording forms, AI insight displays, and subscription management interfaces, contributing to a scalable and maintainable frontend codebase.

2. Styling & UI Components

- **Tailwind CSS**
  - **Justification**: Explicitly requested, Tailwind CSS is a utility-first CSS framework that enables rapid and highly customizable UI development. Its granular control over styling will be instrumental in achieving the distinctive "muted pastel blues, lavenders, and soft grays" color palette and the overall "minimalistic" aesthetic envisioned for the application, featuring subtle background textures and simple, line-based icons. This approach ensures design consistency while allowing for a unique, dreamy visual identity.
- **shadcn/ui**
  - **Justification**: Explicitly requested, shadcn/ui provides a curated collection of re-usable components built on Radix UI and styled with Tailwind CSS. This will significantly accelerate development by offering pre-built, accessible, and highly customizable UI elements for common patterns (e.g., buttons, forms, modals, data tables). This component library will be particularly valuable for constructing the dashboard's "advanced filtering and searching capabilities," tag management, and ensuring a consistent, polished user experience that aligns with the "calming and spacious" design vision.

3. Backend & Persistence

- **Supabase (PostgreSQL Database, Authentication, Edge Functions)**
  - **Justification**: As explicitly requested, Supabase serves as the comprehensive backend-as-a-service for "Dreams Saver."
    - **PostgreSQL Database**: Provides a robust, scalable, and reliable relational database. It is perfectly suited for storing all structured dream entries (Date, Title, Mood upon Waking, Lucid Dream status, free-form dream description, and Tags/Keywords), user profiles, and subscription data. Its structured nature supports the planned "advanced filtering and searching capabilities" for future features.
    - **Authentication (Supabase Auth)**: Offers secure and flexible user authentication, including support for OAuth providers (e.g., Google). This streamlines the user signup/login process, aligning with the "authentication and subscription flow details," and is critical for managing free vs. premium tiers and associating dream recordings with specific users.
    - **Edge Functions**: Supabase's serverless Edge Functions can be utilized for server-side logic that requires secure handling of sensitive API keys (such as for Gemini AI integration) or for complex data processing, keeping the frontend lean and secure.
  - **Scalability & Security**: Supabase's managed infrastructure inherently supports the projected user growth (5,000-10,000 users in the first year, potentially scaling to 50,000-100,000 users within 3 years). Its Row Level Security (RLS) features are instrumental in ensuring that "all sensitive dream content is encrypted both at rest and in transit" and facilitating adherence to data privacy regulations like "GDPR and CCPA," including clear data deletion options.

4. AI Integration

- **Google Gemini AI**
  - **Justification**: Explicitly chosen, Google Gemini AI is the core technology responsible for generating insights from user-submitted dreams. Its advanced natural language processing capabilities will be leveraged to:
    - Provide insights into "potential symbolism of key elements" present in dreams, based on common interpretations.
    - Analyze the "overall emotional tone" of the dream and relate it to the user's "Mood upon Waking."
    - Crucially, frame these insights as "possibilities or common themes," avoiding definitive declarations and encouraging personal reflection, aligning with user expectations.
  - **Performance**: The integration will be optimized to ensure that "AI response times within 5-10 seconds" are met, preventing disruption to the user's morning routine.

5. Payment Processing

- **Stripe**
  - **Justification**: Explicitly requested, Stripe is a leading, robust, and secure platform for online payment processing. It will be integral for managing the application's single subscription tier (unlimited AI insights for $8/month). Stripe's comprehensive APIs and webhook capabilities will facilitate:
    - Seamless user subscription sign-up and management.
    - Handling recurring payments efficiently.
    - Automating updates to user subscription statuses within Supabase, ensuring accurate access control for premium AI insights.

6. Deployment & Hosting

- **Vercel**
  - **Justification**: Explicitly requested, Vercel is the recommended deployment platform, specifically optimized for Next.js applications. It offers:
    - **Seamless Continuous Deployment**: Automates deployment directly from Git repositories (e.g., GitHub), streamlining the development workflow.
    - **Global CDN**: Utilizes a content delivery network to ensure "very quick page load times" globally by serving static assets from edge locations.
    - **Serverless Functions**: Supports Next.js API routes, which can securely host server-side logic, including aspects of the Gemini AI integration, if not fully handled by Supabase Edge Functions.
    - **Automatic Scaling**: Effortlessly handles traffic spikes and sustained user growth, aligning with the project's scalability requirements.

7. Development Tools & Practices

- **Git (Version Control)**
  - **Justification**: An industry-standard for collaborative software development, Git will be used for version control, allowing for tracking changes, managing different feature branches, and ensuring a robust development workflow.
- **npm/Yarn/pnpm (Package Managers)**
  - **Justification**: Standard tools for managing JavaScript project dependencies, ensuring consistent development environments across the team and efficient package management.
- **ESLint & Prettier (Code Quality & Formatting)**
  - **Justification**: These tools will be employed to enforce consistent code style, identify potential coding issues early, and maintain code readability. This is crucial for ensuring a clean, high-quality, and maintainable codebase, especially as the project evolves and new features are added.

## Project Structure

PROJECT STRUCTURE

This section details the directory and file organization of the "Dreams Saver" web application. The structure follows best practices for Next.js applications using the App Router, ensuring maintainability, scalability, and clear separation of concerns.

```
dreams-saver/
├── .next/
├── node_modules/
├── public/
│   ├── images/
│   │   ├── background-pattern.png
│   │   └── logo-dream.svg
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx               // Login/Sign-up page
│   │   │   └── signup/
│   │   │       └── page.tsx               // Explicit signup page (if different from login)
│   │   ├── (marketing)/
│   │   │   └── page.tsx                   // Landing page (root route '/')
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx               // User dashboard displaying all dreams
│   │   │   │   ├── layout.tsx             // Dashboard specific layout (e.g., sidebar, header)
│   │   │   │   └── new/
│   │   │   │       └── page.tsx           // Page to record a new dream
│   │   │   │   └── [dreamId]/
│   │   │   │       ├── page.tsx           // Individual dream detail page with AI insight
│   │   │   │       ├── loading.tsx        // Loading state for individual dream
│   │   │   │       └── error.tsx          // Error boundary for individual dream
│   │   │   └── settings/
│   │   │       ├── layout.tsx             // Settings general layout
│   │   │       ├── profile/
│   │   │       │   └── page.tsx           // User profile settings
│   │   │       └── subscription/
│   │   │           └── page.tsx           // Subscription management page
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── callback/
│   │   │   │       └── route.ts           // Supabase OAuth callback handler
│   │   │   ├── dreams/
│   │   │   │   ├── route.ts               // API for creating/fetching dreams
│   │   │   │   └── [dreamId]/
│   │   │   │       └── route.ts           // API for specific dream (get, update, delete)
│   │   │   ├── insights/
│   │   │   │   └── route.ts               // API for requesting AI insights
│   │   │   ├── tags/
│   │   │   │   └── route.ts               // API for fetching/managing tags
│   │   │   └── webhook/
│   │   │       └── stripe/
│   │   │           └── route.ts           // Stripe webhook handler
│   │   ├── layout.tsx                     // Root layout for the application
│   │   ├── globals.css                    // Global styles and Tailwind CSS directives
│   │   └── not-found.tsx                  // Custom 404 page
│   ├── components/
│   │   ├── ui/                            // shadcn/ui components (automatically generated/managed)
│   │   │   ├── button.tsx
│   │   │   ├── form.tsx
│   │   │   └── ... (many more)
│   │   ├── common/
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── auth/
│   │   │   └── AuthForm.tsx               // Reusable authentication form
│   │   ├── dashboard/
│   │   │   ├── DreamCard.tsx              // Component for displaying a dream summary
│   │   │   ├── DreamForm.tsx              // Form for submitting/editing a dream
│   │   │   ├── FilterBar.tsx              // Filtering and search components for dashboard
│   │   │   ├── TagManager.tsx             // Component to manage dream tags
│   │   │   └── AIBadge.tsx                // Displays AI insight count/status
│   │   ├── insights/
│   │   │   └── AIInsightDisplay.tsx       // Component to render AI insights
│   │   ├── subscriptions/
│   │   │   └── SubscribeButton.tsx        // Button to initiate Stripe checkout
│   │   └── typography/
│   │       └── H1.tsx
│   │       └── P.tsx
│   ├── lib/
│   │   ├── auth/
│   │   │   └── supabaseAuth.ts            // Supabase authentication helper functions
│   │   ├── db/
│   │   │   └── supabaseClient.ts          // Supabase client initialization
│   │   │   └── types.ts                   // Supabase generated types
│   │   ├── ai/
│   │   │   ├── geminiClient.ts            // Gemini AI API client initialization
│   │   │   └── aiPrompts.ts               // Templates for Gemini AI prompts
│   │   ├── stripe/
│   │   │   ├── stripeClient.ts            // Stripe API client initialization
│   │   │   └── subscriptionUtils.ts       // Helper functions for subscription management
│   │   ├── hooks/
│   │   │   ├── useAuthSession.ts          // Custom hook for auth session
│   │   │   └── useDreamForm.ts            // Custom hook for dream form logic
│   │   ├── utils.ts                       // General utility functions (e.g., date formatting)
│   │   └── constants.ts                   // Application-wide constants (e.g., pricing, limits)
│   ├── types/
│   │   ├── dream.d.ts                     // TypeScript interfaces for Dream object
│   │   ├── user.d.ts                      // TypeScript interfaces for User object
│   │   ├── ai.d.ts                        // TypeScript interfaces for AI insight response
│   │   └── index.d.ts                     // General application types
│   └── config/
│       ├── site.ts                        // Site metadata and navigation configuration
│       └── dashboard.ts                   // Dashboard specific configurations (filters, sort)
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml                      // Or package-lock.json/yarn.lock
├── .gitignore
└── README.md
```

### Directory and File Explanations:

**Top-Level Directories:**

- `.next/`: (Generated) Build output directory for Next.js.
- `node_modules/`: (Generated) Contains all installed npm/pnpm packages.
- `public/`: Contains static assets served directly by Next.js, such as images, fonts, and the favicon.

  - `images/`: Specific directory for application images, including background patterns and logos.
  - `favicon.ico`: The website's favicon.

- `src/`: Encapsulates all source code for the application, promoting a cleaner root directory.
  - `app/`: The core directory for Next.js App Router, containing pages, layouts, and API routes.
  - `components/`: Reusable UI components across the application.
  - `lib/`: Utility functions, API clients, and helper modules.
  - `types/`: TypeScript type definitions for data structures.
  - `config/`: Application-wide configuration settings.

**`src/app/` (Next.js App Router):**
This directory is structured to leverage Next.js's App Router features, including file-system based routing, nested layouts, and server components/actions. Grouping routes (e.g., `(auth)`, `(marketing)`, `(dashboard)`) allows for independent layouts while maintaining URL structure.

- `(auth)/`: Route group for authentication-related pages, allowing for a separate layout for auth flows.
  - `login/page.tsx`: The primary page for user login.
  - `signup/page.tsx`: An optional explicit sign-up page, distinct from login if the flow warrants it.
- `(marketing)/`: Route group for public-facing marketing pages.
  - `page.tsx`: The main landing page of the application (accessible at `/`), describing "Dreams Saver" and offering the initial dream submission/signup for new users.
- `(dashboard)/`: Route group for authenticated user dashboard pages, allowing a dedicated authenticated layout.
  - `dashboard/`: Contains the main user dashboard and related pages.
    - `page.tsx`: Displays a list of all recorded dreams for the user.
    - `layout.tsx`: Defines the layout specific to the dashboard (e.g., a persistent sidebar for navigation, a header showing user info).
    - `new/page.tsx`: A dedicated page for users to record a new dream.
    - `[dreamId]/page.tsx`: Dynamic route for viewing a specific dream's details, meta information, and the AI insight.
    - `[dreamId]/loading.tsx`: Defines the loading UI that Next.js will display while the individual dream data is being fetched.
    - `[dreamId]/error.tsx`: Defines the error UI that Next.js will display if an error occurs during data fetching for an individual dream.
  - `settings/`: Pages for user settings and account management.
    - `layout.tsx`: Layout for all settings pages, potentially with a settings navigation sidebar.
    - `profile/page.tsx`: Page for managing user profile information and basic account settings.
    - `subscription/page.tsx`: Page for managing the user's subscription (e.g., view current plan, upgrade, access Stripe customer portal).
- `api/`: API routes for server-side logic and data fetching, acting as an abstraction layer for database and external service interactions.
  - `auth/callback/route.ts`: Handles the OAuth callback from Supabase after a user authenticates with an identity provider (e.g., Google).
  - `dreams/route.ts`: API endpoint for fetching all dreams for the authenticated user and for creating new dream entries.
  - `dreams/[dreamId]/route.ts`: API endpoint for retrieving, updating, or deleting a specific dream by its ID.
  - `insights/route.ts`: API endpoint for triggering Gemini AI insights for a given dream. This route will also handle checking the user's AI insight quota.
  - `tags/route.ts`: API endpoint for fetching and managing user-defined dream tags.
  - `webhook/stripe/route.ts`: Endpoint to handle incoming Stripe webhooks (e.g., for processing successful payments, subscription status changes, or refunds).
- `layout.tsx`: The root layout for the entire application, wrapping all pages. It includes global components like the `Navbar` and `Footer`, and sets up global contexts (e.g., authentication context).
- `globals.css`: Contains global CSS styles, including Tailwind CSS directives (`@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`) and any custom global CSS.
- `not-found.tsx`: Custom 404 page for routes that do not exist within the application.

**`src/components/`:**
Houses all reusable React components, organized by their logical grouping or UI purpose.

- `ui/`: Contains components generated or customized from `shadcn/ui`. These are typically wrappers around basic HTML elements or headless UI libraries, providing consistent styling and accessibility.
- `common/`: General components used across multiple sections of the app.
  - `Footer.tsx`: The application's footer, often containing links or copyright information.
  - `Navbar.tsx`: The main navigation bar, including branding, navigation links, and user authentication status.
- `auth/`: Components related to authentication.
  - `AuthForm.tsx`: A versatile form component for handling login and sign-up inputs, reusable across auth pages.
- `dashboard/`: Components specific to the user dashboard.
  - `DreamCard.tsx`: A component to display a summarized view of a dream (e.g., title, date, mood) on the dashboard list.
  - `DreamForm.tsx`: The form component used for submitting new dreams or editing existing ones, including fields for date, title, mood, lucid status, and tags.
  - `FilterBar.tsx`: Contains UI elements for filtering and searching dreams on the dashboard (e.g., by mood, lucid status, tags, or keywords in description).
  - `TagManager.tsx`: Interface for users to view and manage their custom dream tags, perhaps showing usage count.
  - `AIBadge.tsx`: Displays the user's remaining AI insight quota or indicates unlimited access for subscribed users.
- `insights/`: Components for AI insight display.
  - `AIInsightDisplay.tsx`: Component responsible for rendering the AI-generated dream insight, formatting it according to the design aesthetic.
- `subscriptions/`: Components for managing subscriptions.
  - `SubscribeButton.tsx`: Button that initiates the Stripe checkout process for subscribing to premium features.
- `typography/`: Simple wrapper components for consistent typography styling across the application (e.g., `H1.tsx`, `P.tsx`).

**`src/lib/`:**
Contains helper functions, API clients, and business logic that are not directly tied to UI components or specific routes.

- `auth/`: Authentication related helpers.
  - `supabaseAuth.ts`: Functions for handling user sessions, sign-in, sign-out, and protecting routes with Supabase, including server-side and client-side helper functions.
- `db/`: Database interaction logic.
  - `supabaseClient.ts`: Initializes the Supabase client for both client-side and server-side operations, ensuring proper authentication.
  - `types.ts`: Contains generated TypeScript types from your Supabase database schema, ensuring type safety for database interactions.
- `ai/`: Logic for interacting with the Gemini AI.
  - `geminiClient.ts`: Initializes and configures the Gemini API client.
  - `aiPrompts.ts`: Stores the specific prompts, role definitions, and templates used for generating AI insights, ensuring consistent and targeted interpretations.
- `stripe/`: Logic for Stripe integration.
  - `stripeClient.ts`: Initializes the Stripe API client for interacting with Stripe services.
  - `subscriptionUtils.ts`: Helper functions for checking user subscription status, managing customer portals, and other payment-related business logic.
- `hooks/`: Custom React hooks for encapsulating component logic and state management.
  - `useAuthSession.ts`: A hook to easily access and manage the current user's authentication session and profile information.
  - `useDreamForm.ts`: A hook to encapsulate the state and validation logic for the dream submission/editing form.
- `utils.ts`: A collection of general utility functions (e.g., date formatting, input validation, string manipulation, client-side data transformations).
- `constants.ts`: Stores application-wide constants such as pricing tiers, AI insight limits for free and premium users, API routes, and other configurable values.

**`src/types/`:**
Dedicated directory for TypeScript declaration files (`.d.ts` or `.ts`) that define the shape of data used throughout the application, promoting strong typing and reducing runtime errors.

- `dream.d.ts`: Defines the `Dream` interface, including fields like `date`, `title`, `moodUponWaking`, `isLucid`, `tags` (array of strings), and `description`.
- `user.d.ts`: Defines the `User` interface, potentially extending Supabase's user type with custom profile fields (e.g., `insightCreditsRemaining`, `subscriptionStatus`).
- `ai.d.ts`: Defines the structure of the AI insight response from Gemini, including fields for symbolic interpretations and emotional tone analysis.
- `index.d.ts`: General types or interfaces that don't fit into more specific categories but are globally relevant.

**`src/config/`:**
Centralized configuration files for various aspects of the application, making it easier to manage and modify settings.

- `site.ts`: Contains metadata for the website (e.g., title, description for SEO), and main navigation links.
- `dashboard.ts`: Configuration specific to the dashboard, such as available filter options, default sort criteria, or settings for the tag manager.

**Root Level Files:**

- `.env.local`: Environment variables specific to the local development environment (e.g., API keys, database URLs). This file is typically excluded from version control.
- `.env.example`: A template for `.env.local`, listing all required environment variables with placeholder values.
- `next.config.js`: Next.js configuration file, used for customizing build behavior, image optimization, and server settings.
- `tailwind.config.ts`: Tailwind CSS configuration file, where you can customize your design tokens, extend default themes, and add plugins.
- `postcss.config.js`: PostCSS configuration, primarily used by Tailwind CSS for processing CSS.
- `tsconfig.json`: TypeScript configuration file, defining compiler options and project settings for TypeScript.
- `package.json`: Defines project metadata, scripts for development and building, and lists all project dependencies.
- `pnpm-lock.yaml`: (or `package-lock.json`/`yarn.lock`) A lock file generated by the package manager (pnpm, npm, or yarn) to ensure consistent dependency installations across different environments.
- `.gitignore`: Specifies files and directories to be ignored by Git (e.g., `node_modules/`, `.env.local`, `.next/`).
- `README.md`: Project overview, setup instructions, development guidelines, and deployment details.

## Database Schema Design

SCHEMADESIGN

1.  OVERVIEW

    The database schema for \\"Dreams Saver\\" is designed to efficiently store and manage user data, dream recordings, AI-generated insights, and categorization tags. Leveraging Supabase's PostgreSQL backend, the schema emphasizes data integrity, scalability, and robust access control (via Row Level Security) to ensure user privacy and a seamless experience. The structure supports the core functionalities including user authentication, dream submission, AI insight generation, and advanced filtering/searching capabilities.

2.  DATABASE TECHNOLOGY

    The persistence layer is built on PostgreSQL, managed and hosted via Supabase. This choice provides a powerful relational database system with built-in features for user authentication (Supabase Auth), real-time capabilities, and an API layer that simplifies frontend integration.

3.  CORE ENTITIES AND TABLES

    3.1. `users` Table

        Purpose: Stores core user information, subscription status, and tracks AI insight usage for monetization.

        Relationship: One-to-many with `dreams` (a user can have many dreams).



        Columns:

        *   `id` (UUID)

            Constraints: PRIMARY KEY, NOT NULL. References `auth.users.id` (Supabase Auth).

            Description: Unique identifier for the user, linked directly to Supabase's authentication system.

        *   `email` (TEXT)

            Constraints: NOT NULL, UNIQUE.

            Description: User's email address, primarily for identification and communication. Mirrored from Supabase Auth.

        *   `created_at` (TIMESTAMP WITH TIME ZONE)

            Constraints: NOT NULL, DEFAULT `now()`.

            Description: Timestamp of user account creation.

        *   `updated_at` (TIMESTAMP WITH TIME ZONE)

            Constraints: NOT NULL, DEFAULT `now()`.

            Description: Timestamp of the last update to the user's record.

        *   `subscription_status` (TEXT)

            Constraints: NOT NULL, DEFAULT 'free', CHECK IN ('free', 'subscribed', 'cancelled', 'past_due').

            Description: Current subscription status of the user, managed in conjunction with Stripe.

        *   `stripe_customer_id` (TEXT)

            Constraints: UNIQUE.

            Description: Stores the Stripe Customer ID for managing payments and subscriptions.

        *   `ai_insights_used_count` (INTEGER)

            Constraints: NOT NULL, DEFAULT 0.

            Description: Tracks the number of AI insights consumed by free-tier users within their billing cycle.

        *   `ai_insight_limit` (INTEGER)

            Constraints: DEFAULT 5.

            Description: The maximum number of AI insights allowed for the user (e.g., 5 for free, NULL for subscribed users).

    3.2. `dreams` Table

        Purpose: Stores individual dream entries and associated metadata.

        Relationship: Many-to-one with `users` (many dreams belong to one user); One-to-one with `dream_insights`; Many-to-many with `tags` (via `dream_tags`).



        Columns:

        *   `id` (UUID)

            Constraints: PRIMARY KEY, NOT NULL, DEFAULT `gen_random_uuid()`.

            Description: Unique identifier for each dream recording.

        *   `user_id` (UUID)

            Constraints: NOT NULL, FOREIGN KEY REFERENCES `users(id)`.

            Description: Foreign key linking the dream to its owning user.

        *   `title` (VARCHAR(255))

            Description: Optional, short title for the dream entry.

        *   `description` (TEXT)

            Constraints: NOT NULL.

            Description: The main content of the dream recording, where the user describes their dream.

        *   `dream_date` (DATE)

            Constraints: NOT NULL.

            Description: The specific date on which the dream occurred or was recorded.

        *   `mood_upon_waking` (TEXT)

            Constraints: NOT NULL, CHECK IN ('Happy', 'Anxious', 'Calm', 'Neutral', 'Excited').

            Description: User's emotional state immediately upon waking from the dream.

        *   `is_lucid` (BOOLEAN)

            Constraints: NOT NULL, DEFAULT FALSE.

            Description: A flag indicating whether the dream was a lucid dream.

        *   `created_at` (TIMESTAMP WITH TIME ZONE)

            Constraints: NOT NULL, DEFAULT `now()`.

            Description: Timestamp when the dream entry was first recorded.

        *   `updated_at` (TIMESTAMP WITH TIME ZONE)

            Constraints: NOT NULL, DEFAULT `now()`.

            Description: Timestamp of the last update to the dream entry.

    3.3. `dream_insights` Table

        Purpose: Stores AI-generated insights for specific dream entries.

        Relationship: One-to-one with `dreams` (each dream can have at most one insight).



        Columns:

        *   `id` (UUID)

            Constraints: PRIMARY KEY, NOT NULL, DEFAULT `gen_random_uuid()`.

            Description: Unique identifier for each AI insight.

        *   `dream_id` (UUID)

            Constraints: NOT NULL, UNIQUE, FOREIGN KEY REFERENCES `dreams(id)`.

            Description: Foreign key linking the insight to its corresponding dream. The UNIQUE constraint ensures only one insight per dream.

        *   `insight_text` (TEXT)

            Constraints: NOT NULL.

            Description: The detailed insight provided by Gemini AI regarding the dream's symbolism and emotional tone.

        *   `generated_at` (TIMESTAMP WITH TIME ZONE)

            Constraints: NOT NULL, DEFAULT `now()`.

            Description: Timestamp when the AI insight was generated.

        *   `ai_model_version` (VARCHAR(50))

            Constraints: NOT NULL, DEFAULT 'Gemini Pro 1.5'.

            Description: Specifies the version of the AI model used to generate the insight.

    3.4. `tags` Table

        Purpose: Stores unique, descriptive keywords or categories that can be applied to dreams.

        Relationship: Many-to-many with `dreams` (via `dream_tags`).



        Columns:

        *   `id` (UUID)

            Constraints: PRIMARY KEY, NOT NULL, DEFAULT `gen_random_uuid()`.

            Description: Unique identifier for each tag.

        *   `name` (VARCHAR(100))

            Constraints: NOT NULL, UNIQUE.

            Description: The descriptive name of the tag (e.g., \\"flying\\", \\"school\\", \\"anxiety\\").

    3.5. `dream_tags` Table (Junction Table)

        Purpose: Establishes a many-to-many relationship between dreams and tags, allowing a dream to have multiple tags and a tag to be associated with multiple dreams.

        Relationship: Many-to-one with `dreams`; Many-to-one with `tags`.



        Columns:

        *   `dream_id` (UUID)

            Constraints: NOT NULL, FOREIGN KEY REFERENCES `dreams(id)`.

            Description: Foreign key linking to a dream entry.

        *   `tag_id` (UUID)

            Constraints: NOT NULL, FOREIGN KEY REFERENCES `tags(id)`.

            Description: Foreign key linking to a specific tag.

        *   (PRIMARY KEY (`dream_id`, `tag_id`))

            Description: Composite primary key ensuring each dream-tag association is unique.

        *   `created_at` (TIMESTAMP WITH TIME ZONE)

            Constraints: NOT NULL, DEFAULT `now()`.

            Description: Timestamp when the tag was associated with the dream.

4.  RELATIONSHIPS DIAGRAM (CONCEPTUAL)

    The schema is structured around a central `users` table, which is the root for all user-specific data. Each user can have multiple `dreams`. For each `dream`, there can be a single `dream_insight` generated by the AI. Dreams are further categorized using `tags` through a `dream_tags` junction table, enabling flexible organization and advanced filtering.

    `users` (1) ---- (M) `dreams`

    `dreams` (1) ---- (1) `dream_insights`

    `dreams` (M) ---- (M) `tags` (via `dream_tags` junction table)

5.  ACCESS CONTROL AND SECURITY (ROW LEVEL SECURITY - RLS)

    Row Level Security (RLS) will be implemented on all sensitive tables to ensure that users can only access and modify their own data. Supabase's RLS policies will be configured as follows:

    - `users`: Policies will restrict access and modification to the row where `id` matches `auth.uid()`, meaning users can only view/update their own profile.

    - `dreams`: Policies will ensure that `user_id` matches `auth.uid()`, allowing users to only view, create, update, or delete their own dream entries.

    - `dream_insights`: Policies will only allow read access if the associated `dream_id` belongs to the authenticated user (`EXISTS (SELECT 1 FROM dreams WHERE id = dream_id AND user_id = auth.uid())`). Write access will be managed by application logic based on AI insight limits.

    - `tags`: Read access will be global to allow users to select from existing tags. Write access (for creating new tags) will be controlled by application logic, allowing users to create new unique tags that become available for association.

    - `dream_tags`: Policies will ensure that the associated `dream_id` belongs to the authenticated user, allowing users to manage tags for their own dreams.

6.  DATA INTEGRITY AND CONSTRAINTS

    - **Primary Keys**: All tables utilize UUIDs as primary keys to ensure global uniqueness and prevent sequential ID exposure.

    - **Foreign Keys**: Relationships between tables are enforced using foreign key constraints, ensuring referential integrity (e.g., a dream cannot exist without an associated user).

    - **NOT NULL Constraints**: Critical fields are marked as `NOT NULL` to ensure essential data is always present.

    - **UNIQUE Constraints**: Applied to fields like `users.email`, `dream_insights.dream_id`, and `tags.name` to prevent duplicate entries where uniqueness is required.

    - **CHECK Constraints**: Used for fields like `mood_upon_waking` to enforce a predefined set of valid values.

7.  SCALABILITY CONSIDERATIONS

    - **UUIDs**: Using UUIDs for primary keys helps distribute writes across database pages, reducing hot spots compared to sequential integer IDs, which is beneficial for large-scale applications.

    - **Indexing**: Foreign keys are automatically indexed by PostgreSQL, and additional indexes will be added on frequently queried columns (e.g., `dreams.user_id`, `dream_tags.dream_id`, `dream_tags.tag_id`) to optimize query performance, especially for filtering and search operations on the dashboard.

    - **Vertical Scaling**: PostgreSQL on Supabase can be vertically scaled by upgrading database resources as the user base grows.

    - **Separation of Concerns**: The clear separation into `users`, `dreams`, `dream_insights`, and `tags` tables ensures that each component can scale independently if needed, and data access patterns remain predictable.

    - **AI Insight Management**: The `ai_insights_used_count` and `ai_insight_limit` fields on the `users` table provide a straightforward mechanism for managing tiered access, which scales linearly with the number of users without requiring complex external services.

## User Flow

USERFLOW

I. Introduction to User Flows
The "Dreams Saver" application is designed to offer a serene and intuitive platform for users to record their dreams and gain unique insights powered by Gemini AI. The user flows outlined below detail the core journeys a user will take, from their first interaction to managing their dreams and subscription, all while maintaining a calming and reflective user experience. Emphasis is placed on seamless navigation, clear interaction patterns, and elegant visual feedback.

II. User Flows

A. User Flow 1: New User - First Dream Submission & Account Creation
Goal: For a new user to submit their first dream and create an account seamlessly.
Pre-conditions: User is not logged in; first visit to the application.

1.  Access Landing Page (URL: `/`)
    - Description: The user lands on a visually calming and dream-like landing page. The primary focus is on introducing "Dreams Saver" and inviting immediate dream submission.
    - Wireframe Description:
      - Header: Subtle "Dreams Saver" logo/text on the top left.
      - Hero Section: A compelling tagline and brief description of the product's value proposition (e.g., "Unlock the Secrets of Your Dreams"). Minimalistic, abstract watercolor textures in the background.
      - Primary Call to Action (CTA) / Dream Submission Area: A prominent, inviting text area with the placeholder "Describe your dream here..." This is the core entry point for new users.
      - "Submit Dream & Sign Up" Button: A softly styled button directly below the dream submission text area, clearly indicating the dual action.
      - "Already have an account? Log In" link: A small, unobtrusive link for returning users.
    - Interaction: User types their dream into the multi-line text area. Upon completion, they click the "Submit Dream & Sign Up" button.
2.  Authentication (Supabase OAuth)
    - Description: After clicking "Submit Dream & Sign Up", the user is redirected to a secure Supabase OAuth flow to create their account or log in if an existing account is detected (e.g., via Google, Apple, or email/password). This ensures secure and efficient account creation.
    - Interaction: The user completes the authentication process via their chosen provider.
3.  Post-Submission & Dashboard Redirect (URL: `/dashboard`)
    _ Description: Once authentication is successful and the first dream is submitted, the user is automatically redirected to their personalized dashboard. A gentle animation or confirmation message (e.g., "Dream saved!") may briefly appear before the redirect.
    _ Interaction: Automatic redirection.
    Success Criteria: User's first dream is saved, an account is created, and they land on their dashboard.

B. User Flow 2: Returning User - Logging In & Adding a New Dream
Goal: For an existing user to log in, view their previous dreams, and record a new dream.
Pre-conditions: User has an existing "Dreams Saver" account with or without previous dreams.

1.  Access Landing Page / Login (URL: `/` or `/login`)
    - Description: The user visits the application. If not already logged in, they are presented with the landing page.
    - Interaction: The user clicks the "Log In" link on the landing page, which initiates the Supabase OAuth redirection.
2.  Authentication (Supabase OAuth)
    - Description: The user completes the login process via their preferred authentication method.
    - Interaction: User inputs credentials or selects an OAuth provider to log in.
3.  Access Dashboard (URL: `/dashboard`)
    - Description: After successful login, the user is directed to their personal dashboard, which serves as the central hub for all their recorded dreams.
    - Wireframe Description:
      - Header: "Dreams Saver" logo, user avatar/name (clickable for settings), a prominent "Add New Dream" button. If the user is on the free tier, an "Upgrade" button and a count of remaining AI insights (e.g., "3/5 AI Insights Used") would be visible.
      - Dream List Area: A scrollable, chronologically ordered list of dream entries. Each entry is a clickable card/row displaying:
        - Prominent Date of the dream.
        - Optional Dream Title.
        - Icon/text representing "Mood upon Waking".
        - Checkbox indicating "Was this a Lucid Dream?".
        - A short preview of the dream's content (first few lines).
        - A small indicator for AI Insight status (e.g., a "Sparkle" icon if available, "Insight Used" if consumed, or "Upgrade for Insight" if premium is required).
      - Filter/Search Bar (Future Feature): A placeholder for advanced filtering by Mood, Lucid status, Tags, and a search bar for dream content keywords.
    - Interaction: User reviews their existing dreams.
4.  Initiate New Dream Recording
    - Description: User decides to record a new dream.
    - Interaction: The user clicks the "Add New Dream" button in the header.
5.  New Dream Recording Page (URL: `/record-dream`)
    - Description: A dedicated, clean, and spacious page for inputting all details of a new dream. The design encourages thorough, mindful recording.
    - Wireframe Description:
      - "Back to Dashboard" button/link.
      - Input Fields (with clear labels and ample whitespace):
        - Date Picker: Defaults to the current date, allowing easy adjustment.
        - "Dream Title" (Text Input): Optional short title for easy identification.
        - "Dream Description" (Large Text Area): The primary area for free-form dream recounting. Placeholder text like "What did you dream? Describe it in detail."
        - "Mood upon Waking" (Selection): Simple, intuitive selection (e.g., radio buttons or a dropdown with options like 'Happy', 'Anxious', 'Calm', 'Neutral', 'Excited').
        - "Was this a Lucid Dream?" (Checkbox).
        - "Tags/Keywords" (Free-form Text Input): User can type relevant keywords (e.g., 'flying', 'school', 'ex-partner'), with suggestions or an "add tag" functionality.
      - "Submit Dream" Button: Clearly visible at the bottom of the form.
    - Interaction: User fills in all relevant details for their dream, then clicks the "Submit Dream" button.
6.  Dream Processing & Dashboard Redirect
    _ Description: The entered dream data is securely saved to Supabase. A gentle confirmation animation (e.g., a subtle glow on the "Submit Dream" button or a quick toast notification) appears before redirection.
    _ Interaction: Automatic redirection to the Dashboard. The newly recorded dream appears at the top of the dream list.
    Success Criteria: User logged in, new dream successfully recorded and displayed on the dashboard.

C. User Flow 3: Viewing Dream Details & AI Insights
Goal: For a user to review a specific dream entry, its metadata, and access its AI-generated insight.
Pre-conditions: User is logged in and has recorded at least one dream.

1.  Access Dashboard (URL: `/dashboard`)
    - Interaction: User navigates to the dashboard (e.g., after logging in or by clicking the app logo).
2.  Select Dream from List
    - Description: The user browses their list of dreams on the dashboard.
    - Interaction: The user clicks on a specific dream entry's card/row to view its full details.
3.  Access Dream Detail Page (URL: `/dream/[dreamId]`)
    - Description: A dedicated page displays the complete dream entry, its metadata, and the AI insight section. The layout is clean and spacious, conducive to reflection.
    - Wireframe Description:
      - "Back to Dashboard" Button/Link.
      - Prominent Dream Title.
      - Metadata Display: Date, Mood upon Waking (with icon/text), Lucid Dream status, and a list of associated Tags/Keywords.
      - Full Dream Description: The complete, read-only text of the dream as recorded by the user.
      - AI Insight Section:
        - Heading: "Gemini AI Insight."
        - If AI Insight is available (and within free tier limit or user is premium): The AI-generated analysis is displayed in a dedicated text area. A subtle disclaimer below states: "Insights are suggestive, not definitive. Consider what resonates with you personally."
        - If AI Insight has been consumed (free tier) or not yet generated (premium):
          - "Generate AI Insight" Button: If the user has free insights remaining or is a premium subscriber. Clicking this triggers the AI generation process.
          - Remaining Insights Counter (Free Tier): "You have X out of 5 free AI insights remaining."
          - Call to Action (Free Tier): If free insights are exhausted, a clear "Unlock Unlimited AI Insights" button replaces the "Generate" button, encouraging subscription.
        - Loading State: During AI generation, a calming animation (e.g., subtle pulsing light) and text "Generating Insight..." is displayed.
    - Interaction: User reviews their dream details. They may click "Generate AI Insight" if available, or "Unlock Unlimited AI Insights" if they wish to upgrade.
4.  AI Insight Generation (Conditional)
    _ Description: If the "Generate AI Insight" button is clicked and conditions are met (free insight available or premium subscription active), a call to Gemini AI is initiated.
    _ Interaction: Upon successful generation, the AI insight text populates the designated area. If an error occurs, a gentle, non-disruptive error message is displayed (e.g., "Failed to generate insight. Please try again.").
    Success Criteria: User successfully views a dream's full details and either accesses or generates its AI insight.

D. User Flow 4: Subscribing to Premium Tier
Goal: For a free-tier user to upgrade their subscription to unlimited AI insights.
Pre-conditions: User is logged in, on the free tier, and has exhausted or is about to exhaust their free AI insights.

1.  Initiate Upgrade
    - Description: The user can initiate the upgrade process from two primary locations: the Dashboard ("Upgrade" button in the header or insight counter) or the Dream Detail Page ("Unlock Unlimited AI Insights" button).
    - Interaction: User clicks on one of the upgrade Call to Actions.
2.  Subscription Page / Checkout (URL: `/subscribe`)
    - Description: A clean, concise page outlining the benefits of the premium subscription and prompting payment.
    - Wireframe Description:
      - Header: "Unlock Unlimited Insights."
      - Benefits Section: Clearly lists the advantages of the premium tier (e.g., "Unlimited AI Insights", "Priority Customer Support" - future feature).
      - Pricing Information: "$8/month" prominently displayed.
      - "Subscribe Now" Button: A primary CTA that initiates the Stripe checkout process.
      - "Back to Dashboard" Link.
    - Interaction: User reviews the subscription details, then clicks "Subscribe Now."
3.  Stripe Checkout Integration
    - Description: The user is presented with a secure, embedded Stripe checkout interface for entering payment details. This integration is designed for a smooth and trustworthy payment experience.
    - Interaction: User provides payment information (credit card, etc.) and confirms the subscription.
4.  Subscription Confirmation & Dashboard Redirect
    _ Description: Upon successful payment, the user receives a confirmation of their subscription and is automatically redirected back to their dashboard.
    _ Interaction: Automatic redirection. The dashboard now reflects the user's "Premium" status, and AI insights are available without limitation.
    Success Criteria: User successfully subscribes to the premium tier, and unlimited AI insights are unlocked.

E. User Flow 5: Managing Account & Subscription
Goal: For a user to access and manage their account settings and subscription details.
Pre-conditions: User is logged in.

1.  Access Account Settings
    - Description: From the dashboard, the user can easily access their account settings.
    - Interaction: The user clicks on their user avatar or name in the dashboard header. This reveals a dropdown menu with "Settings" and "Log Out" options. User clicks "Settings."
2.  Account Settings Page (URL: `/settings`)
    _ Description: A clean and organized page providing options for managing user profile, subscription, and data.
    _ Wireframe Description:
    _ Navigation: Clear sections or tabs for "Profile," "Subscription," and "Data."
    _ Profile Section: Options to update user information (name, email - managed via Supabase), change password (via Supabase authentication flow).
    _ Subscription Section:
    _ Displays current plan ("Free Tier" or "Premium").
    _ "Manage Subscription on Stripe" Button: This button securely redirects the user to the Stripe Customer Portal, where they can update payment methods, view invoices, or cancel their subscription directly with Stripe.
    _ Data Section:
    _ "Export My Data" Button: Allows users to download a copy of all their dream entries and associated metadata.
    _ "Delete Account" Button: Initiates a process for permanent account deletion (with a clear confirmation step). \* Interaction: User navigates between sections, performs desired actions (e.g., clicking "Manage Subscription on Stripe," initiating data export, or account deletion).
    Success Criteria: User successfully accesses and manages their account settings or subscription.

III. Common Interaction Patterns & Design Considerations
To ensure a calming, intuitive, and seamless user experience, the following interaction patterns and design considerations will be consistently applied throughout the "Dreams Saver" application:

- Navigation: Intuitive and consistent navigation elements (e.g., persistent header, clear back buttons). Soft fade transitions between pages to avoid any jarring movements, maintaining the serene atmosphere.
- Loading States: For operations like AI insight generation or page loading, gentle and subtle animations will be used (e.g., a soft glow, text smoothly appearing, or subtle cloud patterns) paired with clear textual indicators (e.g., "Generating Insight...", "Loading Dreams..."). This prevents perceived delays and enhances the dreamy aesthetic.
- Empty States: When a user's dashboard or a specific list is empty (e.g., no dreams recorded yet), friendly, guiding messages will be displayed (e.g., "You haven't recorded any dreams yet. Start by adding your first dream!"). These will be presented with inviting visuals.
- Error Handling: Errors will be communicated clearly but gently, avoiding harsh alerts. Non-disruptive toast notifications or inline messages will be used (e.g., "Failed to save dream. Please check your connection and try again.").
- Feedback: Positive actions (e.g., dream submitted, subscription successful) will be confirmed with subtle visual cues (e.g., a brief, gentle animation on a button, a non-intrusive success message appearing smoothly).
- Accessibility: High priority will be given to accessibility, including sufficient color contrast for all text and interactive elements (muted pastel blues, lavenders, soft grays, with subtle accents of peach or very light gold), clear typography (Lato or Montserrat for body text, Lora or Playfair Display for headings), proper keyboard navigation, and ARIA labels.
- Mobile Responsiveness: The entire application will be designed with a mobile-first approach, ensuring that all layouts, input fields, and interaction patterns are fully optimized and highly usable on smaller screens, allowing users to record dreams comfortably from anywhere.

## Styling Guidelines

STYLING GUIDELINES: Dreams Saver

1.  OVERVIEW AND DESIGN VISION
    The "Dreams Saver" application is envisioned with a very clean, soft aesthetic, aiming to create a calming and spacious user experience akin to a serene journaling process. The overall design should evoke feelings of tranquility, introspection, and quiet reflection, encouraging users to easily capture and explore their dreams without feeling rushed or overwhelmed. This approach is inspired by successful mindfulness applications like Calm or Headspace, which excel at creating peaceful user environments.

2.  COLOR PALETTE
    The color palette is primarily composed of muted pastels, drawing inspiration from the peaceful hues of dawn or twilight. These colors are chosen to create a soothing, non-distracting environment conducive to introspection.

    - **Primary Palette (Backgrounds & Large Surfaces):**

      - **Serene Blue:** A very light, muted sky blue. Represents calm, clarity, and the vastness of the mind.
      - **Dreamy Lavender:** A soft, desaturated lavender. Evokes mystique, peacefulness, and introspection.
      - **Soft Cloud Gray:** A very light, almost off-white gray. Provides a neutral, clean base for content, enhancing readability and spaciousness.

    - **Accent Palette (Interactive Elements & Subtle Highlights):**

      - **Dawn Peach:** A gentle, muted peach tone. Used for subtle accents, calls to action, or elements requiring a touch of warmth and vibrancy, without being overly bright.
      - **Whisper Gold:** A very light, subtle gold. For delicate highlights, premium feature indicators, or decorative elements that add a hint of sophistication.

    - **Text & Iconography:**
      - **Deep Charcoal:** A dark, soft gray (not harsh black) for primary body text and icons, ensuring high legibility against light backgrounds.
      - **Muted Navy:** A slightly desaturated dark blue for headings and important elements, offering a deeper contrast while maintaining the soft aesthetic.

3.  TYPOGRAPHY
    Typography is selected for optimal legibility, especially for early morning use, while also adding a touch of elegance appropriate for the dream-tracking theme.

    - **Body Text & Input Fields:**

      - **Font Family:** Lato or Montserrat (Sans-serif)
      - **Purpose:** Highly legible for all detailed dream entries, descriptions, and general UI text. Ensures ease of reading when users are potentially groggy.
      - **Weights:** Primarily Regular (400), with Semibold (600) for emphasis.
      - **Sizes:** Standard body text at 16px (1rem), with smaller sizes for captions or metadata (e.g., 14px, 0.875rem).

    - **Headings & Dream Titles:**
      - **Font Family:** Lora or Playfair Display (Thin Serif)
      - **Purpose:** Adds a touch of sophistication and elegance to main headings (H1, H2), dream titles, and significant callouts. Balances the modern sans-serif body text.
      - **Weights:** Primarily Regular (400) or Medium (500) to maintain a thin, elegant appearance.
      - **Sizes:**
        - H1 (Page Titles, e.g., "Dashboard"): 32px - 48px, depending on context.
        - H2 (Section Headings, e.g., "Your Dreams"): 24px - 32px.
        - Dream Titles: 20px - 24px.

4.  IMAGERY & ICONOGRAPHY
    Visual elements will be minimalistic, abstract, and supportive of the tranquil atmosphere.

    - **Imagery:**

      - **Style:** Subtle, abstract watercolor textures or very light, almost imperceptible cloud patterns. These elements should hint at the ethereal and dreamlike, without being distracting or realistic.
      - **Placement:** Primarily in backgrounds, hero sections of the landing page, or as soft dividers.
      - **Content:** Avoid busy or photographic imagery. Focus on gradient shifts, blurred forms, and gentle luminosity.

    - **Iconography:**
      - **Style:** Simple, clean, line-based, and monochromatic.
      - **Color:** Use colors from the Deep Charcoal or Muted Navy palette, or the accent colors (Dawn Peach, Whisper Gold) for interactive or highlighted icons.
      - **Purpose:** To guide users, provide visual cues, and indicate actions without adding visual clutter. Consistent stroke weight and rounded corners are preferred.

5.  UI/UX PRINCIPLES
    The user interface and experience are designed to be intuitive, seamless, and emotionally supportive.

    - **Layout & Spacing:**

      - **Ample Whitespace:** Generous use of whitespace around elements, sections, and text blocks to prevent visual clutter and create a spacious, breathable feel. This is crucial for a "serene journaling experience."
      - **Clear Hierarchy:** Visual hierarchy established through font sizing, weighting, color, and spacing to guide the user's eye naturally to important information.
      - **Grid System:** Utilize a consistent grid system for alignment and arrangement of elements, ensuring order and professionalism.

    - **Navigation & Transitions:**

      - **Intuitive Navigation:** Clear, easily identifiable navigation paths. Primary navigation should be visible and accessible.
      - **Seamless Transitions:** Utilize soft fade transitions or subtle slides between pages and major content shifts. Avoid any jarring or abrupt movements. The goal is a smooth, continuous flow that doesn't disrupt the user's state of mind.
      - **Focus States:** Clear and subtle visual feedback for interactive elements (buttons, links, input fields) on hover, focus, and active states.

    - **Feedback & Animations:**

      - **Gentle Confirmation:** Actions like submitting a dream or saving changes should be confirmed with gentle, non-disruptive animations. Examples include a subtle glow on a submitted button, text smoothly appearing (e.g., "Dream Saved!"), or a brief, soft success checkmark animation.
      - **Purposeful Animations:** Animations should always serve a purpose (e.g., guiding attention, indicating progress, providing feedback) and never be purely decorative or distracting. They should feel organic and part of the calm flow.

    - **User Interaction Flow:**

      - **Landing Page:** Welcoming, with an immediate, clear call to action (submit first dream). The input box should feel inviting and simple.
      - **Dashboard:** Designed for clear display of dream recordings. Filtering and search functionalities should be prominent yet integrated seamlessly, avoiding visual noise.
      - **Dream Detail Page:** Content-focused, presenting the dream text, metadata, and AI insights in a structured, easily digestible format. AI insights should be clearly delineated but blend visually with the overall aesthetic.

    - **Emotional Resonance:**
      - The entire app should feel calming, encouraging introspection and quiet reflection. The design should foster a sense of safety and privacy for personal dream content.

6.  TECHNICAL IMPLEMENTATION NOTES (STYLING)
    - **Framework:** Leveraging Tailwind CSS and shadcn/ui components for robust and consistent styling. This will enable rapid development while adhering to the defined design system.
    - **Responsiveness:** All design elements and layouts must be fully responsive, ensuring an optimal experience across various devices (desktop, tablet, mobile). Breakpoints should be carefully considered to maintain visual integrity and usability.
    - **Accessibility:** Adherence to WCAG guidelines is crucial. This includes sufficient color contrast, proper semantic HTML, keyboard navigation support, and ARIA attributes to ensure the app is usable by individuals with disabilities.
