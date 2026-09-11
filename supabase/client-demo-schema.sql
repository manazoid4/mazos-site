-- Reference bootstrap SQL for the Maz Works client-demo platform.
-- Apply through the connected Supabase project only after the target project is identified.
-- Once verified, generate the canonical migration using the Supabase CLI workflow.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.client_demos (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  business_name text not null,
  passcode_hash text not null,
  active boolean not null default true,
  expires_at timestamptz,
  session_ttl_minutes integer not null default 720,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint client_demos_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint client_demos_slug_length check (char_length(slug) between 1 and 80),
  constraint client_demos_business_name_length check (char_length(business_name) between 1 and 160),
  constraint client_demos_passcode_hash_not_plain check (passcode_hash like '$2%'),
  constraint client_demos_session_ttl_range check (session_ttl_minutes between 15 and 1440)
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

create index if not exists client_demo_sessions_demo_id_idx
  on public.client_demo_sessions(client_demo_id);

create index if not exists client_demo_sessions_expiry_idx
  on public.client_demo_sessions(expires_at)
  where revoked_at is null;

alter table public.client_demos enable row level security;
alter table public.client_demo_sessions enable row level security;

-- These tables contain password hashes and live-session material. They are not
-- browser-facing Data API tables. Public/user roles get no direct privileges and
-- therefore need no permissive RLS policies.
revoke all on table public.client_demos from anon, authenticated;
revoke all on table public.client_demo_sessions from anon, authenticated;

grant select, insert, update, delete on table public.client_demos to service_role;
grant select, insert, update, delete on table public.client_demo_sessions to service_role;

-- First client seed. `password` is intentionally demo-only and must never be
-- presented as a production-strength credential.
insert into public.client_demos (
  slug,
  business_name,
  passcode_hash,
  active,
  expires_at,
  session_ttl_minutes
)
values (
  'dessert-lane',
  'Dessert Lane',
  extensions.crypt('password', extensions.gen_salt('bf', 12)),
  true,
  null,
  720
)
on conflict (slug) do update set
  business_name = excluded.business_name,
  passcode_hash = excluded.passcode_hash,
  active = excluded.active,
  expires_at = excluded.expires_at,
  session_ttl_minutes = excluded.session_ttl_minutes,
  updated_at = now();
