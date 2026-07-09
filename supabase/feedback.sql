create table feedback (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  content text not null,
  created_at timestamptz not null default now()
);

create index feedback_session_id_idx on feedback (session_id);

grant select, insert, update, delete on public.feedback to service_role;
