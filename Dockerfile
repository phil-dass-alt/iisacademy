# IIS Academy – Multi-stage Dockerfile for Next.js apps in pnpm monorepo
# Usage:
#   docker build --build-arg APP_NAME=landing --build-arg APP_PORT=3000 -t iisacademy-landing .
#   docker build --build-arg APP_NAME=student-portal --build-arg APP_PORT=3001 -t iisacademy-portal .
#   docker build --build-arg APP_NAME=admin --build-arg APP_PORT=3002 -t iisacademy-admin .
#   docker build --build-arg APP_NAME=b2b --build-arg APP_PORT=3003 -t iisacademy-b2b .

ARG NODE_VERSION=20
ARG APP_NAME=landing
ARG APP_PORT=3000

# ── Stage 1: base ──────────────────────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS base
RUN corepack enable && corepack prepare pnpm@8.15.6 --activate

# ── Stage 2: pruner (turbo prune creates a minimal workspace) ─────────────────
FROM base AS pruner
ARG APP_NAME
WORKDIR /app
COPY . .
RUN pnpm dlx turbo@2 prune apps/${APP_NAME} --docker

# ── Stage 3: installer (install only pruned deps) ─────────────────────────────
FROM base AS installer
ARG APP_NAME
WORKDIR /app

# Copy pruned lock files and workspace manifests
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install deps with frozen lockfile for reproducibility
RUN pnpm install --frozen-lockfile

# ── Stage 4: builder (compile the Next.js app) ────────────────────────────────
FROM installer AS builder
ARG APP_NAME
WORKDIR /app

# Copy full source for the pruned workspace
COPY --from=pruner /app/out/full/ .

# Set production env for the build
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

# Build only the target app (turbo handles dependency graph)
RUN pnpm dlx turbo@2 run build --filter=apps/${APP_NAME}...

# ── Stage 5: runner (minimal production image) ────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS runner
ARG APP_NAME
ARG APP_PORT
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=${APP_PORT} \
    HOSTNAME="0.0.0.0"

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy standalone server output
# Next.js standalone puts everything under .next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public

USER nextjs

EXPOSE ${APP_PORT}

# The standalone server entry point is apps/<app-name>/server.js in the monorepo
CMD ["node", "apps/${APP_NAME}/server.js"]
