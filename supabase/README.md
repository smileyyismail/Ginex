# Supabase Setup

Apply migrations from this directory before deploying the app:

```bash
supabase db push
```

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

The initial migration creates the catalog tables, indexes, row-level security policies, and the public `ginex-assets` storage bucket used by the admin upload actions.

Admin setup:

1. Create the admin user in Supabase Auth.
2. Sign in at `/login`.
3. Use `/admin` to create brands, categories, and products.

There is only one application role: admin. Any authenticated Supabase user is treated as the admin user. Admin mutations use the service-role key on the server, so every admin-facing Server Action verifies the user has a valid authenticated session before performing a write.
