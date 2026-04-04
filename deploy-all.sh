#!/usr/bin/env bash
set -Eeuo pipefail
IFS=$'\n\t'

# ============================================================
# iiskills.in VPS deploy (pnpm version for Monorepo)
# Updated: 2026-04-04
# ============================================================

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="${REPO_DIR:-$SCRIPT_DIR}"
BRANCH="${BRANCH:-main}"
APPS_DIR="${APPS_DIR:-apps}"
NGINX_SITES_AVAILABLE="${NGINX_SITES_AVAILABLE:-/etc/nginx/sites-available}"
NGINX_SITES_ENABLED="${NGINX_SITES_ENABLED:-/etc/nginx/sites-enabled}"
DOMAIN_ROOT="iiskills.in"
NODE_ENV="${NODE_ENV:-production}"
BACKUP_BASE="${BACKUP_BASE:-/var/backups/iiskills}"
MAX_PARALLEL="${MAX_PARALLEL:-1}"
DEEP_CLEAN="${DEEP_CLEAN:-0}"
NUKE_NODE_MODULES="${NUKE_NODE_MODULES:-0}"
DISABLE_NGINX_SITES="${DISABLE_NGINX_SITES:-1}"

log() { printf "\n[%s] %s\n" "$(date -u +'%Y-%m-%dT%H:%M:%SZ')" "$*"; }
die() { echo "ERROR: $*" >&2; exit 1; }
require_cmd() { command -v "$1" >/dev/null 2>&1 || die "Missing required command: $1"; }
sudo_if_needed() { if [[ "${EUID}" -ne 0 ]]; then sudo "$@"; else "$@"; fi; }

confirm_danger() {
  cat >&2 <<'EOF'
DANGER: Disabling nginx sites for iiskills.in. Auto-confirm enabled.
EOF
}

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

_ports_joined=$(printf '%s|' "${PORTS[@]}")
PORTS_REGEX=":${_ports_joined%|}\b"
unset _ports_joined

ORDER=("main" "learn-ai" "learn-management" "learn-developer" "learn-pr" "learn-chemistry" "learn-geography" "learn-math" "learn-physics" "learn-apt")
PM2_APP_NAMES=("main" "learn-ai" "learn-management" "learn-developer" "learn-pr" "learn-chemistry" "learn-geography" "learn-math" "learn-physics" "learn-apt")

run_jobs() {
  local label="$1"
  local cmd="$2"

  if [[ "${MAX_PARALLEL}" -le 1 ]]; then
    log "${label} (sequential)"
    for app in "${ORDER[@]}"; do
      local app_rel="${APP_PATHS[$app]}"
      local app_abs="${REPO_DIR}/${app_rel}"
      log "  → ${label} in ${app_rel}"
      (cd "${app_abs}" && eval "${cmd}")
    done
  else
    require_cmd xargs
    log "${label} (concurrent: ${MAX_PARALLEL})"
    tmp="$(mktemp)"
    for app in "${ORDER[@]}"; do echo "${app}::${APP_PATHS[$app]}" >> "${tmp}"; done
    cat "${tmp}" | xargs -I {} -P "${MAX_PARALLEL}" bash -lc "cd ${REPO_DIR}/\${1##*::} && ${cmd}" -- {}
    rm -f "${tmp}"
  fi
}

require_cmd git
require_cmd pnpm
require_cmd pm2
require_cmd nginx
require_cmd curl

confirm_danger
cd "${REPO_DIR}"

STAMP="$(date -u +'%Y%m%d_%H%M%S')"
BACKUP_DIR="${BACKUP_BASE}/${STAMP}"
sudo_if_needed mkdir -p "${BACKUP_DIR}/nginx"
[[ -f "${NGINX_SITES_AVAILABLE}/iiskills.in" ]] && sudo_if_needed cp "${NGINX_SITES_AVAILABLE}/iiskills.in" "${BACKUP_DIR}/nginx/"
[[ -f "${REPO_DIR}/ecosystem.config.js" ]] && cp "${REPO_DIR}/ecosystem.config.js" "${BACKUP_DIR}/"

log "Updating repo to origin/${BRANCH}"
git fetch --prune origin
git checkout "${BRANCH}"
git reset --hard "origin/${BRANCH}"

log "Stopping/Deleting PM2 apps"
for pm2_name in "${PM2_APP_NAMES[@]}"; do
  pm2 delete "${pm2_name}" >/dev/null 2>&1 || true
done

if [[ "${DISABLE_NGINX_SITES}" -eq 1 ]]; then
  log "Disabling nginx sites"
  sudo_if_needed bash -c "rm -f '${NGINX_SITES_ENABLED}'/*'${DOMAIN_ROOT}'* 2>/dev/null || true"
  sudo_if_needed nginx -s reload
fi

log "Zero-Ghost Policy: cleaning .next folders"
find "${REPO_DIR}/apps" -type d -name '.next' -prune -exec rm -rf {} \; 2>/dev/null || true

# --- USE PNPM INSTALL AT ROOT FIRST FOR WORKSPACES ---
log "Running root pnpm install"
pnpm install

# --- THEN RUN PER-APP IF NEEDED (OR JUST BUILD) ---
run_jobs "pnpm install" "pnpm install"

log "Building apps"
run_jobs "pnpm run build" "NODE_ENV='${NODE_ENV}' pnpm run build"

log "Syncing standalone assets"
for app in "${ORDER[@]}"; do
  APP_REL="${APP_PATHS[$app]}"
  APP_ABS="${REPO_DIR}/${APP_REL}"
  standalone_app="${APP_ABS}/.next/standalone/${APP_REL}"
  if [[ -d "${APP_ABS}/.next/standalone" ]]; then
    mkdir -p "${standalone_app}/.next"
    [[ -d "${APP_ABS}/.next/static" ]] && cp -r "${APP_ABS}/.next/static" "${standalone_app}/.next/"
    [[ -d "${APP_ABS}/public" ]] && cp -r "${APP_ABS}/public" "${standalone_app}/"
  fi
done

log "Symlinking static assets for Nginx"
sudo_if_needed mkdir -p /var/www/html/_next/static
for app in "${ORDER[@]}"; do
  static_src="${REPO_DIR}/${APP_PATHS[$app]}/.next/static"
  sudo_if_needed ln -sfn "${static_src}" "/var/www/html/_next/static/${app}"
done

log "Starting PM2"
DEPLOY_PATH="${REPO_DIR}" pm2 start "${REPO_DIR}/ecosystem.config.js" --update-env
pm2 save

log "Installing Nginx configs from repo"
for _conf in "${REPO_DIR}/nginx"/*.conf; do
  _name="$(basename "${_conf}")"
  sudo_if_needed cp "${_conf}" "${NGINX_SITES_AVAILABLE}/${_name}"
  sudo_if_needed ln -sf "${NGINX_SITES_AVAILABLE}/${_name}" "${NGINX_SITES_ENABLED}/${_name}"
done

sudo_if_needed nginx -t && sudo_if_needed nginx -s reload
log "Deployment Complete."
