create extension if not exists "pgcrypto";

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  category_id uuid not null references public.categories(id) on delete restrict,
  brand_id uuid not null references public.brands(id) on delete restrict,
  featured_image_url text not null,
  images jsonb not null default '[]'::jsonb,
  specifications jsonb not null default '{}'::jsonb,
  features jsonb not null default '[]'::jsonb,
  badge text not null default 'None',
  status text not null default 'Display',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_badge_check check (badge in ('None', 'Trending', 'New', 'Best Seller')),
  constraint products_status_check check (status in ('Display', 'Hide')),
  constraint products_images_array_check check (jsonb_typeof(images) = 'array'),
  constraint products_specifications_object_check check (jsonb_typeof(specifications) = 'object'),
  constraint products_features_array_check check (jsonb_typeof(features) = 'array')
);

create index if not exists categories_name_idx on public.categories (name);
create index if not exists brands_name_idx on public.brands (name);
create index if not exists products_status_created_at_idx on public.products (status, created_at desc);
create index if not exists products_category_id_idx on public.products (category_id);
create index if not exists products_brand_id_idx on public.products (brand_id);
create index if not exists products_badge_idx on public.products (badge) where badge <> 'None';

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

drop trigger if exists brands_set_updated_at on public.brands;
create trigger brands_set_updated_at
before update on public.brands
for each row execute function public.set_updated_at();

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.products enable row level security;

drop policy if exists "Public can read categories" on public.categories;
create policy "Public can read categories"
on public.categories for select
to anon, authenticated
using (true);

drop policy if exists "Public can read brands" on public.brands;
create policy "Public can read brands"
on public.brands for select
to anon, authenticated
using (true);

drop policy if exists "Public can read display products" on public.products;
create policy "Public can read display products"
on public.products for select
to anon
using (status = 'Display');

drop policy if exists "Authenticated users can read full product catalog" on public.products;
create policy "Authenticated users can read full product catalog"
on public.products for select
to authenticated
using (true);

insert into storage.buckets (id, name, public)
values ('ginex-assets', 'ginex-assets', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can read Ginex assets" on storage.objects;
create policy "Public can read Ginex assets"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'ginex-assets');
