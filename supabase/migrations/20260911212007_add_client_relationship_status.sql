alter table public.client_demos
  add column if not exists relationship_status text not null default 'potential',
  add column if not exists internal_label text;

alter table public.client_demos
  drop constraint if exists client_demos_relationship_status_check;

alter table public.client_demos
  add constraint client_demos_relationship_status_check
  check (relationship_status in ('potential','active','past','internal'));

alter table public.client_demos
  drop constraint if exists client_demos_internal_label_length;

alter table public.client_demos
  add constraint client_demos_internal_label_length
  check (internal_label is null or char_length(internal_label) between 1 and 120);
