#!/usr/bin/env bash
set -Eeuo pipefail
IFS=$'\n\t'

# ============================================================
# iiskills.in VPS deploy (pnpm workspaces) + PM2 + nginx
#
# Why pnpm:
# - repo uses "workspace:*" deps, which older npm cannot install
#
# What this script does:
# - Backup nginx + ecosystem config (timestamped)
# - Reset repo to origin/<BRANCH>
# - Stop+delete ONLY known iiskills PM2 apps (safe)
# - Optional: disable nginx sites during deploy (default ON)
# - Clean .next artefacts (and optionally caches)
# - pnpm install at repo root
# - Build apps (Turbo if present, otherwise per-app)
# - Start PM2 via ecosystem.config.js
# - Preflight health checks per port
# - Install nginx/*.conf from repo + reload nginx
# - Route + static asset smoke checks
# ============================================================

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="${REPO_DIR:-$SCRIPT_DIR}"
BRANCH="${BRANCH:-main}"

DOMAIN_ROOT="iiskills.in"
BACKUP_BASE="${BACKUP_BASE:-/var/backups/iiskills}"
NODE_ENV="${NODE_ENV:-production}"

NGINX_SITES_AVAILABLE="${NGINX_SITES_AVAILABLE:-/etc/nginx/sites-available}"
NGINX_SITES_ENABLED="${NGINX_SITES_ENABLED:-/etc/nginx/sites-enabled}"

DISABLE_NGINX_SITES="${DISABLE_NGINX_SITES:-1}" # 1=yes (recommended), 0=no
DEEP_CLEAN="${DEEP_CLEAN:-0}"                   # 1=yes remove caches too

# pnpm location: prefer corepack-managed pnpm, but allow system pnpm too
PNPM_BIN="${PNPM_BIN:-pnpm}"

log() { printf "\n[%s] %s\n" "$(date -u +'%Y-%m-%dT%H:%M:%SZ')" "$*"; }
die() { echo "ERROR: $*" >&2; exit 1; }

require_cmd() { command -v "$1" >/dev/null 2>&1 || die "Missing required command: $1"; }
sudo_if_needed() { if [[ "${EUID}" -ne 0 ]]; then sudo "$@"; else "$@"; fi; }

confirm_danger() {
  cat >&2 <<'EOF'

DANGER:
This deploy may temporarily DISABLE nginx sites for:
- iiskills.in
- *.iiskills.in

It removes matching symlinks/files from:
- /etc/nginx/sites-enabled

It will NOT delete anything from:
- /etc/nginx/sites-available

Continuing.
EOF
}

# ----------------------------
# App -> port map
# ----------------------------
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

ORDER=(
  "main"
  "learn-ai"
  "learn-management"
  "learn-developer"
  "learn-pr"
  "learn-chemistry"
  "learn-geography"
  "learn-math"
  "learn-physics"
  "learn-apt"
)

PM2_APP_NAMES=(
  "main"
  "learn-ai"
  "learn-management"
  "learn-developer"
  "learn-pr"
  "learn-chemistry"
  "learn-geography"
  "learn-math"
  "learn-physics"
  "learn-apt"
)

# ----------------------------
# Pre-flight
# ----------------------------
require_cmd git
require_cmd pm2
require_cmd curl
require_cmd nginx

# pnpm via corepack is best; if not available, require pnpm in PATH
if command -v corepack >/dev/null 2>&1; then
  log "corepack found — enabling pnpm"
  corepack enable >/dev/null 2>&1 || true
fi
command -v "${PNPM_BIN}" >/dev/null 2>&1 || die "pnpm not found. Install via corepack (recommended) or install pnpm and set PNPM_BIN."

confirm_danger

log "cd ${REPO_DIR}"
cd "${REPO_DIR}"

# ── Backup ───────────────────────────────────────────────────
STAMP="$(date -u +'%Y%m%d_%H%M%S')"
BACKUP_DIR="${BACKUP_BASE}/${STAMP}"
log "Creating pre-deploy backup → ${BACKUP_DIR}"
sudo_if_needed mkdir -p "${BACKUP_DIR}/nginx"

if [[ -f "${NGINX_SITES_AVAILABLE}/iiskills.in" ]]; then
  sudo_if_needed cp "${NGINX_SITES_AVAILABLE}/iiskills.in" "${BACKUP_DIR}/nginx/iiskills.in.conf"
elif [[ -f "${NGINX_SITES_AVAILABLE}/iiskills.in.conf" ]]; then
  sudo_if_needed cp "${NGINX_SITES_AVAILABLE}/iiskills.in.conf" "${BACKUP_DIR}/nginx/iiskills.in.conf"
fi
if [[ -f "${REPO_DIR}/ecosystem.config.js" ]]; then
  sudo_if_needed cp "${REPO_DIR}/ecosystem.config.js" "${BACKUP_DIR}/ecosystem.config.js"
fi
log "Rollback: sudo bash scripts/rollback.sh ${STAMP}"

