-- ============================================================================
-- Migration 002 – Extended Registration Fields
-- ============================================================================
-- Adds mandatory and conditionally-editable registration fields to the
-- `profiles` table, per the IISAcademy Registration Data & Field
-- Editability Spec:
--
--   Locked after OTP verification:
--     • full_name (existing `name` column – now enforced)
--     • date_of_birth
--     • guardian_name
--     • gender
--
--   Never editable (system-assigned):
--     • registration_uid  – auto-generated on INSERT
--
--   Editable until "Freeze & Pay":
--     • phone
--     • address_permanent    (JSONB)
--     • address_communication (JSONB)
--     • emergency_contact_name
--     • emergency_contact_phone
--
--   Onboarding state timestamps (written by the application layer):
--     • otp_verified_at     – set when the user completes OTP verification
--     • onboarding_frozen_at – set when "Freeze & Pay" is completed
--
-- Run in the Supabase SQL editor or via psql with a service-role key.
-- Safe to run more than once – all statements use IF NOT EXISTS / DO NOTHING.
-- ============================================================================


-- ── 1. gender enum ────────────────────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE gender_type AS ENUM (
    'male',
    'female',
    'other',
    'prefer_not_to_say'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;


-- ── 2. Sequence for registration_uid ─────────────────────────────────────────
-- Produces eight-digit zero-padded numbers: 00000001, 00000002, …
CREATE SEQUENCE IF NOT EXISTS registration_uid_seq
  START WITH 1
  INCREMENT BY 1
  NO MAXVALUE
  CACHE 1;


-- ── 3. New columns on profiles ────────────────────────────────────────────────

-- 3a. Fields locked after OTP verification
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS date_of_birth         DATE,
  ADD COLUMN IF NOT EXISTS gender                gender_type,
  ADD COLUMN IF NOT EXISTS guardian_name         TEXT;

-- 3b. System-assigned identifier (never editable by users)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS registration_uid      TEXT UNIQUE;

-- 3c. Onboarding state timestamps
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS otp_verified_at       TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS onboarding_frozen_at  TIMESTAMPTZ;

-- 3d. Fields editable until "Freeze & Pay"
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS phone                       TEXT,
  ADD COLUMN IF NOT EXISTS address_permanent           JSONB,
  ADD COLUMN IF NOT EXISTS address_communication       JSONB,
  ADD COLUMN IF NOT EXISTS emergency_contact_name      TEXT,
  ADD COLUMN IF NOT EXISTS emergency_contact_phone     TEXT;


-- ── 4. Auto-generate registration_uid on INSERT ───────────────────────────────

CREATE OR REPLACE FUNCTION public.fn_generate_registration_uid()
  RETURNS TRIGGER
  LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.registration_uid IS NULL THEN
    -- Format: IIS-<4-digit year>-<8-digit zero-padded sequence>
    -- e.g. IIS-2026-00000001
    NEW.registration_uid :=
      'IIS-' ||
      to_char(CURRENT_DATE, 'YYYY') ||
      '-' ||
      lpad(nextval('public.registration_uid_seq')::text, 8, '0');
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger only if it doesn't already exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'trg_generate_registration_uid'
      AND tgrelid = 'public.profiles'::regclass
  ) THEN
    CREATE TRIGGER trg_generate_registration_uid
      BEFORE INSERT ON public.profiles
      FOR EACH ROW
      EXECUTE FUNCTION public.fn_generate_registration_uid();
  END IF;
END $$;


-- ── 5. Back-fill registration_uid for existing rows ───────────────────────────
-- Existing profiles have no UID yet; assign one to each NULL row.
DO $$
DECLARE
  rec RECORD;
BEGIN
  FOR rec IN
    SELECT id FROM public.profiles WHERE registration_uid IS NULL ORDER BY created_at
  LOOP
    UPDATE public.profiles
    SET registration_uid =
      'IIS-' ||
      to_char(CURRENT_DATE, 'YYYY') ||
      '-' ||
      lpad(nextval('public.registration_uid_seq')::text, 8, '0')
    WHERE id = rec.id;
  END LOOP;
END $$;


-- ── 6. DB-level lock enforcement trigger ─────────────────────────────────────
-- Raises an exception if a caller attempts to modify fields that should be
-- immutable after the relevant onboarding gate has been passed.
-- Application-layer checks in supabase.ts are the primary guard; this trigger
-- provides defense-in-depth against direct SQL / service-role updates.

CREATE OR REPLACE FUNCTION public.fn_enforce_field_locks()
  RETURNS TRIGGER
  LANGUAGE plpgsql
