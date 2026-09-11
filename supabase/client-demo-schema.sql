-- Reference schema for the Maz Works client-demo platform.
-- Client passcodes are operational secrets: seed them in Supabase, never in Git.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.client_demos (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  business_name text not null,
  passcode_hash text not null,
  active boolean not null default true,
  expires_at timestamptz,
  session_ttl_minutes integer not null default 720,
  relationship_status text not null default 'potential',
  internal_label text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint client_demos_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint client_demos_slug_length check (char_length(slug) between 1 and 80),
  constraint client_demos_business_name_length check (char_length(business_name) between 1 and 160),
  constraint client_demos_passcode_hash_not_plain check (passcode_hash like '$2%'),
  constraint client_demos_session_ttl_range check (session_ttl_minutes between 15 and 1440),
  constraint client_demos_relationship_status_check check (relationship_status in ('potential','active','past','internal')),
  constraint client_demos_internal_label_length check (internal_label is null or char_length(internal_label) between 1 and 120)
);

create table if not exists public.client_demo_sessions (
  id uuid primary key default gen_random_uuid(),
  client_demo_id uuid not null references public.client_demos(id) on delete cascade,
  token_hash text not null unique,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked_at timestamptz,
  constraint client_demo_sessions_token_hash_format check (token_hash ~ '^[0-9a-f]{64}$'),
  constraint client_demo_sessions_expiry_after_creation check (expires_at > created_at)
);

create index if not exists client_demo_sessions_demo_id_idx on public.client_demo_sessions(client_demo_id);
create index if not exists client_demo_sessions_expiry_idx on public.client_demo_sessions(expires_at) where revoked_at is null;

alter table public.client_demos enable row level security;
alter table public.client_demo_sessions enable row level security;

-- Default-deny browser access. These credential/session tables are accessed only
-- by the server-side Edge Function using the service role.
revoke all on table public.client_demos from public, anon, authenticated;
revoke all on table public.client_demo_sessions from public, anon, authenticated;

grant select, insert, update, delete on table public.client_demos to service_role;
grant select, insert, update, delete on table public.client_demo_sessions to service_role;
