/**
 * Supabase Analytics Hooks for IIS Academy
 *
 * Tracks chapter access, quiz completions, and membership events.
 * Wire these functions to your Supabase client in production:
 *
 *   import { createClient } from "@supabase/supabase-js";
 *   const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
 *
 * The analytics tables required in Supabase (see migration script):
 *   - analytics_chapter_access
 *   - analytics_quiz_results
 *   - analytics_membership_events
 */

export interface ChapterAccessEvent {
  userId: string;
  board: string;
  class: number;
  subject: string;
  chapterId: string;
  chapterName: string;
  accessedAt: string;
  membershipStatus: "free" | "paid" | "expired";
}

export interface QuizCompletionEvent {
  userId: string;
  quizId: string;
  chapterId: string;
  board: string;
  class: number;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: string;
  enhancementTag?: string;
  nextModuleUnlocked?: string;
}

export interface MembershipEvent {
  userId: string;
  eventType: "signup" | "payment_initiated" | "payment_success" | "payment_failed" | "expired";
  plan: string;
  amountInr?: number;
  paymentRef?: string;
  occurredAt: string;
}

/**
 * Records a chapter access event.
 *
 * In production, replace the console.log stub with a Supabase insert:
 *   await supabase.from("analytics_chapter_access").insert(event);
 */
export async function trackChapterAccess(event: ChapterAccessEvent): Promise<void> {
  // TODO: replace with Supabase client call
  // await supabase.from("analytics_chapter_access").insert(event);
  console.log("[analytics] chapter_access", JSON.stringify(event));
}

/**
 * Records a quiz completion event and optionally unlocks the next module
 * when the student scores >= 60%.
 *
 * In production, replace the stubs with Supabase inserts/updates:
 *   await supabase.from("analytics_quiz_results").insert(event);
 *   if (shouldUnlock) {
 *     await supabase.from("user_unlocked_modules")
 *       .upsert({ userId: event.userId, moduleId: event.nextModuleUnlocked });
 *   }
 */
export async function trackQuizCompletion(event: QuizCompletionEvent): Promise<void> {
  const passingScore = 60;
  const percentage = (event.correctAnswers / event.totalQuestions) * 100;
  const shouldUnlock = percentage >= passingScore && !!event.nextModuleUnlocked;

  // TODO: replace with Supabase client calls
  // await supabase.from("analytics_quiz_results").insert(event);
  console.log("[analytics] quiz_completion", JSON.stringify({ ...event, percentage: percentage.toFixed(1) }));

  if (shouldUnlock) {
    console.log("[analytics] module_unlocked", event.nextModuleUnlocked, "for user", event.userId);
    // await supabase.from("user_unlocked_modules").upsert({ userId: event.userId, moduleId: event.nextModuleUnlocked });
  }
}

/**
 * Records a membership lifecycle event (signup, payment, expiry).
 *
 * In production:
 *   await supabase.from("analytics_membership_events").insert(event);
 */
export async function trackMembershipEvent(event: MembershipEvent): Promise<void> {
  // TODO: replace with Supabase client call
  // await supabase.from("analytics_membership_events").insert(event);
  console.log("[analytics] membership_event", JSON.stringify(event));
}
