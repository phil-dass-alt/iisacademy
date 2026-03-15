#!/bin/bash

# deploy-all.sh - Production deploy script for IIS Academy monorepo

set -e

### 1. CONFIGURATION

# Path to monorepo root (update if needed)
MONOREPO_DIR="/var/www/iisacademy"

# Environment file location
ENV_FILE="$MONOREPO_DIR/.env.production"

# Docker compose file (if using Docker)
DOCKER_COMPOSE_FILE="$MONOREPO_DIR/docker-compose.prod.yml"

# Node app start script (fallback for PM2)
NODE_START_SCRIPT="$MONOREPO_DIR/apps/web/start.sh"

### 2. PULL LATEST CODE

echo "Pulling latest code..."
cd "$MONOREPO_DIR"
git pull origin main

### 3. INSTALL DEPENDENCIES

echo "Installing dependencies..."
if [ -f "$MONOREPO_DIR/package.json" ]; then
    npm install --production
fi

### 4. BUILD FOR PRODUCTION

echo "Building production assets..."
if [ -f "$MONOREPO_DIR/package.json" ]; then
    npm run build
fi

### 5. ENVIRONMENT SETUP

echo "Setting environment variables..."
if [ -f "$ENV_FILE" ]; then
    export $(cat "$ENV_FILE" | grep -v '^#' | xargs)
fi

### 6. START SERVICES

# Use Docker if available
if [ -f "$DOCKER_COMPOSE_FILE" ]; then
    echo "Starting site with Docker Compose..."
    docker compose -f "$DOCKER_COMPOSE_FILE" up -d --build
else
    echo "Starting site with PM2/node..."
    if [ ! -x "$NODE_START_SCRIPT" ]; then
        chmod +x "$NODE_START_SCRIPT"
    fi
    pm2 delete iisacademy || true
    pm2 start "$NODE_START_SCRIPT" --name iisacademy
fi

### 7. RUN MIGRATIONS (optional, update if using Prisma/Supabase etc.)

if [ -f "$MONOREPO_DIR/scripts/migrate.sh" ]; then
    echo "Running DB migrations..."
    "$MONOREPO_DIR/scripts/migrate.sh"
fi

### 8. NGINX RELOAD (if using Nginx)

if command -v nginx >/dev/null 2>&1; then
    echo "Reloading Nginx..."
    nginx -s reload
fi

echo "Deployment complete. IIS Academy should be running at https://iisacademy.in"

# END
