# IIS Academy — Supabase Setup, Access Control & Analytics Integration

> Complete guide for configuring Supabase authentication, paid membership access control, and Supabase Analytics for IIS Academy's Junior Wing (Classes 8–10).

---

## Table of Contents

1. [Supabase Project Setup](#1-supabase-project-setup)
2. [Authentication Configuration](#2-authentication-configuration)
3. [Database Schema](#3-database-schema)
4. [Paid Membership & Access Control](#4-paid-membership--access-control)
5. [Row Level Security (RLS)](#5-row-level-security-rls)
6. [Analytics Integration](#6-analytics-integration)
7. [Environment Variables](#7-environment-variables)
8. [Junior Wing Content Access Matrix](#8-junior-wing-content-access-matrix)

---

## 1. Supabase Project Setup

### 1.1 Create a New Project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **New Project**.
3. Choose your organization, set project name to `iisacademy-prod` (or `iisacademy-dev` for development).
4. Select a region close to your primary user base (e.g., `ap-south-1` for India).
5. Set a strong database password — store it securely.

### 1.2 Install Supabase Client

```bash
pnpm add @supabase/supabase-js
pnpm add @supabase/auth-helpers-nextjs  # for Next.js apps
```

### 1.3 Initialize the Client

Create `packages/auth/src/supabaseClient.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## 2. Authentication Configuration

### 2.1 Enable Auth Providers in Supabase Dashboard

1. Go to **Authentication → Providers** in your Supabase dashboard.
2. Enable the following:
   - **Email/Password** — for direct sign-up
   - **Google OAuth** — for single sign-on
   - **Microsoft OAuth** — for school/enterprise accounts

### 2.2 Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com).
2. Create a new OAuth 2.0 credential.
3. Add Authorized Redirect URI: `https://<your-supabase-project>.supabase.co/auth/v1/callback`
4. Copy Client ID and Client Secret into Supabase → Authentication → Providers → Google.

### 2.3 Update Auth Callback Route

In your Next.js app (`apps/student-dashboard`), create `app/auth/callback/route.ts`:

```typescript
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestUrl.origin + "/dashboard");
}
```

### 2.4 Trigger: Auto-create Profile on Sign-Up

In Supabase SQL Editor, run:

```sql
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  name TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin', 'school_admin')),
  board TEXT CHECK (board IN ('cbse', 'icse', 'karnataka', 'tamil-nadu', 'kerala', 'andhra-pradesh')),
  wing TEXT DEFAULT 'junior' CHECK (wing IN ('junior', 'senior', 'university')),
  school_id UUID,
  membership_tier TEXT DEFAULT 'free' CHECK (membership_tier IN ('free', 'basic', 'premium', 'school')),
  membership_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on auth user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## 3. Database Schema

### 3.1 Run Migration 0.0.2

See `scripts/migration/src/migrate.ts` for the full SQL. Key tables created:

| Table | Purpose |
|-------|---------|
| `profiles` | Extended user info: role, board, wing, membership |
| `module_access_events` | Tracks which modules users access (analytics) |
| `quiz_results` | Stores quiz scores, board, class, enhancement tag |

### 3.2 Full Schema Reference

```sql
-- Run in Supabase SQL Editor

CREATE TYPE membership_tier AS ENUM ('free', 'basic', 'premium', 'school');
CREATE TYPE board_code AS ENUM (
  'cbse', 'icse', 'karnataka', 'tamil-nadu', 'kerala', 'andhra-pradesh'
);

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS membership_tier membership_tier DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS membership_expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS board board_code,
  ADD COLUMN IF NOT EXISTS wing TEXT CHECK (wing IN ('junior', 'senior', 'university'));

CREATE TABLE IF NOT EXISTS public.module_access_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  board board_code,
  wing TEXT CHECK (wing IN ('junior', 'senior', 'university')),
  class_level SMALLINT,
  enhancement_tag TEXT,
  accessed_at TIMESTAMPTZ DEFAULT NOW(),
  duration_seconds INTEGER DEFAULT 0,
  membership_tier membership_tier
);

CREATE TABLE IF NOT EXISTS public.quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id TEXT NOT NULL,
  board board_code,
  class_level SMALLINT,
  wing TEXT,
  enhancement_tag TEXT,
  score NUMERIC(5,2) NOT NULL,
  total_questions SMALLINT NOT NULL,
  correct_answers SMALLINT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  next_difficulty TEXT CHECK (next_difficulty IN ('easy', 'medium', 'hard'))
);
```

---

## 4. Paid Membership & Access Control

### 4.1 Membership Tiers

| Tier | Price | Wings | Boards | Enhancements | Adaptive Quizzes | Analytics |
|------|-------|-------|--------|--------------|------------------|-----------|
| **Free** | ₹0 | Junior | CBSE only | ✗ | ✗ | ✗ |
| **Basic** | ₹299/month | Junior | All 6 boards | ✓ | Basic only | ✗ |
| **Premium** | ₹799/month | All | All 6 boards | ✓ | Adaptive | ✓ |
| **School** | Custom | All | All 6 boards | ✓ | Adaptive | ✓ (school admin) |

### 4.2 Enforcing Access Control in Code

Use functions from `packages/auth/src/accessControl.ts`:

```typescript
import {
  canAccessWing,
  canAccessBoard,
  canAccessEnhancements,
  canAccessAdaptiveQuiz,
} from "auth";

// In a Next.js server component or API route:
const user = await getCurrentUser(); // from Supabase session

if (!canAccessWing(user, "junior")) {
  return redirect("/upgrade");
}

if (!canAccessBoard(user, "karnataka")) {
  return { error: "Upgrade to Basic or Premium for Karnataka board access" };
}

if (!canAccessEnhancements(user)) {
  return { locked: true, requiredTier: "basic" };
}
```

### 4.3 Payment Integration

For membership upgrades, integrate with **Razorpay** (India-primary) or **Stripe**:

1. On successful payment, call Supabase to update membership:

```typescript
import { supabase } from "auth/supabaseClient";

async function upgradeMembership(
  userId: string,
  tier: "basic" | "premium",
  durationMonths: number
) {
  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + durationMonths);

  const { error } = await supabase
    .from("profiles")
    .update({
      membership_tier: tier,
      membership_expires_at: expiresAt.toISOString(),
    })
    .eq("id", userId);

  if (error) throw error;
}
```

2. Use Supabase Edge Functions as webhook handler for payment confirmations:

```typescript
// supabase/functions/payment-webhook/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const payload = await req.json();
  // Verify Razorpay webhook signature
  // Call upgradeMembership(userId, tier, months)
  return new Response("OK");
});
```

---

## 5. Row Level Security (RLS)

All tables use Supabase RLS to ensure data isolation:

```sql
-- Profiles: users can only read/update their own profile
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'school_admin')
    )
  );