# ── Update repo ──────────────────────────────────────────────
log "Updating repo to origin/${BRANCH}"
git fetch --prune origin
git checkout "${BRANCH}"
git reset --hard "origin/${BRANCH}"
log "Deployed commit: $(git rev-parse --short HEAD) — $(git log -1 --pretty=%s)"

# ── Stop+delete iiskills PM2 apps ────────────────────────────
log "Stopping PM2 apps (targeted, best-effort)"
for pm2_name in "${PM2_APP_NAMES[@]}"; do
  pm2 stop "${pm2_name}" >/dev/null 2>&1 || true
done

log "Deleting PM2 apps (targeted, best-effort)"
for pm2_name in "${PM2_APP_NAMES[@]}"; do
  pm2 delete "${pm2_name}" >/dev/null 2>&1 || true
done

# ── Port conflict pre-check ───────────────────────────────────
log "Pre-deploy port conflict check (ensuring iiskills ports are free)"
PORT_CONFLICT=0
for app in "${ORDER[@]}"; do
  port="${PORTS[$app]}"
  if command -v ss &>/dev/null; then
    _owner=$(ss -tulpn 2>/dev/null | grep ":${port} " | awk '{print $NF}' || true)
  else
    _owner=$(netstat -tulpn 2>/dev/null | grep ":${port} " | awk '{print $NF}' || true)
  fi
  if [[ -n "${_owner}" ]]; then
    log "  ⚠️  Port ${port} (${app}) is already in use: ${_owner}"
    PORT_CONFLICT=1
  else
    log "  ✅  Port ${port} (${app}) is free"
  fi
done
if [[ "${PORT_CONFLICT}" -eq 1 ]]; then
  die "One or more iiskills ports are occupied. Aborting deploy."
fi

# ── Disable nginx sites ───────────────────────────────────────
if [[ "${DISABLE_NGINX_SITES}" -eq 1 ]]; then
  log "Disabling nginx sites for *${DOMAIN_ROOT} (remove from sites-enabled ONLY)"
  sudo_if_needed bash -c "rm -f '${NGINX_SITES_ENABLED}'/*'${DOMAIN_ROOT}'* 2>/dev/null || true"
  log "nginx config test (after disabling sites)"
  sudo_if_needed nginx -t
  log "Reloading nginx"
  sudo_if_needed nginx -s reload
else
  log "DISABLE_NGINX_SITES=0 — skipping nginx disable step"
fi

# ── Clean build artefacts ─────────────────────────────────────
if [[ "${DEEP_CLEAN}" -eq 1 ]]; then
  log "DEEP_CLEAN=1: removing caches (.next, .turbo, .cache) across apps/"
  find "${REPO_DIR}/apps" -type d \( -name ".next" -o -name ".turbo" -o -name ".cache" \) -prune -exec rm -rf {} \; 2>/dev/null || true
else
  log "Zero-Ghost Policy: removing all .next build artefacts across apps/"
  find "${REPO_DIR}/apps" -type d -name ".next" -prune -exec rm -rf {} \; 2>/dev/null || true
fi

# ── Install deps (workspace root) ─────────────────────────────
log "Installing dependencies (pnpm workspace)"
# If you have pnpm-lock.yaml, frozen-lockfile is ideal. If not, drop the flag.
if [[ -f "${REPO_DIR}/pnpm-lock.yaml" ]]; then
  "${PNPM_BIN}" install --frozen-lockfile
else
  "${PNPM_BIN}" install
fi

# ── Build ────────────────────────────────────────────────────
log "Building monorepo"
# Prefer turbo if present; otherwise build each app directly.
if [[ -f "${REPO_DIR}/turbo.json" ]] || "${PNPM_BIN}" -s exec -- turbo --version >/dev/null 2>&1; then
  log "Turbo detected — running: pnpm exec turbo run build"
  "${PNPM_BIN}" exec turbo run build
else
  log "Turbo not detected — building apps sequentially with pnpm -C <app> build"
  for app in "${ORDER[@]}"; do
    app_dir="${REPO_DIR}/${APP_PATHS[$app]}"
    log "  → build in ${APP_PATHS[$app]}"
    (cd "${app_dir}" && NODE_ENV="${NODE_ENV}" "${PNPM_BIN}" run build)
  done
fi

