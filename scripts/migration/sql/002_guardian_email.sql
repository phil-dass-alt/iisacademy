-- ============================================================================
-- Migration 002 – Guardian/Parent email collection with OTP verification
-- ============================================================================
-- Adds guardian_email support to the profiles table and a reusable
-- otp_tokens table for email-based OTP verification flows.
--
-- Run this in the Supabase SQL editor (or via psql with a service-role key).
-- Safe to run more than once – all statements use IF NOT EXISTS / DO NOTHING.
-- ============================================================================


-- ── 1. profiles – guardian email columns ─────────────────────────────────────

-- Verified guardian/parent email address.
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS guardian_email TEXT;

-- Timestamp set when the guardian email OTP is successfully verified.
-- NULL means the guardian email has not yet been verified.
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS guardian_otp_verified_at TIMESTAMPTZ;


-- ── 2. otp_tokens – reusable OTP storage table ───────────────────────────────
-- Stores short-lived, hashed OTP tokens used to verify arbitrary email
-- addresses (e.g. guardian email during enrolment).

CREATE TABLE IF NOT EXISTS public.otp_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT        NOT NULL,
  token_hash  TEXT        NOT NULL,
  purpose     TEXT        NOT NULL DEFAULT 'guardian',
  expires_at  TIMESTAMPTZ NOT NULL,
  used        BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookup by (email, purpose) during verification.
CREATE INDEX IF NOT EXISTS idx_otp_tokens_email_purpose
  ON public.otp_tokens (email, purpose);

-- Auto-purge expired tokens to keep the table lean.
-- A cron job or pg_cron task should call this periodically;
-- for correctness the application also ignores rows where expires_at < NOW().
CREATE INDEX IF NOT EXISTS idx_otp_tokens_expires_at
  ON public.otp_tokens (expires_at);


-- ── 3. Row-Level Security for otp_tokens ─────────────────────────────────────
-- The table is only accessed via the service-role (admin) client from the
-- Next.js API routes, so we enable RLS but grant no user-facing policies.
-- Service-role bypasses RLS automatically.

ALTER TABLE public.otp_tokens ENABLE ROW LEVEL SECURITY;


-- ── 4. Field-lock trigger – prevent guardian_email mutation after verification ─
-- Once guardian_otp_verified_at is set, neither the guardian_email nor the
-- verified timestamp may be changed through a normal UPDATE.  Admin (service-
-- role) writes are exempt because they bypass RLS / triggers via SET LOCAL.

CREATE OR REPLACE FUNCTION public.fn_lock_verified_guardian_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
  -- If the row already has a verified guardian email, block changes to both
  -- guardian_email and guardian_otp_verified_at.
  -- Privileged operations (e.g. admin re-verification flows) may bypass this
  -- by setting the session variable: SET LOCAL app.allow_guardian_update = 'true'.
  IF OLD.guardian_otp_verified_at IS NOT NULL
     AND current_setting('app.allow_guardian_update', true) IS DISTINCT FROM 'true'
  THEN
    IF NEW.guardian_email IS DISTINCT FROM OLD.guardian_email THEN
      RAISE EXCEPTION
        'guardian_email cannot be changed after OTP verification'
        USING ERRCODE = 'check_violation';
    END IF;
    IF NEW.guardian_otp_verified_at IS DISTINCT FROM OLD.guardian_otp_verified_at THEN
      RAISE EXCEPTION
        'guardian_otp_verified_at cannot be altered after it is set'
        USING ERRCODE = 'check_violation';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

-- Apply the trigger (safe to run again – DROP IF EXISTS + CREATE).
DROP TRIGGER IF EXISTS trg_lock_verified_guardian_email ON public.profiles;
CREATE TRIGGER trg_lock_verified_guardian_email
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_lock_verified_guardian_email();


-- ── Done ──────────────────────────────────────────────────────────────────────
-- Summary of changes:
--   • profiles.guardian_email          – TEXT, nullable
--   • profiles.guardian_otp_verified_at – TIMESTAMPTZ, nullable
--   • otp_tokens table                 – stores hashed OTPs for email verification
--   • trg_lock_verified_guardian_email – prevents mutation after verification
