create table if not exists public.client_demo_content (
  id uuid primary key default gen_random_uuid(),
  client_demo_id uuid not null references public.client_demos(id) on delete cascade,
  path text not null default '',
  content_type text not null default 'text/html; charset=utf-8',
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint client_demo_content_path_format check (path = '' or path ~ '^[a-z0-9][a-z0-9/_-]*$'),
  constraint client_demo_content_path_length check (char_length(path) <= 160),
  constraint client_demo_content_type_length check (char_length(content_type) between 1 and 120),
  unique (client_demo_id, path)
);

create index if not exists client_demo_content_demo_id_idx
  on public.client_demo_content(client_demo_id);

alter table public.client_demo_content enable row level security;
revoke all on table public.client_demo_content from public, anon, authenticated;
grant select, insert, update, delete on table public.client_demo_content to service_role;
