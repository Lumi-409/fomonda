create table judgments (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  stock_code text not null,
  stock_name text not null,
  holding boolean not null,
  reason text not null,
  check_card jsonb not null,
  created_at timestamptz not null default now()
);

create index judgments_session_id_idx on judgments (session_id);

grant select, insert, update, delete on public.judgments to service_role;
