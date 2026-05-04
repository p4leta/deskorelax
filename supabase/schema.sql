create table if not exists public.instagram_connections (
  id text primary key,
  instagram_user_id text,
  access_token text,
  token_expires_at timestamptz,
  last_refreshed_at timestamptz,
  last_media_sync_at timestamptz,
  last_sync_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.instagram_feed_items (
  instagram_media_id text primary key,
  caption text,
  media_type text,
  media_url text,
  permalink text,
  posted_at timestamptz,
  sort_timestamp timestamptz,
  raw_payload jsonb,
  fetched_at timestamptz not null default now(),
  is_active boolean not null default true
);

create index if not exists instagram_feed_items_active_sort_idx
  on public.instagram_feed_items (is_active, sort_timestamp desc);

create or replace function public.set_updated_at_timestamp()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists instagram_connections_set_updated_at on public.instagram_connections;
create trigger instagram_connections_set_updated_at
before update on public.instagram_connections
for each row
execute function public.set_updated_at_timestamp();
