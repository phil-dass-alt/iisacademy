#!/usr/bin/env bash
set -Eeuo pipefail
IFS=$'\n\t'

# ============================================================
# iisacademy.in VPS deploy (pnpm Monorepo Version)
# ============================================================

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="${REPO_DIR:-$SCRIPT_DIR}"
BRANCH="${BRANCH:-main}"
APPS_DIR="${APPS_DIR:-apps}"
NGINX_SITES_AVAILABLE="${NGINX_SITES_AVAILABLE:-/etc/nginx/sites-available}"
NGINX_SITES_ENABLED="${NGINX_SITES_ENABLED:-/etc/nginx/sites-enabled}"

# UPDATED DOMAIN AND BACKUP PATHS
DOMAIN_ROOT="iisacademy.in"
NODE_ENV="${NODE_ENV:-production}"
BACKUP_BASE="${BACKUP_BASE:-/var/backups/iisacademy}"
MAX_PARALLEL="${MAX_PARALLEL:-1}"
DISABLE_NGINX_SITES="${DISABLE_NGINX_SITES:-1}"

log() { printf "\n[%s] %s\n" "$(date -u +'%Y-%m-%dT%H:%M:%SZ')" "$*"; }
die() { echo "ERROR: $*" >&2; exit 1; }
require_cmd() { command -v "$1" >/dev/null 2>&1 || die "Missing required command: $1"; }
sudo_if_needed() { if [[ "${EUID}" -ne 0 ]]; then sudo "$@"; else "$@"; fi; }

# Port Mapping for your Micro-frontends
declare -A PORTS=(
  ["main"]="3000"
  ["learn-ai"]="3001"
  ["learn-management"]="3002"
  ["learn-developer"]="3003"
  ["learn-pr"]="3004"
  ["learn-chemistry"]="3005"
  ["learn-geography"]="3006"
  ["learn-math"]="3007"
  ["learn-physics"]="3008"
  ["learn-apt"]="3009"
)

# Application Path Mapping
declare -A APP_PATHS=(
  ["main"]="apps/main"
  ["learn-developer"]="apps/developer"
  ["learn-chemistry"]="apps/chemistry"
  ["learn-geography"]="apps/geography"
  ["learn-management"]="apps/management"
  ["learn-math"]="apps/math"
  ["learn-physics"]="apps/physics"
  ["learn-pr"]="apps/pr"
  ["learn-apt"]="apps/aptitude"
  ["learn-ai"]="apps/learn-ai"
)

# --- Pre-flight Checks ---
require_cmd pnpm
require_cmd pm2
require_cmd git
require_cmd nginx

# --- Step 1: Update Codebase ---
log "Fetching latest changes from ${BRANCH}..."
git fetch origin "${BRANCH}"
git reset --hard "origin/${BRANCH}"

# --- Step 2: Monorepo Dependency Install (Fixes EUNSUPPORTEDPROTOCOL) ---
log "Installing dependencies using pnpm workspace..."
# This handles the "workspace:*" protocol correctly
pnpm install --frozen-lockfile

# --- Step 3: Build & Deploy Apps ---
log "Building all applications with Turbo..."
pnpm exec turbo run build

deploy_app() {
  local app_name=$1
  local app_path=${APP_PATHS[$app_name]}
  local port=${PORTS[$app_name]}
  
  log "Deploying ${app_name} on port ${port}..."
  
  # Start/Restart process with PM2
  # We use the root ecosystem config if available, otherwise direct start
  if [ -f "ecosystem.config.js" ]; then
    pm2 startOrRestart ecosystem.config.js --only "$app_name" --env production
  else
    pm2 start "npm -- start" --name "$app_name" --cwd "$REPO_DIR/$app_path" --env production
  fi
}

# Loop through apps and deploy
for app in "${!APP_PATHS[@]}"; do
  deploy_app "$app"
done

# --- Step 4: Finalize Nginx ---
log "Reloading Nginx..."
sudo_if_needed nginx -t
