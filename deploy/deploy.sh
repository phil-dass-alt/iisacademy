#!/usr/bin/env bash
# =============================================================================
# IIS Academy – Deployment Script
# Run from the repo root on the VPS (or invoke via CI/CD)
#
# Usage (PM2 mode):
#   cd /srv/iisacademy && bash deploy/deploy.sh
#
# Usage (Docker mode):
#   cd /srv/iisacademy && DEPLOY_MODE=docker bash deploy/deploy.sh
#
# Environment variables:
#   DEPLOY_MODE      pm2 (default) | docker
#   ENV_FILE         path to env file (default: .env.production)
#   SKIP_BUILD       true | false (default: false) – skip build step
#   SKIP_PULL        true | false (default: false) – skip git pull
# =============================================================================
set -euo pipefail

DEPLOY_MODE="${DEPLOY_MODE:-pm2}"
ENV_FILE="${ENV_FILE:-.env.production}"
SKIP_BUILD="${SKIP_BUILD:-false}"
SKIP_PULL="${SKIP_PULL:-false}"
LOG_DIR="/var/log/iisacademy"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Colour helpers
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

info()    { echo -e "${GREEN}[INFO]${NC}  $*"; }
warn()    { echo -e "${YELLOW}[WARN]${NC}  $*"; }
error()   { echo -e "${RED}[ERROR]${NC} $*" >&2; }

echo ""
echo "============================================================"
echo " IIS Academy – Deployment (${DEPLOY_MODE^^} mode)"
echo " Repo: ${REPO_DIR}"
echo " Env:  ${ENV_FILE}"
echo "============================================================"

cd "${REPO_DIR}"

# ── Validate env file ─────────────────────────────────────────────────────────
if [[ ! -f "${ENV_FILE}" ]]; then
  error "Environment file '${ENV_FILE}' not found."
  error "Copy .env.production.example → ${ENV_FILE} and fill in all values."
  exit 1
fi

# Load env vars
set -a; source "${ENV_FILE}"; set +a

# ── Required variable check ───────────────────────────────────────────────────
REQUIRED_VARS=(
  NEXT_PUBLIC_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY
  SUPABASE_SERVICE_ROLE_KEY
  NEXTAUTH_SECRET
)
for var in "${REQUIRED_VARS[@]}"; do
  if [[ -z "${!var:-}" ]]; then
    error "Required variable '${var}' is not set in ${ENV_FILE}"
    exit 1
  fi
done
info "Environment variables validated."

# ── Git pull ──────────────────────────────────────────────────────────────────
if [[ "${SKIP_PULL}" != "true" ]]; then
  info "Pulling latest code from origin/main…"
  git fetch origin main
  git reset --hard origin/main
fi

# ── Install dependencies ──────────────────────────────────────────────────────
info "Installing dependencies with pnpm…"
pnpm install --frozen-lockfile

# ── Build ─────────────────────────────────────────────────────────────────────
if [[ "${SKIP_BUILD}" != "true" ]]; then
  info "Building all apps (turbo)…"
  # Ensure build-time env vars are exported
  export NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY
  export NEXT_PUBLIC_LANDING_URL NEXT_PUBLIC_STUDENT_PORTAL_URL
  export NEXT_PUBLIC_ADMIN_URL NEXT_PUBLIC_B2B_URL
  export NEXT_PUBLIC_RAZORPAY_KEY_ID NEXT_PUBLIC_MIXPANEL_TOKEN
  export NEXT_TELEMETRY_DISABLED=1
  pnpm run build
fi

# ── Create log dir ────────────────────────────────────────────────────────────
mkdir -p "${LOG_DIR}"

# ──────────────────────────────────────────────────────────────────────────────
if [[ "${DEPLOY_MODE}" == "docker" ]]; then
# ── Docker Compose deployment ─────────────────────────────────────────────────
  info "Starting services with Docker Compose…"

  # Build images
  docker compose --env-file "${ENV_FILE}" build --no-cache

  # Restart services (zero-downtime rolling via Docker Compose recreate)
  docker compose --env-file "${ENV_FILE}" up -d --remove-orphans

  info "Docker services status:"
  docker compose ps

else
# ── PM2 deployment ────────────────────────────────────────────────────────────
  info "Starting/reloading apps with PM2…"

  # Pass env file to PM2
  export NODE_ENV=production

  if pm2 list | grep -q "iisa-landing"; then
    info "Reloading existing PM2 processes…"
    pm2 reload ecosystem.config.js --env production
  else
    info "Starting PM2 processes for the first time…"
    pm2 start ecosystem.config.js --env production
    pm2 save
    # Ensure PM2 restarts on system reboot
    pm2 startup | grep -E "^sudo" | bash || true
  fi

  info "PM2 process status:"
  pm2 list

fi

# ── Copy Nginx config ─────────────────────────────────────────────────────────
if [[ -f "nginx/nginx.conf" ]]; then
  info "Updating Nginx configuration…"
  cp nginx/nginx.conf /etc/nginx/nginx.conf
  mkdir -p /etc/nginx/conf.d
  cp nginx/conf.d/*.conf /etc/nginx/conf.d/
  nginx -t && systemctl reload nginx || warn "Nginx reload failed – check /etc/nginx/error.log"
fi

echo ""
echo "============================================================"
echo -e " ${GREEN}Deployment complete!${NC}"
echo ""
echo " Site URLs:"
echo "   Landing:        https://iisacademy.in"
echo "   Student Portal: https://portal.iisacademy.in"
echo "   Admin:          https://admin.iisacademy.in"
echo "   B2B Portal:     https://b2b.iisacademy.in"
echo ""
echo " Check logs:"
if [[ "${DEPLOY_MODE}" == "docker" ]]; then
  echo "   docker compose logs -f"
else
  echo "   pm2 logs"
  echo "   tail -f ${LOG_DIR}/*.log"
fi
echo "============================================================"
