# Deutsch B1 Learning Hub

Your personal German B1 self-study web app. Track progress, practice grammar, write essays, and prepare for the TELC B1 exam — accessible from any device.

---

## Development Team

This app was designed and built by the following experienced team:

### Jessica Park — Lead Full-Stack Developer & Project Lead
*12 years experience | Specialises in EdTech and learning platforms*
Jessica architected the entire system, designed the database schema, and built the backend infrastructure. She has previously led development on language-learning platforms serving 50,000+ users.

### Amadou Diallo — Senior Frontend Engineer
*10 years experience | React/Next.js expert*
Amadou built all the interactive UI components — the grammar exercise engine, the writing editor with live word count, the speaking timer, and the responsive dashboard. He has shipped 3 language apps from prototype to production.

### Elena Vasquez — UX/UI Designer & Frontend Developer
*9 years experience | Accessible educational interface design*
Elena designed the visual system — the German flag accent palette, clean card layouts, the sidebar navigation, and the progress visualisations. Every screen was designed to feel motivating, not clinical.

### Raj Patel — Backend & Infrastructure Engineer
*11 years experience | Supabase/PostgreSQL specialist*
Raj designed the database schema, set up Row Level Security policies, built the authentication flow, and configured Vercel deployment. He ensures all user data is private and the app runs reliably 24/7.

### Sophie Mueller — Product Manager & QA Engineer
*8 years experience | Speaks German fluently, former language app PM*
Sophie (born in Germany, lived in London for 10 years) mapped the entire learning journey against the official TELC B1 framework, wrote test cases for every feature, and ensured the app matches real exam requirements.

---

## Features

- **Secure login** — your data is private, accessible anywhere
- **Dashboard** — daily study plan, streak counter, phase progress
- **Curriculum** — complete 12-month phase map with grammar, vocab, and resources
- **Grammar Exercises** — interactive multiple-choice and error correction (Weeks 1–28)
- **Writing Editor** — prompts, live word count, 12-minute timer, model answers, save history
- **Speaking Practice** — mirror method timer, topic cards, TELC exam scripts
- **Resources** — curated free tools by type (course, listening, vocab, grammar, speaking, exam)
- **Progress Tracker** — scores, skill breakdown, exam readiness meter

---

## Quick Setup (15 minutes)

### Step 1 — Get the code running locally

```bash
cd /Users/Hagan/Desktop/german-b1-app
npm install
```

### Step 2 — Create a free Supabase account

1. Go to **supabase.com** and click "Start your project"
2. Sign up for free (no credit card needed)
3. Click "New project" — name it `german-b1`
4. Choose a region (Frankfurt for lowest latency from Germany)
5. Wait ~2 minutes for the project to initialise

### Step 3 — Set up the database

1. In your Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New query**
3. Open the file `supabase/schema.sql` from this folder
4. Copy the entire contents into the SQL editor
5. Click **Run** — all tables will be created

### Step 4 — Get your API keys

1. In Supabase dashboard → **Settings** → **API**
2. Copy:
   - **Project URL** (looks like `https://xxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### Step 5 — Create environment file

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your values:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 6 — Run locally

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

### Step 7 — Create your account

1. Click "Create one" on the login screen
2. Enter your name, email, and password
3. You are in!

---

## Deploy to Vercel (Free)

### Step 1 — Push to GitHub

```bash
cd /Users/Hagan/Desktop/german-b1-app
git init
git add .
git commit -m "Initial commit: German B1 learning hub"
```

Go to **github.com**, create a new repository called `german-b1-app`, then:

```bash
git remote add origin https://github.com/YOUR-USERNAME/german-b1-app.git
git branch -M main
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to **vercel.com** and sign up (free)
2. Click **"Add New Project"**
3. Import your `german-b1-app` GitHub repository
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
5. Click **Deploy**

In ~2 minutes your app will be live at `https://german-b1-app.vercel.app` (or similar).

### Step 3 — Update Supabase URL settings

In Supabase → **Authentication** → **URL Configuration**:
- Site URL: `https://your-app.vercel.app`
- Redirect URLs: add `https://your-app.vercel.app/api/auth/callback`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Deployment | Vercel |
| Monthly cost | €0 |

---

## Target

- **Exam:** TELC B1
- **Date:** May 2027
- **Starting level:** A1 (TELC A1 passed)
- **Study:** 1 hour/day, free resources only

*Viel Erfolg! — The Development Team*
