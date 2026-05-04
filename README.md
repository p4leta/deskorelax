This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Instagram feed on `/galeria`

The gallery page renders up to 16 posts in a 4-column desktop grid and keeps the existing Instagram CTA button below it.

### What was added

- Public feed endpoint: `/api/instagram-feed`
- Admin connect route: `/api/instagram/connect/start`
- Admin callback route: `/api/instagram/connect/callback`
- Scheduled refresh route: `/api/instagram/refresh`
- Supabase schema: `supabase/schema.sql`
- Vercel cron schedule: `vercel.json`

### Required setup

1. Convert the Instagram account to a professional account.
2. Create a Meta app for Instagram and configure the redirect URL:
   - `https://your-domain.example/api/instagram/connect/callback`
3. Create a Supabase project and run `supabase/schema.sql`.
4. Add the environment variables from `.env.example` to your deployment.
5. Deploy the app on Vercel or another host that supports serverless routes and scheduled jobs.
6. Open this URL in the browser to connect the Instagram account:
   - `https://your-domain.example/api/instagram/connect/start?admin_secret=YOUR_INSTAGRAM_ADMIN_SECRET`
7. Confirm that `/galeria` starts showing posts.

### Automatic updates

- The public site never talks to Instagram directly.
- `/api/instagram-feed` reads from Supabase cache and refreshes the feed if the cache is stale.
- `vercel.json` runs `/api/instagram/refresh` once per day.
- The refresh route also refreshes the long-lived Instagram token when it gets close to expiry.

### Manual refresh

To force a sync manually:

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  https://your-domain.example/api/instagram/refresh
```

### Environment variables

See `.env.example` for the full list.