-- Module access events: users own their events, admins see all
ALTER TABLE public.module_access_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own access events"
  ON public.module_access_events FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own access events"
  ON public.module_access_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all access events"
  ON public.module_access_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'school_admin')
    )
  );

-- Quiz results
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own results"
  ON public.quiz_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own results"
  ON public.quiz_results FOR SELECT
  USING (auth.uid() = user_id);
```

---

## 6. Analytics Integration

### 6.1 Tracking Module Access

Call this function whenever a student opens a lesson or enhancement:

```typescript
import { supabase } from "auth/supabaseClient";

export async function trackModuleAccess(params: {
  moduleId: string;
  board: string;
  wing: string;
  classLevel: number;
  enhancementTag?: string;
  durationSeconds?: number;
}) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("membership_tier")
    .eq("id", user.id)
    .single();

  await supabase.from("module_access_events").insert({
    user_id: user.id,
    module_id: params.moduleId,
    board: params.board,
    wing: params.wing,
    class_level: params.classLevel,
    enhancement_tag: params.enhancementTag,
    duration_seconds: params.durationSeconds ?? 0,
    membership_tier: profile?.membership_tier ?? "free",
  });
}
```

### 6.2 Tracking Quiz Completion

```typescript
export async function trackQuizResult(params: {
  quizId: string;
  board: string;
  classLevel: number;
  enhancementTag?: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  nextDifficulty: "easy" | "medium" | "hard";
}) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("quiz_results").insert({
    user_id: user.id,
    quiz_id: params.quizId,
    board: params.board,
    class_level: params.classLevel,
    wing: "junior",
    enhancement_tag: params.enhancementTag,
    score: params.score,
    total_questions: params.totalQuestions,
    correct_answers: params.correctAnswers,
    next_difficulty: params.nextDifficulty,
  });
}
```

### 6.3 Supabase Analytics Queries

Run these in Supabase SQL Editor or via `supabase.rpc()`:

```sql
-- Top 10 most accessed enhancement modules (admin only)
SELECT module_id, enhancement_tag, COUNT(*) as access_count
FROM public.module_access_events
WHERE wing = 'junior'
GROUP BY module_id, enhancement_tag
ORDER BY access_count DESC
LIMIT 10;

