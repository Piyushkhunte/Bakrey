-- Run this once in Supabase SQL Editor before deploying.
create table if not exists public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email ~* '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'),
  created_at timestamptz not null default now()
);

create table if not exists public.customer_reviews (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_role text,
  quote text not null,
  rating smallint not null check (rating between 1 and 5),
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.newsletter_signups enable row level security;
alter table public.customer_reviews enable row level security;

-- Reviews displayed publicly; newsletter writes happen only from the protected API route.
create policy "Featured reviews are publicly visible" on public.customer_reviews
  for select using (is_featured = true);
