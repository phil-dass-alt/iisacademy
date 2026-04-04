#!/usr/bin/env bash
set -Eeuo pipefail
IFS=$'\n\t'

# ============================================================
# iiskills.in VPS Deployment Script
# ============================================================

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="${REPO_DIR:-$SCRIPT_DIR}"
BRANCH="main"

# HARDCODED IISKILLS PATHS
DOMAIN_ROOT="iiskills.in"
BACKUP_BASE="/var/backups/iiskills"
NODE_ENV="production"

log() { printf "\n[%s] %s\n" "$(date -u +'%Y-%m-%dT%H:%M:%SZ')" "$*"; }
die() { echo "ERROR: $*" >&2; exit 1; }

# --- Pre-flight Checks ---
command -v pnpm >/dev/null 2>&1 || die "pnpm not found. Install with: curl -fsSL https://get.pnpm.io/install.sh | sh -"
command -v pm2 >/dev/null 2>&1 || die "pm2 not found. Install with: npm install -g pm2"

# --- Step 1: Sync Repository ---
log "Syncing iiskills codebase..."
cd "$REPO_DIR"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"

# --- Step 2: Fix EUNSUPPORTEDPROTOCOL ---
log "Installing dependencies using pnpm..."
# pnpm is required here to resolve "workspace:*" packages
pnpm install --frozen-lockfile

# --- Step 3: Build Step ---
log "Building iiskills monorepo..."
pnpm exec turbo run build

# --- Step 4: Process Management ---
log "Restarting iiskills services..."
if [ -f "ecosystem.config.js" ]; then
  # This uses your PM2 config to restart all defined apps
  pm2 startOrRestart ecosystem.config.js --env production
else
  # Manual fallback for the main app
  pm2 start "pnpm start" --name "iiskills-main" --cwd "$REPO_DIR/apps/main"
fi

# --- Step 5: Nginx ---
log "Reloading Nginx configuration..."
if command -v nginx >/dev/null 2>&1; then
  sudo nginx -t && sudo systemctl reload nginx
fi

log "Deployment Complete for iiskills.in"
pm2 status
