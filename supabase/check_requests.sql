create table check_requests (
  id uuid primary key default gen_random_uuid(),
  ip text not null,
  created_at timestamptz not null default now()
);

create index check_requests_ip_created_at_idx on check_requests (ip, created_at);

grant select, insert, delete on public.check_requests to service_role;
