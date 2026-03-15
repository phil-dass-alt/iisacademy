# IIS Academy – Production Deployment Guide

**Domain**: iisacademy.in  
**Server**: root@iiskills (self-hosted VPS)  
**Auth**: Supabase + NextAuth.js (authorized users only)  
**Stack**: Next.js 15 monorepo (Turborepo + pnpm) → Nginx reverse proxy

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Pre-requisites](#2-pre-requisites)
3. [Initial VPS Setup](#3-initial-vps-setup)
4. [SSL Certificates](#4-ssl-certificates)
5. [Environment Variables](#5-environment-variables)
6. [Supabase Setup (Authorized Users)](#6-supabase-setup-authorized-users)
7. [Deploy with PM2 (Recommended)](#7-deploy-with-pm2-recommended)
8. [Deploy with Docker Compose (Alternative)](#8-deploy-with-docker-compose-alternative)
9. [Nginx Configuration](#9-nginx-configuration)
10. [Testing & QA Checklist](#10-testing--qa-checklist)
11. [Authorized Badge Logic](#11-authorized-badge-logic)
12. [Troubleshooting](#12-troubleshooting)
13. [Updating the Site](#13-updating-the-site)

---

## 1. Architecture Overview

```
Internet
   │
   ▼
Nginx (ports 80/443)          ← SSL termination, reverse proxy
   │
   ├── iisacademy.in          → Landing App        (localhost:3000)
   ├── portal.iisacademy.in   → Student Portal     (localhost:3001)
   ├── admin.iisacademy.in    → Admin Panel        (localhost:3002)
   └── b2b.iisacademy.in     → B2B School Portal  (localhost:3003)
                                       │
                                       ▼
                               Supabase (cloud)
                               ├── Auth (users, sessions)
                               ├── DB  (profiles, subscriptions, quizzes)
                               └── Storage
```

**Auth flow:**
1. User visits any protected route → redirected to `/login`
2. User submits email/password → validated against Supabase via NextAuth
3. JWT token issued (contains `userId` + `hasSubscription` flag)
4. All subsequent requests carry the JWT in a session cookie
5. Middleware validates the JWT on every request server-side

**Access control:**
- All apps require a valid Supabase account to log in
- Student Portal additionally requires an active subscription (`hasSubscription: true`)
- Admin Panel requires an admin-role Supabase account
- `BYPASS_SUBSCRIPTION_CHECK=true` can be set for QA testing

---

## 2. Pre-requisites

| Requirement | Version |
|-------------|---------|
| OS | Ubuntu 22.04 LTS (or Debian 12) |
| Node.js | ≥ 20 |
| pnpm | 8.15.6 |
| Git | any |
| Docker + Compose plugin | latest (for Docker mode) |
| PM2 | latest (for PM2 mode) |
| Nginx | 1.24+ |
| Certbot | latest |

**DNS records** (set at your domain registrar before running):

```
A   iisacademy.in           → <VPS IP>
A   portal.iisacademy.in    → <VPS IP>
A   admin.iisacademy.in     → <VPS IP>
A   b2b.iisacademy.in       → <VPS IP>
```

---

## 3. Initial VPS Setup

```bash
# SSH into the VPS
ssh root@iiskills

# Run the setup script (installs Docker, Node, pnpm, PM2, Certbot, ufw)
curl -fsSL https://raw.githubusercontent.com/phil-dass-alt/iisacademy/main/deploy/setup.sh | bash

# OR clone first and run locally:
git clone https://github.com/phil-dass-alt/iisacademy /srv/iisacademy
cd /srv/iisacademy
bash deploy/setup.sh
```

The setup script:
- Updates system packages
- Installs Docker, Node.js 20, pnpm 8, PM2, Certbot
- Creates `/srv/iisacademy` and `/var/log/iisacademy`
- Configures `ufw` to allow SSH, HTTP (80), HTTPS (443)
- Sets up log rotation

---

## 4. SSL Certificates

After DNS propagation (wait ~5–15 minutes):

```bash
certbot --nginx \
  -d iisacademy.in \
  -d portal.iisacademy.in \
  -d admin.iisacademy.in \
  -d b2b.iisacademy.in \
  --email admin@iisacademy.in \
  --agree-tos \
  --no-eff-email
```

Auto-renewal is configured automatically by Certbot. Verify:

```bash
systemctl status certbot.timer
certbot renew --dry-run
```

---

## 5. Environment Variables

```bash
cd /srv/iisacademy
cp .env.production.example .env.production
chmod 600 .env.production
nano .env.production  # Fill in all values
```

**Critical values to set:**

| Variable | Description | Where to get |
|----------|-------------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-only) | Supabase Dashboard → Settings → API |
| `NEXTAUTH_SECRET` | JWT signing secret (≥32 chars) | `openssl rand -base64 32` |
| `RAZORPAY_KEY_ID` | Razorpay live key | Razorpay Dashboard |
| `PAYMENT_CALLBACK_SECRET` | HMAC secret for payment webhooks | `openssl rand -hex 32` |

**Testing flag:**
```env
# Set to true for QA – lets any logged-in user bypass subscription check
BYPASS_SUBSCRIPTION_CHECK=true
```

---

## 6. Supabase Setup (Authorized Users)

Only users with accounts in your Supabase project can log in. This is your access control gate.

### 6.1 Create authorized users

```sql
-- In Supabase SQL Editor or via the dashboard:
-- Add testers via Dashboard → Authentication → Users → Invite User
```

Or use the Supabase admin API:
```bash
curl -X POST 'https://your-project.supabase.co/auth/v1/admin/users' \
  -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "tester@example.com",
    "password": "SecurePassword123!",
    "email_confirm": true
  }'
```

### 6.2 Grant subscription for testing

For the student portal to work (without `BYPASS_SUBSCRIPTION_CHECK=true`), testers need a subscription record:

```sql
-- Run in Supabase SQL Editor
INSERT INTO subscriptions (id, user_id, plan, status, start_date, end_date, amount_paid, currency)
VALUES (
  gen_random_uuid(),
  '<USER_UUID>',   -- from auth.users table
  'high-5',
  'active',
  now(),
  now() + interval '5 years',
  499,
  'INR'
);
```

### 6.3 Row Level Security

Ensure RLS is enabled on all tables. See `docs/supabase-setup.md` for full SQL.

---

## 7. Deploy with PM2 (Recommended)

PM2 runs Next.js apps directly on the VPS. Simpler than Docker for single-server setups.

```bash
cd /srv/iisacademy

# First-time or after code changes:
bash deploy/deploy.sh

# The script:
# 1. Pulls latest code from main
# 2. Installs dependencies (pnpm install --frozen-lockfile)
# 3. Builds all apps (turbo build)
# 4. Starts/reloads PM2 processes
# 5. Reloads Nginx config
```

**Monitor processes:**
```bash
pm2 list                     # Status of all apps
pm2 logs                     # Live logs (all apps)
pm2 logs iisa-portal         # Logs for student portal only
pm2 restart iisa-portal      # Restart a specific app
pm2 monit                    # Interactive monitoring dashboard
```

**Autostart on reboot:**
```bash
pm2 startup    # Generates and runs systemd unit
pm2 save       # Saves current process list
```

---

## 8. Deploy with Docker Compose (Alternative)

Docker isolates each app in a container. Useful if you need consistent build environments.

```bash
cd /srv/iisacademy

# Build and start all containers
DEPLOY_MODE=docker bash deploy/deploy.sh

# OR manually:
docker compose --env-file .env.production build
docker compose --env-file .env.production up -d --remove-orphans
```

**Monitor containers:**
```bash
docker compose ps                      # Container status
docker compose logs -f                 # Live logs (all)
docker compose logs -f student-portal  # Portal logs only
docker compose restart student-portal  # Restart a container
```

**Update a single service after code change:**
```bash
docker compose --env-file .env.production build student-portal
docker compose --env-file .env.production up -d --no-deps student-portal
```

---

## 9. Nginx Configuration

The Nginx config is in `nginx/`. The deploy script copies it to `/etc/nginx/` automatically.

To apply manually:
```bash
cp nginx/nginx.conf /etc/nginx/nginx.conf
cp nginx/conf.d/*.conf /etc/nginx/conf.d/
nginx -t        # Test config
systemctl reload nginx
```

**Nginx handles:**
- HTTP → HTTPS redirect
- TLS termination (Let's Encrypt certs)
- Reverse proxy to each Next.js app
- Rate limiting on `/login` (5 req/min) and `/api` (10 req/s)
- Security headers (HSTS, X-Frame-Options, etc.)
- Static asset caching (`_next/static`)

---

## 10. Testing & QA Checklist

Run this checklist after every deployment:

### Auth & Access Control
- [ ] Visit `https://iisacademy.in` → marketing page loads ✓
- [ ] Visit `https://portal.iisacademy.in` → redirects to `/login` ✓
- [ ] Visit `https://admin.iisacademy.in` → redirects to `/login` ✓
- [ ] Visit `https://b2b.iisacademy.in` → redirects to `/login` ✓
- [ ] Login with valid credentials → dashboard loads ✓
- [ ] Login with invalid credentials → error message shown ✓
- [ ] Session persists after page refresh ✓
- [ ] Sign Out → redirected to `/login` ✓

### Student Portal
- [ ] Board selection (CBSE, ICSE, Karnataka, etc.) works ✓
- [ ] Class navigation (8–12) works ✓
- [ ] Subject listing loads ✓
- [ ] Chapter content loads ✓
- [ ] Quiz player works ✓
- [ ] Pricing page loads ✓

### Admin Panel
- [ ] Dashboard stats display ✓
- [ ] User list loads ✓
- [ ] Content management works ✓

### B2B Portal
- [ ] School dashboard loads ✓
- [ ] Student list displays ✓

### Performance
- [ ] `https://iisacademy.in` loads < 3s ✓
- [ ] Static assets have `Cache-Control: immutable` ✓
- [ ] HTTPS enforced (no mixed content) ✓
- [ ] SSL certificate valid (check via https://www.ssllabs.com/ssltest/) ✓

### Health checks
```bash
# Check all apps respond
curl -sI https://iisacademy.in | head -5
curl -sI https://portal.iisacademy.in | head -5
curl -sI https://admin.iisacademy.in | head -5
curl -sI https://b2b.iisacademy.in | head -5

# Check PM2
pm2 list

# Check Nginx
systemctl status nginx
```

---

## 11. Authorized Badge Logic

After a successful payment on `aienter.in`, the payment callback posts to:
```
POST https://iisacademy.in/api/payment/callback
```

Payload (HMAC-SHA256 signed):
```json
{
  "signature": "<hmac-sha256-hex>",
  "paymentRef": "aienter_order_xxx",
  "plan": "class-specific",
  "userId": "<supabase-user-uuid>",
  "enrolledClass": 10,
  "stream": null,
  "subjects": ["Science", "Mathematics", "Social Science", "English"]
}
```

The callback handler:
1. Validates the HMAC signature using `PAYMENT_CALLBACK_SECRET`
2. Calls `assignEnrolledBadge(userId, badge)` to write to Supabase `profiles.enrolled_badges`
3. Updates the `subscriptions` table with the new plan
4. The next time the user logs in (or refreshes their JWT), `hasSubscription: true` is embedded in their token

See `apps/landing/src/app/api/payment/callback/route.ts` for implementation.

---

## 12. Troubleshooting

### App not starting
```bash
pm2 logs iisa-portal --lines 50   # Check error output
# Common causes: missing env vars, port conflict, build failure
```

### Can't log in
- Check `NEXTAUTH_SECRET` is set in `.env.production`
- Check `NEXT_PUBLIC_SUPABASE_URL` and keys are correct
- Verify user exists in Supabase Dashboard → Authentication → Users

### "Missing subscription" redirect loop
- Set `BYPASS_SUBSCRIPTION_CHECK=true` in `.env.production` for testing
- OR add a subscription row to Supabase (see Section 6.2)
- Restart PM2/Docker after changing `.env.production`

### Nginx 502 Bad Gateway
```bash
pm2 list   # Check apps are running
# OR
docker compose ps   # Check containers are up
systemctl status nginx
tail -50 /var/log/nginx/error.log
```

### SSL certificate renewal failure
```bash
certbot renew --dry-run
systemctl status certbot.timer
```

### Build failure
```bash
cd /srv/iisacademy
pnpm install        # Reinstall deps
pnpm run build 2>&1 | head -100   # See error
```

---

## 13. Updating the Site

### Code update (PM2 mode)
```bash
cd /srv/iisacademy
bash deploy/deploy.sh
```

### Code update (Docker mode)
```bash
cd /srv/iisacademy
DEPLOY_MODE=docker bash deploy/deploy.sh
```

### Environment variable change only
```bash
nano /srv/iisacademy/.env.production
# Edit values…

# PM2 mode: restart with new env
pm2 restart ecosystem.config.js --env production

# Docker mode: recreate containers
docker compose --env-file .env.production up -d --force-recreate
```

### Adding a new authorized user
1. Go to Supabase Dashboard → Authentication → Users → Invite User
2. OR use the admin API (see Section 6.1)
3. Add subscription record if needed (Section 6.2)

---

*Last updated: March 2026*  
*Maintained by IIS Academy DevOps — admin@iisacademy.in*
