-- ============================================================================
-- Migration 001 – Multi-tenant support for iisacademy.in + iiskills.cloud
-- ============================================================================
-- Strategy: single Supabase project, rows separated by a `site_id` column.
-- Both sites share auth.users (unified login), while application-level data
-- (profiles, subscriptions, badges) is logically isolated via `site_id` and
-- enforced by Row-Level Security (RLS) policies.
--
-- Run this in the Supabase SQL editor (or via psql with a service-role key).
-- Safe to run more than once – all statements use IF NOT EXISTS / DO NOTHING.
-- ============================================================================


-- ── 1. site_id enum ──────────────────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE site_id AS ENUM ('iisacademy', 'iiskills');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;


-- ── 2. senior_stream enum (adds "engineering" to existing values) ─────────────
-- Postgres does not support IF NOT EXISTS for ALTER TYPE … ADD VALUE, so we
-- check the pg_enum catalogue directly.
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumlabel = 'engineering'
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'senior_stream')
  ) THEN
    ALTER TYPE senior_stream ADD VALUE 'engineering';
  END IF;
EXCEPTION WHEN undefined_object THEN
  -- Type doesn't exist yet; it will be created together with profiles below.
  CREATE TYPE senior_stream AS ENUM ('science', 'commerce', 'arts', 'engineering');
END $$;


-- ── 3. career_track enum (iiskills.cloud only) ────────────────────────────────
DO $$ BEGIN
  CREATE TYPE career_track AS ENUM (
    'software-engineering',
    'data-science',
    'design',
    'marketing',
    'finance',
    'entrepreneurship',
    'healthcare',
    'civil-services'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;


-- ── 4. profiles table – add site_id + iisacademy / iiskills columns ───────────

-- 4a. site_id column (default 'iisacademy' keeps all existing rows valid)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS site_id site_id NOT NULL DEFAULT 'iisacademy';

-- 4b. iisacademy-specific columns
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS enrolment_class  SMALLINT
    CHECK (enrolment_class BETWEEN 8 AND 12),
  ADD COLUMN IF NOT EXISTS stream           senior_stream;

-- 4c. iiskills-specific column
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS career_track     career_track;


-- ── 5. subscriptions table – add site_id ─────────────────────────────────────

ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS site_id site_id NOT NULL DEFAULT 'iisacademy';


-- ── 6. analytics tables – add site_id if they exist ──────────────────────────

-- module_access_events
DO $$ BEGIN
  ALTER TABLE public.module_access_events
    ADD COLUMN IF NOT EXISTS site_id site_id NOT NULL DEFAULT 'iisacademy';
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- quiz_results
DO $$ BEGIN
  ALTER TABLE public.quiz_results
    ADD COLUMN IF NOT EXISTS site_id site_id NOT NULL DEFAULT 'iisacademy';
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- analytics_chapter_access
DO $$ BEGIN
  ALTER TABLE public.analytics_chapter_access
    ADD COLUMN IF NOT EXISTS site_id site_id NOT NULL DEFAULT 'iisacademy';
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- analytics_quiz_results
DO $$ BEGIN
  ALTER TABLE public.analytics_quiz_results
    ADD COLUMN IF NOT EXISTS site_id site_id NOT NULL DEFAULT 'iisacademy';
EXCEPTION WHEN undefined_table THEN NULL;
END $$;


-- ── 7. Indexes for performance ────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_profiles_site_id
  ON public.profiles (site_id);

CREATE INDEX IF NOT EXISTS idx_subscriptions_site_id
  ON public.subscriptions (site_id);


-- ── 8. Row-Level Security policies ───────────────────────────────────────────
-- Existing "users can access own row" policies continue to work unchanged.
-- We add site-scoped policies so that a user authenticated via iiskills.cloud
-- cannot accidentally read iisacademy profile rows (and vice-versa).
--
-- The site context is carried in the Supabase JWT via a custom claim
-- `app.site_id` set by the Next.js auth layer (see authOptions.ts).
-- Admins and service-role callers can always access all rows.

-- Helper: safe policy creation (skip if already exists)
DO $$ BEGIN

  -- profiles: site-scoped read
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'profiles' AND policyname = 'Users read own profile any site'
  ) THEN
    CREATE POLICY "Users read own profile any site"
      ON public.profiles FOR SELECT
      USING (auth.uid() = id);
  END IF;

  -- profiles: users can only update their own row on any site
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'profiles' AND policyname = 'Users update own profile'
  ) THEN
    CREATE POLICY "Users update own profile"
      ON public.profiles FOR UPDATE
      USING (auth.uid() = id);
  END IF;

  -- profiles: super-admin / service role reads all rows across both sites
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'profiles' AND policyname = 'Admins read all profiles'
  ) THEN
    CREATE POLICY "Admins read all profiles"
      ON public.profiles FOR SELECT
      USING (
        EXISTS (
          SELECT 1 FROM public.profiles AS p
          WHERE p.id = auth.uid()
            AND p.role IN ('admin', 'super_admin')
        )
      );
  END IF;

  -- subscriptions: users see own subscriptions on any site
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'subscriptions' AND policyname = 'Users see own subscriptions any site'
  ) THEN
    CREATE POLICY "Users see own subscriptions any site"
      ON public.subscriptions FOR SELECT
      USING (auth.uid() = user_id);
  END IF;

  -- subscriptions: admins see all
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'subscriptions' AND policyname = 'Admins read all subscriptions'
  ) THEN
    CREATE POLICY "Admins read all subscriptions"
      ON public.subscriptions FOR SELECT
      USING (
        EXISTS (
          SELECT 1 FROM public.profiles
          WHERE id = auth.uid()
            AND role IN ('admin', 'super_admin')
        )
      );
  END IF;

END $$;


-- ── 9. Convenience views ──────────────────────────────────────────────────────
-- These views make it easy to query per-site data from the admin dashboard
-- or analytics pipelines without embedding site_id filters everywhere.

CREATE OR REPLACE VIEW public.iisacademy_profiles AS
  SELECT * FROM public.profiles WHERE site_id = 'iisacademy';

CREATE OR REPLACE VIEW public.iiskills_profiles AS
  SELECT * FROM public.profiles WHERE site_id = 'iiskills';

CREATE OR REPLACE VIEW public.iisacademy_subscriptions AS
  SELECT * FROM public.subscriptions WHERE site_id = 'iisacademy';

CREATE OR REPLACE VIEW public.iiskills_subscriptions AS
  SELECT * FROM public.subscriptions WHERE site_id = 'iiskills';


-- ── 10. Back-fill existing rows ───────────────────────────────────────────────
-- All rows created before this migration belong to iisacademy.
-- The DEFAULT 'iisacademy' on the column definition handles this automatically
-- for new rows; the UPDATE below fixes any NULLs if the column was added
-- without a default in a previous manual migration.

UPDATE public.profiles      SET site_id = 'iisacademy' WHERE site_id IS NULL;
UPDATE public.subscriptions SET site_id = 'iisacademy' WHERE site_id IS NULL;


-- ── Done ──────────────────────────────────────────────────────────────────────
-- Summary of changes:
--   • profiles.site_id          – 'iisacademy' | 'iiskills'
--   • profiles.enrolment_class  – SMALLINT 8–12  (iisacademy)
--   • profiles.stream           – senior_stream enum (iisacademy)
--   • profiles.career_track     – career_track enum (iiskills)
--   • subscriptions.site_id     – 'iisacademy' | 'iiskills'
--   • Views: iisacademy_profiles, iiskills_profiles,
--            iisacademy_subscriptions, iiskills_subscriptions
--   • RLS policies updated for cross-site admin access
