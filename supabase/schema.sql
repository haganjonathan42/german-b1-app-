-- German B1 Learning App — Database Schema
-- Run this entire file in your Supabase SQL Editor

-- =========================================================
-- 1. PROFILES (extends Supabase auth.users)
-- =========================================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  current_phase int default 1 check (current_phase between 1 and 5),
  study_streak int default 0,
  last_study_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Auto-create profile when a user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Row Level Security
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- =========================================================
-- 2. ASSIGNMENT COMPLETIONS
-- =========================================================
create table if not exists public.assignment_completions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  assignment_type text not null check (assignment_type in ('grammar', 'writing', 'speaking', 'listening')),
  week_number int not null,
  phase int default 1,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  score int check (score between 0 and 100),
  notes text
);

alter table public.assignment_completions enable row level security;

create policy "Users can view own completions"
  on assignment_completions for select
  using (auth.uid() = user_id);

create policy "Users can insert own completions"
  on assignment_completions for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own completions"
  on assignment_completions for delete
  using (auth.uid() = user_id);

-- =========================================================
-- 3. WRITING ENTRIES
-- =========================================================
create table if not exists public.writing_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null default 'Untitled',
  prompt text default '',
  content text not null,
  word_count int default 0,
  self_score int check (self_score between 0 and 100),
  phase int default 1,
  week_number int default 1,
  writing_type text default 'free' check (writing_type in ('complaint', 'enquiry', 'opinion', 'informal', 'free')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.writing_entries enable row level security;

create policy "Users can view own writing"
  on writing_entries for select
  using (auth.uid() = user_id);

create policy "Users can insert own writing"
  on writing_entries for insert
  with check (auth.uid() = user_id);

create policy "Users can update own writing"
  on writing_entries for update
  using (auth.uid() = user_id);

create policy "Users can delete own writing"
  on writing_entries for delete
  using (auth.uid() = user_id);

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create trigger on_writing_entry_updated
  before update on public.writing_entries
  for each row execute procedure public.handle_updated_at();

-- =========================================================
-- 4. DAILY SESSIONS (for streak tracking)
-- =========================================================
create table if not exists public.daily_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  study_date date not null,
  minutes_studied int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, study_date)
);

alter table public.daily_sessions enable row level security;

create policy "Users can manage own sessions"
  on daily_sessions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- =========================================================
-- 5. MIGRATION — Multi-level support (A1 / A2 / B1)
-- Run this block separately if the tables already exist.
-- =========================================================

-- Add level columns to profiles
alter table public.profiles
  add column if not exists current_level text not null default 'a1'
    check (current_level in ('a1', 'a2', 'b1')),
  add column if not exists placement_completed boolean not null default false;

-- Add level column to assignment_completions
alter table public.assignment_completions
  add column if not exists level text not null default 'b1'
    check (level in ('a1', 'a2', 'b1'));

-- Add level column to writing_entries
alter table public.writing_entries
  add column if not exists level text not null default 'b1'
    check (level in ('a1', 'a2', 'b1'));

-- Update the new-user trigger to include level fields
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, current_phase, current_level, placement_completed)
  values (new.id, new.raw_user_meta_data->>'full_name', 1, 'a1', false);
  return new;
end;
$$;

-- =========================================================
-- Done! All tables created with Row Level Security enabled.
-- =========================================================