-- Average quiz score by board and class (junior wing)
SELECT board, class_level, AVG(score) as avg_score, COUNT(*) as attempts
FROM public.quiz_results
WHERE wing = 'junior'
GROUP BY board, class_level
ORDER BY board, class_level;

-- Conversion funnel: free → paid upgrades
SELECT
  DATE_TRUNC('month', membership_expires_at) as month,
  membership_tier,
  COUNT(*) as users
FROM public.profiles
WHERE membership_tier != 'free'
GROUP BY month, membership_tier
ORDER BY month DESC;
```

### 6.4 Supabase Realtime for Live Dashboards

```typescript
// In admin dashboard component
const channel = supabase
  .channel("quiz_results_live")
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "quiz_results" },
    (payload) => {
      console.log("New quiz result:", payload.new);
      // Update live analytics dashboard
    }
  )
  .subscribe();
```

---

## 7. Environment Variables

Create `.env.local` in each app (copy from `.env.example`):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# App
NEXT_PUBLIC_APP_URL=https://iisacademy.com
NEXTAUTH_SECRET=your-nextauth-secret-min-32-chars

# Payment (Razorpay)
RAZORPAY_KEY_ID=rzp_live_xxxx
RAZORPAY_KEY_SECRET=xxxx  # Server-side only, never expose to client

# Optional: Analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxx  # PostHog for product analytics
```

> **Security:** Never commit `.env.local` to git. The `.gitignore` already excludes `.env*.local`.

---

## 8. Junior Wing Content Access Matrix

| Content Type | Path | Free | Basic | Premium | School |
|---|---|:---:|:---:|:---:|:---:|
| Syllabus (CBSE) | `data/syllabi/cbse/class{8,9,10}/` | ✓ | ✓ | ✓ | ✓ |
| Syllabus (ICSE) | `data/syllabi/icse/class{8,9,10}/` | ✗ | ✓ | ✓ | ✓ |
| Syllabus (State boards) | `data/syllabi/{karnataka,tn,kl,ap}/` | ✗ | ✓ | ✓ | ✓ |
| Basic Quizzes (CBSE) | `data/quizzes/cbse/class{8,9,10}/` | ✓ | ✓ | ✓ | ✓ |
| Adaptive Quizzes (all boards) | `data/quizzes/*/` | ✗ | Basic | Adaptive | Adaptive |
| Enhancement Lessons | `data/enhancements/junior/` | ✗ | ✓ | ✓ | ✓ |
| Skill Analytics | via Supabase | ✗ | ✗ | ✓ | ✓ |
| School Analytics Dashboard | via admin panel | ✗ | ✗ | ✗ | ✓ |

---

## Support

- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)
- IIS Academy Engineering: engineering@iisacademy.com
- Supabase Discord: [discord.supabase.com](https://discord.supabase.com)
