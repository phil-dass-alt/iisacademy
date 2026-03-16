/**
 * Multi-tenant utilities for iisacademy.in and iiskills.cloud.
 *
 * Both sites share a single Supabase project. Tenant identity is determined
 * from the request hostname at runtime, and database rows are separated by a
 * `site_id` column enforced via Row-Level Security (RLS) policies.
 *
 * Usage (Next.js server component / middleware):
 *   import { getSiteConfig } from '@iisacademy/auth';
 *   const config = getSiteConfig(request.headers.get('host') ?? '');
 *
 * Usage (Next.js client component):
 *   import { getSiteConfig } from '@iisacademy/auth';
 *   const config = getSiteConfig(); // reads window.location.hostname
 */

import type { SiteId, TenantConfig } from './types';

const IISACADEMY_CONFIG: TenantConfig = {
  siteId: 'iisacademy',
  name: 'IIS Academy',
  domain: 'iisacademy.in',
  portalDomain: 'portal.iisacademy.in',
  adminDomain: 'admin.iisacademy.in',
  b2bDomain: 'b2b.iisacademy.in',
  features: {
    classSelector: true,
    streamSelector: true,
    boardSelector: true,
    b2bPortal: true,
    voiceAi: true,
    careerTracks: false,
    certifications: false,
  },
};

const IISKILLS_CONFIG: TenantConfig = {
  siteId: 'iiskills',
  name: 'IIS Skills',
  domain: 'iiskills.cloud',
  portalDomain: 'portal.iiskills.cloud',
  adminDomain: 'admin.iiskills.cloud',
  b2bDomain: 'b2b.iiskills.cloud',
  features: {
    classSelector: false,
    streamSelector: false,
    boardSelector: false,
    b2bPortal: true,
    voiceAi: false,
    careerTracks: true,
    certifications: true,
  },
};

const SITE_CONFIGS: Record<SiteId, TenantConfig> = {
  iisacademy: IISACADEMY_CONFIG,
  iiskills: IISKILLS_CONFIG,
};

/**
 * Derive the `SiteId` from a hostname string.
 *
 * Rules:
 *  - Any hostname containing "iiskills" → "iiskills"
 *  - Everything else (including localhost / iisacademy.in) → "iisacademy"
 *  - The `NEXT_PUBLIC_SITE_ID` environment variable can override at build time
 *    so that dedicated Docker images resolve the correct site without relying
 *    on runtime hostname detection.
 */
export function getSiteId(hostname?: string): SiteId {
  // Build-time / runtime env override takes priority.
  const envSiteId = process.env['NEXT_PUBLIC_SITE_ID'];
  if (envSiteId === 'iiskills') return 'iiskills';
  if (envSiteId === 'iisacademy') return 'iisacademy';

  const host = hostname ?? (typeof window !== 'undefined' ? window.location.hostname : '');
  if (host.includes('iiskills')) return 'iiskills';
  return 'iisacademy';
}

/**
 * Return the full `TenantConfig` for the given hostname.
 * When called on the client side without arguments, uses `window.location.hostname`.
 */
export function getSiteConfig(hostname?: string): TenantConfig {
  return SITE_CONFIGS[getSiteId(hostname)];
}

/**
 * Return the feature-flag set for the given hostname.
 */
export function getSiteFeatures(hostname?: string) {
  return getSiteConfig(hostname).features;
}

/** Convenience: true when the current site is iisacademy.in. */
export function isSiteAcademy(hostname?: string): boolean {
  return getSiteId(hostname) === 'iisacademy';
}

/** Convenience: true when the current site is iiskills.cloud. */
export function isSiteSkills(hostname?: string): boolean {
  return getSiteId(hostname) === 'iiskills';
}
