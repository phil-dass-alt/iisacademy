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
    description: "Membership & payments: user_memberships, analytics tables",
    up: async () => {
      console.log("Migration 0.0.2 UP: Creating membership and analytics tables...");
      /**
       * Run the following SQL in your Supabase SQL editor or via supabase-js admin:
       *
       * -- Membership records (High-5 plan: Rs 499 for 5 full years, paid via aienter/payments/iisacademy)
       * CREATE TABLE IF NOT EXISTS user_memberships (
       *   id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       *   user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
       *   plan_id       TEXT NOT NULL DEFAULT 'high5-annual',
       *   status        TEXT NOT NULL CHECK (status IN ('free', 'paid', 'expired')),
       *   started_at    TIMESTAMPTZ,
       *   expires_at    TIMESTAMPTZ,
       *   payment_ref   TEXT,
       *   amount_inr    NUMERIC(10,2),
       *   created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
       *   updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
       * );
       *
       * -- Row-level security: users can only read their own membership
       * ALTER TABLE user_memberships ENABLE ROW LEVEL SECURITY;
       * CREATE POLICY "Users see own membership" ON user_memberships
       *   FOR SELECT USING (auth.uid() = user_id);
       *
       * -- Unlocked modules (populated when quiz score >= 60%)
       * CREATE TABLE IF NOT EXISTS user_unlocked_modules (
       *   user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
       *   module_id  TEXT NOT NULL,
       *   unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
       *   PRIMARY KEY (user_id, module_id)
       * );
       *
       * ALTER TABLE user_unlocked_modules ENABLE ROW LEVEL SECURITY;
       * CREATE POLICY "Users see own unlocks" ON user_unlocked_modules
       *   FOR SELECT USING (auth.uid() = user_id);
       *
       * -- Analytics: chapter access events
       * CREATE TABLE IF NOT EXISTS analytics_chapter_access (
       *   id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       *   user_id           UUID REFERENCES auth.users(id) ON DELETE SET NULL,
       *   board             TEXT NOT NULL,
       *   class             SMALLINT NOT NULL,
       *   subject           TEXT NOT NULL,
       *   chapter_id        TEXT NOT NULL,
       *   chapter_name      TEXT NOT NULL,
       *   membership_status TEXT NOT NULL,
       *   accessed_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
       * );
       *
       * -- Analytics: quiz completion events
       * CREATE TABLE IF NOT EXISTS analytics_quiz_results (
       *   id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       *   user_id          UUID REFERENCES auth.users(id) ON DELETE SET NULL,
       *   quiz_id          TEXT NOT NULL,
       *   chapter_id       TEXT NOT NULL,
       *   board            TEXT NOT NULL,
       *   class            SMALLINT NOT NULL,
       *   score            NUMERIC(5,2) NOT NULL,
       *   total_questions  SMALLINT NOT NULL,
       *   correct_answers  SMALLINT NOT NULL,
       *   enhancement_tag  TEXT,
       *   next_module_unlocked TEXT,
       *   completed_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
       * );
       *
       * -- Analytics: membership lifecycle events
       * CREATE TABLE IF NOT EXISTS analytics_membership_events (
       *   id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       *   user_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
       *   event_type  TEXT NOT NULL,
       *   plan        TEXT NOT NULL,
       *   amount_inr  NUMERIC(10,2),
       *   payment_ref TEXT,
       *   occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
       * );
       */
    },
    down: async () => {
      console.log("Migration 0.0.2 DOWN: Dropping membership and analytics tables...");
      // DROP TABLE IF EXISTS analytics_membership_events;
      // DROP TABLE IF EXISTS analytics_quiz_results;
      // DROP TABLE IF EXISTS analytics_chapter_access;
      // DROP TABLE IF EXISTS user_unlocked_modules;
      // DROP TABLE IF EXISTS user_memberships;
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
