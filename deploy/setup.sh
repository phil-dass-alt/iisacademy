#!/usr/bin/env bash
# =============================================================================
# IIS Academy – Initial VPS Setup Script
# Run once as root on a fresh Debian/Ubuntu server (root@iiskills)
#
# Usage:
#   ssh root@iiskills 'bash -s' < deploy/setup.sh
#
# What this does:
#   1. Updates the system
#   2. Installs Docker, Docker Compose, Nginx, Certbot, Node.js 20, pnpm
#   3. Creates the /srv/iisacademy directory
#   4. Sets up firewall (ufw)
#   5. Configures log directory
# =============================================================================
set -euo pipefail

REPO_DIR="/srv/iisacademy"
LOG_DIR="/var/log/iisacademy"
NODE_VERSION="20"

echo "============================================================"
echo " IIS Academy – VPS Setup"
echo "============================================================"

# ── 1. Update system ──────────────────────────────────────────────────────────
echo "[1/8] Updating system packages…"
apt-get update -y && apt-get upgrade -y

# ── 2. Install prerequisites ──────────────────────────────────────────────────
echo "[2/8] Installing prerequisites…"
apt-get install -y \
  curl wget git unzip ca-certificates gnupg lsb-release \
  ufw fail2ban logrotate

# ── 3. Install Docker ─────────────────────────────────────────────────────────
echo "[3/8] Installing Docker…"
if ! command -v docker &>/dev/null; then
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
    | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update -y
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
  systemctl enable docker
  systemctl start docker
  echo "  Docker installed: $(docker --version)"
else
  echo "  Docker already installed: $(docker --version)"
fi

# ── 4. Install Node.js 20 + pnpm ─────────────────────────────────────────────
echo "[4/8] Installing Node.js ${NODE_VERSION}…"
if ! node --version 2>/dev/null | grep -q "v${NODE_VERSION}"; then
  curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
  apt-get install -y nodejs
fi
echo "  Node: $(node --version)  npm: $(npm --version)"

echo "  Installing pnpm…"
npm install -g pnpm@8.15.6 pm2
echo "  pnpm: $(pnpm --version)  pm2: $(pm2 --version)"

# ── 5. Install Certbot ────────────────────────────────────────────────────────
echo "[5/8] Installing Certbot (Let's Encrypt)…"
apt-get install -y certbot python3-certbot-nginx

# ── 6. Create directories ─────────────────────────────────────────────────────
echo "[6/8] Creating app and log directories…"
mkdir -p "${REPO_DIR}"
mkdir -p "${LOG_DIR}"
chmod 750 "${LOG_DIR}"

# ── 7. Configure firewall ─────────────────────────────────────────────────────
echo "[7/8] Configuring firewall (ufw)…"
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 80/tcp    # HTTP (Nginx / ACME challenge)
ufw allow 443/tcp   # HTTPS
ufw --force enable
echo "  Firewall status:"
ufw status verbose

# ── 8. Set up logrotate ───────────────────────────────────────────────────────
echo "[8/8] Configuring log rotation…"
cat > /etc/logrotate.d/iisacademy << 'LOGROTATE'
/var/log/iisacademy/*.log {
    daily
    missingok
    rotate 14
    compress
    notifempty
    sharedscripts
    postrotate
        pm2 reloadLogs 2>/dev/null || true
    endscript
}
LOGROTATE

echo ""
echo "============================================================"
echo " Setup complete!"
echo ""
echo " Next steps:"
echo "  1. Clone the repo:  git clone https://github.com/phil-dass-alt/iisacademy ${REPO_DIR}"
echo "  2. Copy env vars:   cp ${REPO_DIR}/.env.production.example ${REPO_DIR}/.env.production"
echo "  3. Edit secrets:    nano ${REPO_DIR}/.env.production"
echo "  4. Issue SSL cert:  certbot --nginx -d iisacademy.in -d portal.iisacademy.in \\"
echo "                               -d admin.iisacademy.in -d b2b.iisacademy.in"
echo "  5. Deploy:          cd ${REPO_DIR} && bash deploy/deploy.sh"
echo "============================================================"
