# Deploying a site

Each site is one self-contained Docker container running the Nuxt SSR app +
Nitro API + SQLite. Deploy it once onto the client's own server.

## Requirements

- A server that runs Docker (a small VPS is plenty — not just static hosting).
- Outbound network during the image build (it fetches the engine layer + deps).

## First deploy

```bash
# 1. Get the code onto the server
git clone <this-repo> && cd <repo>

# 2. Configure secrets
cp .env.example .env
#    then edit .env — set NUXT_SESSION_PASSWORD, NUXT_ADMIN_PASSWORD,
#    NUXT_OG_IMAGE_SECRET (see the comments in the file)

# 3. Build + start
docker compose up -d --build
```

The site is now on `http://<server>:3000`. Put a reverse proxy (Caddy, nginx,
Traefik) in front for TLS + your domain.

- The **dashboard** is at `/admin` — sign in with `NUXT_ADMIN_EMAIL` /
  `NUXT_ADMIN_PASSWORD`.
- Content, theme, and uploaded images persist on the `app-data` Docker volume,
  so they survive restarts and rebuilds.

## Updating

Content is edited live in the dashboard — no redeploy needed.

To pull a new **engine** version (a core fix), bump the tag in `nuxt.config.ts`
(`extends: ['github:…/layers/engine#vX.Y.Z']` — Renovate can open this PR for
you), then rebuild:

```bash
git pull
docker compose up -d --build
```

The volume (content + uploads) is untouched by a rebuild.

## Backups

Everything mutable is on the `app-data` volume. Back it up:

```bash
docker run --rm -v <project>_app-data:/data -v "$PWD":/backup busybox \
  tar czf /backup/backup.tgz -C /data .
```
