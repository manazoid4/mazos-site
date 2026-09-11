create or replace function public.revoke_client_demo_sessions_on_passcode_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.passcode_hash is distinct from old.passcode_hash then
    update public.client_demo_sessions
    set revoked_at = coalesce(revoked_at, now())
    where client_demo_id = new.id
      and revoked_at is null;
  end if;
  return new;
end;
$$;

revoke all on function public.revoke_client_demo_sessions_on_passcode_change() from public, anon, authenticated;

drop trigger if exists revoke_client_demo_sessions_on_passcode_change on public.client_demos;
create trigger revoke_client_demo_sessions_on_passcode_change
after update of passcode_hash on public.client_demos
for each row
execute function public.revoke_client_demo_sessions_on_passcode_change();
