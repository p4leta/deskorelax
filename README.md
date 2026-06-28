This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Instagram gallery architecture

The `/galeria` page consumes a cached Instagram feed from a Cloudflare Worker. The browser never calls Instagram directly and never receives Instagram API tokens.

The Worker:

- Refreshes the long-lived Instagram token server-side.
- Reads Instagram media through `graph.instagram.com/me/media`.
- Copies each image, or video thumbnail, into R2 object storage.
- Stores normalized public feed JSON in KV.
- Serves cached JSON through `GET /instagram/feed`.
- Serves copied media through `GET /instagram/media/:id`.
- Supports manual sync through protected `POST /admin/sync`.
- Runs a daily scheduled sync.

If a sync fails and a cached feed already exists, the Worker keeps serving that old feed with `stale: true` and an error message.

## Frontend configuration

Set this variable for the Vite app:

```bash
VITE_INSTAGRAM_FEED_URL=https://your-worker.example.workers.dev/instagram/feed
```

The frontend helper limits rendered items to 16 and resolves relative media URLs from the Worker against the configured feed URL.

## Cloudflare Worker setup

Worker files live in `workers/instagram-feed`.

### 1. Create storage

Create a KV namespace:

```bash
npx wrangler kv namespace create INSTAGRAM_FEED_KV
npx wrangler kv namespace create INSTAGRAM_FEED_KV --preview
```

Create an R2 bucket:

```bash
npx wrangler r2 bucket create deskorelax-instagram-media
npx wrangler r2 bucket create deskorelax-instagram-media-preview
```

Copy the returned KV namespace IDs into `workers/instagram-feed/wrangler.toml`.

### 2. Configure allowed origins

Set `ALLOWED_ORIGINS` in `workers/instagram-feed/wrangler.toml` or in Cloudflare:

```toml
[vars]
ALLOWED_ORIGINS = "https://your-site.example,http://localhost:8080"
```

Use comma-separated origins. Do not include trailing slashes.

### 3. Set secrets

Store secrets in Cloudflare, not in frontend env files:

```bash
npx wrangler secret put INSTAGRAM_ACCESS_TOKEN --config workers/instagram-feed/wrangler.toml
npx wrangler secret put ADMIN_SYNC_SECRET --config workers/instagram-feed/wrangler.toml
```

`INSTAGRAM_ACCESS_TOKEN` should be a long-lived Instagram token. The Worker uses it as the bootstrap token and then stores refreshed token metadata in KV.

### 4. Deploy the Worker

```bash
npx wrangler deploy --config workers/instagram-feed/wrangler.toml
```

### 5. Run the first manual sync

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_ADMIN_SYNC_SECRET" \
  https://your-worker.example.workers.dev/admin/sync
```

Then confirm the cached public feed:

```bash
curl https://your-worker.example.workers.dev/instagram/feed
```

### 6. Deploy the frontend

Set `VITE_INSTAGRAM_FEED_URL` in the frontend deployment environment and redeploy the Vite app.

## Local development

Run the frontend:

```bash
npm run dev
```

Run tests:

```bash
npm run test
```
