/**
 * iiskills – PM2 Ecosystem Configuration
 *
 * Use this when deploying directly on the VPS (without Docker):
 * pm2 start ecosystem.config.js --env production
 * pm2 save && pm2 startup
 *
 * Requires: Node.js ≥ 18, pnpm ≥ 8, pm2 installed globally
 *
 * Build first:  pnpm run build  (in repo root)
 * Then start:   pm2 start ecosystem.config.js --env production
 */

module.exports = {
  apps: [
    // ── Landing Page ───────────────────────────────────────────────────────────
    {
      name: 'iiskills-landing',
      cwd: './apps/landing',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_TELEMETRY_DISABLED: '1',
      },
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      error_file: '/var/log/iiskills/landing-error.log',
      out_file: '/var/log/iiskills/landing-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },

    // ── Student Portal ─────────────────────────────────────────────────────────
    {
      name: 'iiskills-portal',
      cwd: './apps/student-portal',
      script: 'node_modules/.bin/next',
      args: 'start -p 3001',
      env: {
        NODE_ENV: 'development',
        PORT: 3001,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
        NEXT_TELEMETRY_DISABLED: '1',
      },
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '768M',
      error_file: '/var/log/iiskills/portal-error.log',
      out_file: '/var/log/iiskills/portal-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },

    // ── Admin Panel ────────────────────────────────────────────────────────────
    {
      name: 'iiskills-admin',
      cwd: './apps/admin',
      script: 'node_modules/.bin/next',
      args: 'start -p 3002',
      env: {
        NODE_ENV: 'development',
        PORT: 3002,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3002,
        NEXT_TELEMETRY_DISABLED: '1',
      },
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      error_file: '/var/log/iiskills/admin-error.log',
      out_file: '/var/log/iiskills/admin-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },

    // ── B2B School Portal ──────────────────────────────────────────────────────
    {
      name: 'iiskills-b2b',
      cwd: './apps/b2b',
      script: 'node_modules/.bin/next',
      args: 'start -p 3003',
      env: {
        NODE_ENV: 'development',
        PORT: 3003,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3003,
        NEXT_TELEMETRY_DISABLED: '1',
      },
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      error_file: '/var/log/iiskills/b2b-error.log',
      out_file: '/var/log/iiskills/b2b-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
