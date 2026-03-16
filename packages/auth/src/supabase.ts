import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { EnrolledBadge, SiteId } from './types';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error(
        'Missing required Supabase environment variables. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your .env file.'
      );
    }
    supabaseInstance = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return supabaseInstance;
}

export function getSupabaseAdminClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error('Missing Supabase admin environment variables');
  }
  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function getUserSubscription(userId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('end_date', { ascending: false })
    .limit(1)
    .single();
  if (error) return null;
  return data;
}

/**
 * Fetch the active subscription for a user scoped to a specific site.
 * When `siteId` is omitted the query falls back to the unfiltered behaviour
 * for backward compatibility with iisacademy-only deployments.
 */
export async function getUserSubscriptionBySite(userId: string, siteId?: SiteId) {
  const supabase = getSupabaseClient();
  let query = supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('end_date', { ascending: false })
    .limit(1);

  if (siteId) {
    query = query.eq('site_id', siteId);
  }

  const { data, error } = await query.single();
  if (error) return null;
  return data;
}

export async function checkActiveSubscription(userId: string): Promise<boolean> {
  const subscription = await getUserSubscription(userId);
  if (!subscription) return false;
  const now = new Date();
  const endDate = new Date(subscription.end_date);
  return endDate > now;
}

/**
 * Check whether the user has an active subscription on a specific site.
 */
export async function checkActiveSubscriptionBySite(
  userId: string,
  siteId: SiteId
): Promise<boolean> {
  const subscription = await getUserSubscriptionBySite(userId, siteId);
  if (!subscription) return false;
  const now = new Date();
  const endDate = new Date(subscription.end_date);
  return endDate > now;
}

/**
 * Fetch the user's profile row from Supabase (uses admin client to bypass RLS).
 */
export async function getUserProfile(userId: string) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) return null;
  return data;
}

/**
 * Append an EnrolledBadge to the user's `enrolled_badges` JSONB array
 * in the `profiles` table.  Uses the admin client so it bypasses RLS.
 */
export async function assignEnrolledBadge(
  userId: string,
  badge: EnrolledBadge
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseAdminClient();

  // Fetch existing badges first so we can append rather than overwrite.
  const profile = await getUserProfile(userId);
  if (!profile) {
    return { success: false, error: 'User profile not found' };
  }

  const existingBadges: EnrolledBadge[] = Array.isArray(profile.enrolled_badges)
    ? (profile.enrolled_badges as EnrolledBadge[])
    : [];

  const updatedBadges = [...existingBadges, badge];

  const { error } = await supabase
    .from('profiles')
    .update({ enrolled_badges: updatedBadges })
    .eq('id', userId);

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}
