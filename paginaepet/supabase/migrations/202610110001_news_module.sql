-- Módulo de noticias EPET N.º 1
-- Aplicar una sola vez en Supabase SQL Editor o mediante Supabase CLI.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'pending'
    check (role in ('admin', 'editor', 'pending')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.news_categories (
  slug text primary key,
  name text not null unique,
  position integer not null default 0
);

insert into public.news_categories (slug, name, position) values
  ('avisos-institucionales', 'Avisos institucionales', 1),
  ('actividades', 'Actividades', 2),
  ('competencias', 'Competencias', 3),
  ('vida-estudiantil', 'Vida estudiantil', 4),
  ('comunidad', 'Comunidad', 5)
on conflict (slug) do update
set name = excluded.name, position = excluded.position;

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) between 3 and 180),
  slug text not null unique,
  summary text not null check (length(trim(summary)) between 3 and 400),
  body jsonb not null default '{"type":"doc","content":[{"type":"paragraph"}]}'::jsonb,
  category_slug text not null references public.news_categories(slug),
  cover_image_url text,
  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  author_id uuid not null references public.profiles(id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists news_publication_idx
  on public.news (published_at desc)
  where status = 'published';

create index if not exists news_status_updated_idx
  on public.news (status, updated_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists news_set_updated_at on public.news;
create trigger news_set_updated_at
before update on public.news
for each row execute function public.set_updated_at();

-- Nuevos usuarios quedan pendientes hasta que el administrador les asigne un rol.
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
    'pending'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute function public.handle_new_auth_user();

create or replace function public.is_news_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_news_editor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

-- Impide que un redactor archive una noticia o modifique una ya archivada.
create or replace function public.enforce_news_editor_permissions()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null and not public.is_news_admin() then
    if tg_op = 'DELETE' then
      raise exception 'Solo un administrador puede eliminar noticias';
    end if;

    if new.status = 'archived' or old.status = 'archived' then
      raise exception 'Solo un administrador puede archivar o modificar noticias archivadas';
    end if;
  end if;

  if tg_op = 'INSERT' and new.status = 'published' and new.published_at is null then
    new.published_at := now();
  elsif tg_op = 'UPDATE' then
    if new.status = 'published' and (old.status is distinct from new.status or new.published_at is null) then
      new.published_at := coalesce(new.published_at, now());
    elsif new.status = 'draft' then
      new.published_at := null;
    end if;
  end if;

  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$;

drop trigger if exists news_editor_permissions on public.news;
create trigger news_editor_permissions
before insert or update or delete on public.news
for each row execute function public.enforce_news_editor_permissions();

alter table public.profiles enable row level security;
alter table public.news_categories enable row level security;
alter table public.news enable row level security;

drop policy if exists "Users can read own profile or admins can read all" on public.profiles;
create policy "Users can read own profile or admins can read all"
on public.profiles for select to authenticated
using (id = auth.uid() or public.is_news_admin());

drop policy if exists "Only admins can update profiles" on public.profiles;
create policy "Only admins can update profiles"
on public.profiles for update to authenticated
using (public.is_news_admin())
with check (public.is_news_admin());

drop policy if exists "Categories are readable by everyone" on public.news_categories;
create policy "Categories are readable by everyone"
on public.news_categories for select
using (true);

drop policy if exists "Published news are public; editors can read all" on public.news;
create policy "Published news are public; editors can read all"
on public.news for select
using (status = 'published' or public.is_news_editor());

drop policy if exists "Editors can create news" on public.news;
create policy "Editors can create news"
on public.news for insert to authenticated
with check (
  public.is_news_editor()
  and author_id = auth.uid()
  and status in ('draft', 'published')
);

drop policy if exists "Editors can update news" on public.news;
create policy "Editors can update news"
on public.news for update to authenticated
using (public.is_news_editor())
with check (public.is_news_editor());

drop policy if exists "Only admins can delete news" on public.news;
create policy "Only admins can delete news"
on public.news for delete to authenticated
using (public.is_news_admin());

-- Imágenes públicas de noticias: lectura pública; escritura solo a editores y administradores.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'news-images',
  'news-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view news images" on storage.objects;
create policy "Public can view news images"
on storage.objects for select
using (bucket_id = 'news-images');

drop policy if exists "Editors can upload news images" on storage.objects;
create policy "Editors can upload news images"
on storage.objects for insert to authenticated
with check (bucket_id = 'news-images' and public.is_news_editor());

drop policy if exists "Editors can update news images" on storage.objects;
create policy "Editors can update news images"
on storage.objects for update to authenticated
using (bucket_id = 'news-images' and public.is_news_editor())
with check (bucket_id = 'news-images' and public.is_news_editor());

drop policy if exists "Admins can delete news images" on storage.objects;
create policy "Admins can delete news images"
on storage.objects for delete to authenticated
using (bucket_id = 'news-images' and public.is_news_admin());

grant select on public.news_categories to anon, authenticated;
grant select, insert, update, delete on public.news to authenticated;
grant select on public.news to anon;
grant select, update on public.profiles to authenticated;
