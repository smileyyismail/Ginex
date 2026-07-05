drop policy if exists "Admin users can read full product catalog" on public.products;
drop function if exists public.is_admin(uuid);
drop table if exists public.admin_users;

alter table public.products
  drop constraint if exists products_badge_check,
  add constraint products_badge_check check (badge in ('None', 'Trending', 'New', 'Featured', 'Best Seller'));

drop policy if exists "Authenticated users can read full product catalog" on public.products;
drop policy if exists "Public can read display products" on public.products;
create policy "Public can read display products"
on public.products for select
to anon, authenticated
using (status = 'Display');

create policy "Authenticated users can read full product catalog"
on public.products for select
to authenticated
using (true);
