interface MigrationStep {
  version: string;
  description: string;
  up: () => Promise<void>;
  down: () => Promise<void>;
}

const migrations: MigrationStep[] = [
  {
    version: "0.0.1",
    description: "Initial schema: users, courses, quizzes, progress",
    up: async () => {
      console.log("Migration 0.0.1 UP: Creating initial schema...");
      // TODO: Connect to Supabase and run SQL migrations
    },
    down: async () => {
      console.log("Migration 0.0.1 DOWN: Dropping initial schema...");
    },
  },
  {
    version: "0.0.2",
    description: "Junior Wing: membership tiers, board access, analytics events",
    up: async () => {
      console.log("Migration 0.0.2 UP: Adding membership and junior wing tables...");
      /*
        Run the following SQL in Supabase SQL Editor:

        -- Membership tiers enum
        CREATE TYPE membership_tier AS ENUM ('free', 'basic', 'premium', 'school');

        -- Board codes enum
        CREATE TYPE board_code AS ENUM (
          'cbse', 'icse', 'karnataka', 'tamil-nadu', 'kerala', 'andhra-pradesh'
        );

        -- Add membership columns to profiles table
        ALTER TABLE public.profiles
          ADD COLUMN IF NOT EXISTS membership_tier membership_tier DEFAULT 'free',
          ADD COLUMN IF NOT EXISTS membership_expires_at TIMESTAMPTZ,
          ADD COLUMN IF NOT EXISTS board board_code,
          ADD COLUMN IF NOT EXISTS wing TEXT CHECK (wing IN ('junior', 'senior', 'university'));

        -- Module access events table (for analytics)
        CREATE TABLE IF NOT EXISTS public.module_access_events (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          module_id TEXT NOT NULL,
          board board_code,
          wing TEXT,
          class_level SMALLINT,
          enhancement_tag TEXT,
          accessed_at TIMESTAMPTZ DEFAULT NOW(),
          duration_seconds INTEGER DEFAULT 0,
          membership_tier membership_tier
        );

        -- Quiz results table
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

        -- RLS policies
        ALTER TABLE public.module_access_events ENABLE ROW LEVEL SECURITY;
        ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

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

        CREATE POLICY "Users can insert own quiz results"
          ON public.quiz_results FOR INSERT
          WITH CHECK (auth.uid() = user_id);

        CREATE POLICY "Users can view own quiz results"
          ON public.quiz_results FOR SELECT
          USING (auth.uid() = user_id);
      */
    },
    down: async () => {
      console.log("Migration 0.0.2 DOWN: Removing junior wing tables...");
      // DROP TABLE public.quiz_results;
      // DROP TABLE public.module_access_events;
    },
  },
];

async function runMigrations(): Promise<void> {
  console.log("=== IIS Academy Database Migrations ===\n");
  for (const migration of migrations) {
    console.log(`Running migration ${migration.version}: ${migration.description}`);
    await migration.up();
    console.log(`✓ Migration ${migration.version} complete\n`);
  }
}

runMigrations().catch(console.error);
