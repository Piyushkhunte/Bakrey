alter table public.orders
  add column if not exists payment_notification_sent boolean not null default false;