AS $$
BEGIN
  -- registration_uid is NEVER editable once set
  IF OLD.registration_uid IS NOT NULL AND
     NEW.registration_uid IS DISTINCT FROM OLD.registration_uid THEN
    RAISE EXCEPTION
      'registration_uid is immutable and cannot be changed (profile id: %)', OLD.id;
  END IF;

  -- gender is NEVER editable once set (stricter than OTP-locked: the lock
  -- takes effect as soon as a value is written, regardless of OTP status).
  IF OLD.gender IS NOT NULL AND
     NEW.gender IS DISTINCT FROM OLD.gender THEN
    RAISE EXCEPTION
      'gender is immutable once set (profile id: %)', OLD.id;
  END IF;

  -- Fields locked after OTP verification
  IF OLD.otp_verified_at IS NOT NULL THEN
    IF NEW.name IS DISTINCT FROM OLD.name THEN
      RAISE EXCEPTION
        'name is locked after OTP verification (profile id: %)', OLD.id;
    END IF;
    IF NEW.date_of_birth IS DISTINCT FROM OLD.date_of_birth THEN
      RAISE EXCEPTION
        'date_of_birth is locked after OTP verification (profile id: %)', OLD.id;
    END IF;
    IF NEW.guardian_name IS DISTINCT FROM OLD.guardian_name THEN
      RAISE EXCEPTION
        'guardian_name is locked after OTP verification (profile id: %)', OLD.id;
    END IF;
  END IF;

  -- Fields locked after "Freeze & Pay"
  IF OLD.onboarding_frozen_at IS NOT NULL THEN
    IF NEW.phone IS DISTINCT FROM OLD.phone THEN
      RAISE EXCEPTION
        'phone is locked after onboarding freeze (profile id: %)', OLD.id;
    END IF;
    IF NEW.address_permanent IS DISTINCT FROM OLD.address_permanent THEN
      RAISE EXCEPTION
        'address_permanent is locked after onboarding freeze (profile id: %)', OLD.id;
    END IF;
    IF NEW.address_communication IS DISTINCT FROM OLD.address_communication THEN
      RAISE EXCEPTION
        'address_communication is locked after onboarding freeze (profile id: %)', OLD.id;
    END IF;
    IF NEW.emergency_contact_name IS DISTINCT FROM OLD.emergency_contact_name THEN
      RAISE EXCEPTION
        'emergency_contact_name is locked after onboarding freeze (profile id: %)', OLD.id;
    END IF;
    IF NEW.emergency_contact_phone IS DISTINCT FROM OLD.emergency_contact_phone THEN
      RAISE EXCEPTION
        'emergency_contact_phone is locked after onboarding freeze (profile id: %)', OLD.id;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger only if it doesn't already exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'trg_enforce_field_locks'
      AND tgrelid = 'public.profiles'::regclass
  ) THEN
    CREATE TRIGGER trg_enforce_field_locks
      BEFORE UPDATE ON public.profiles
      FOR EACH ROW
      EXECUTE FUNCTION public.fn_enforce_field_locks();
  END IF;
END $$;


-- ── 7. Indexes for performance ────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_profiles_registration_uid
  ON public.profiles (registration_uid);

CREATE INDEX IF NOT EXISTS idx_profiles_otp_verified_at
  ON public.profiles (otp_verified_at)
  WHERE otp_verified_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_profiles_onboarding_frozen_at
  ON public.profiles (onboarding_frozen_at)
  WHERE onboarding_frozen_at IS NOT NULL;


-- ── Done ──────────────────────────────────────────────────────────────────────
-- Summary of changes:
--   • gender_type enum            – male | female | other | prefer_not_to_say
--   • registration_uid_seq        – sequence for auto-generated UIDs
--   • profiles.date_of_birth      – DATE  (locked after OTP)
--   • profiles.gender             – gender_type (never editable once set)
--   • profiles.guardian_name      – TEXT  (locked after OTP)
--   • profiles.registration_uid   – TEXT UNIQUE, auto-generated on INSERT
--   • profiles.otp_verified_at    – TIMESTAMPTZ (onboarding gate 1)
--   • profiles.onboarding_frozen_at – TIMESTAMPTZ (onboarding gate 2)
--   • profiles.phone              – TEXT  (editable until Freeze & Pay)
--   • profiles.address_permanent  – JSONB (editable until Freeze & Pay)
--   • profiles.address_communication – JSONB (editable until Freeze & Pay)
--   • profiles.emergency_contact_name  – TEXT (editable until Freeze & Pay)
--   • profiles.emergency_contact_phone – TEXT (editable until Freeze & Pay)
--   • fn_generate_registration_uid()  – trigger function for UID generation
--   • fn_enforce_field_locks()        – trigger function for immutability rules
--   • trg_generate_registration_uid   – BEFORE INSERT trigger
--   • trg_enforce_field_locks         – BEFORE UPDATE trigger
