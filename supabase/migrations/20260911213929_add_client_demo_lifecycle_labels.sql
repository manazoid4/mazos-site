alter table public.client_demos
  add column if not exists relationship_status text not null default 'potential',
  add column if not exists industry text,
  add column if not exists internal_label text;

alter table public.client_demos
  drop constraint if exists client_demos_relationship_status_check;

alter table public.client_demos
  add constraint client_demos_relationship_status_check
  check (relationship_status in ('potential','active_client','former_client','internal_demo','archived'));

update public.client_demos
set relationship_status = 'potential',
    industry = 'dessert shop',
    internal_label = 'Dessert Lane · Lenton · Potential client',
    updated_at = now()
where slug = 'dessert-lane';
