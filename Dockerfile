# syntax=docker/dockerfile:1

# ---- build stage ----
# bookworm-slim is glibc, so better-sqlite3 installs its prebuilt binary (no
# compile). The engine layer is fetched during `pnpm install` (nuxt prepare),
# so the build needs network access.
FROM node:22-bookworm-slim AS build
WORKDIR /app
RUN corepack enable
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

# ---- runtime stage ----
# Only the Nitro output is needed at runtime; it already bundles the
# better-sqlite3 native binary under .output/server/node_modules.
FROM node:22-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000 \
    NUXT_DATABASE_PATH=/app/data/app.db \
    NUXT_UPLOADS_DIR=/app/data/uploads
COPY --from=build /app/.output ./.output
# Fallback dir for when no volume is mounted (compose mounts app-data here).
RUN mkdir -p /app/data/uploads
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