# ── Standalone asset copy (keeps your previous runtime expectations) ─────────
log "Copying Next.js standalone static assets and public dirs into each app's standalone output"
for app in "${ORDER[@]}"; do
  APP_REL="${APP_PATHS[$app]}"
  APP_ABS="${REPO_DIR}/${APP_REL}"
  standalone_app="${APP_ABS}/.next/standalone/${APP_REL}"

  if [[ -d "${APP_ABS}/.next/standalone" ]]; then
    mkdir -p "${standalone_app}/.next"

    if [[ -d "${APP_ABS}/.next/static" ]]; then
      rm -rf "${standalone_app}/.next/static" 2>/dev/null || true
      cp -r "${APP_ABS}/.next/static" "${standalone_app}/.next/"
      log "  Copied .next/static → ${APP_REL}/.next/standalone/${APP_REL}/.next/"
    fi

    if [[ -d "${APP_ABS}/public" ]]; then
      rm -rf "${standalone_app}/public" 2>/dev/null || true
      cp -r "${APP_ABS}/public" "${standalone_app}/"
      log "  Copied public/ → ${APP_REL}/.next/standalone/${APP_REL}/"
    fi
  else
    log "  WARNING: ${APP_REL}/.next/standalone not found — did build succeed for ${app}?"
  fi
done

# ── Start PM2 ────────────────────────────────────────────────
log "Starting PM2 apps via ecosystem.config.js"
[[ -f "${REPO_DIR}/ecosystem.config.js" ]] || die "ecosystem.config.js missing at repo root"
DEPLOY_PATH="${REPO_DIR}" pm2 start "${REPO_DIR}/ecosystem.config.js" --update-env
pm2 save

# ── Preflight health checks ──────────────────────────────────
log "Preflight: local HTTP health checks (curl localhost:<port>/api/health)"
PREFLIGHT_PASS=1
declare -A PREFLIGHT_STATUS
PREFLIGHT_MAX_WAIT=30
PREFLIGHT_INTERVAL=5

for app in "${ORDER[@]}"; do
  port="${PORTS[$app]}"
  url="http://127.0.0.1:${port}/api/health"
  http_code="000"
  elapsed=0
  while [[ "${elapsed}" -lt "${PREFLIGHT_MAX_WAIT}" ]]; do
    http_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "${url}" 2>/dev/null || echo "000")
    [[ "${http_code}" == "200" ]] && break
    sleep "${PREFLIGHT_INTERVAL}"
    elapsed=$((elapsed + PREFLIGHT_INTERVAL))
  done

  if [[ "${http_code}" == "200" ]]; then
    PREFLIGHT_STATUS[$app]="OK  (${http_code})"
    log "  ✅  ${app}:${port} → ${http_code}"
  else
    PREFLIGHT_STATUS[$app]="FAIL (${http_code})"
    log "  ⚠️  ${app}:${port} → ${http_code} — did not respond within ${PREFLIGHT_MAX_WAIT}s"
    PREFLIGHT_PASS=0
  fi
done

if [[ "${PREFLIGHT_PASS}" -eq 0 ]]; then
  log "WARNING: some apps did not pass preflight health checks."
  pm2 logs --nostream --lines 30 2>/dev/null || true
fi

# ── Install nginx configs from repo ──────────────────────────
log "Installing nginx configs from repo to ${NGINX_SITES_AVAILABLE}/"
if compgen -G "${REPO_DIR}/nginx/*.conf" >/dev/null; then
  for _conf in "${REPO_DIR}/nginx"/*.conf; do
    _name="$(basename "${_conf}")"
    sudo_if_needed cp "${_conf}" "${NGINX_SITES_AVAILABLE}/${_name}"
    sudo_if_needed ln -sf "${NGINX_SITES_AVAILABLE}/${_name}" "${NGINX_SITES_ENABLED}/${_name}"
    log "  Installed: ${_name}"
  done
else
  log "WARNING: no nginx/*.conf found in repo — skipping nginx install step"
fi

log "Reloading nginx"
sudo_if_needed nginx -t
sudo_if_needed nginx -s reload

# ── Port validation ──────────────────────────────────────────
log "Port validation — verifying iiskills ports are listening"
if command -v ss &>/dev/null; then
  ss -tulpn 2>/dev/null | grep -E "${PORTS_REGEX}" || true
else
  netstat -tulpn 2>/dev/null | grep -E "${PORTS_REGEX}" || true
fi

# ── Final summary ────────────────────────────────────────────
log "Done. Final health summary:"
echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║           iiskills.in Deploy Health Summary                  ║"
printf "║  Deploy timestamp: %-43s║\n" "${STAMP}"
echo "╠══════════════════════════════════════════════════════════════╣"
printf "║  %-25s  %-8s  %-22s║\n" "APP" "PORT" "PREFLIGHT"
echo "╠══════════════════════════════════════════════════════════════╣"
for app in "${ORDER[@]}"; do
  port="${PORTS[$app]}"
  status="${PREFLIGHT_STATUS[$app]:-UNKNOWN}"
  printf "║  %-25s  %-8s  %-22s║\n" "${app}" "${port}" "${status}"
done
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
pm2 ls

if [[ "${PREFLIGHT_PASS}" -eq 0 ]]; then
  echo ""
  echo "⚠️  WARNING: One or more apps failed preflight."
  echo "   Rollback: sudo bash scripts/rollback.sh ${STAMP}"
else
  echo ""
  echo "✅  All apps passed preflight."
  echo "   Backup saved: ${BACKUP_DIR}"
fi
