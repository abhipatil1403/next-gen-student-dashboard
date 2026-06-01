# Student Dashboard

A high-fidelity, futuristic, and highly animated **Student Dashboard** prototype built with **Next.js 15 (App Router)**, **Tailwind CSS v4**, **Framer Motion**, and **Supabase**.

This project features a premium MERN Stack & DSA curriculum dashboard powered by server-rendered data, responsive Bento Grid structures, active profile mutations, study session visualizers, and achievement boards.

---

## 🚀 Key Features

- **Server-Side Fetching (RSC)**: Courses are fetched directly on the server utilizing Next.js React Server Components.
- **Collapsible Responsive Navigation**: Sidebars collapse dynamically on Tablet widths, stack to a sticky bottom tab bar on Mobile, and expand on Desktop screens.
- **Framer Motion Spring Interactions**: Navigation highlights translate dynamically via `layoutId` layout animations; hover states scale up elements and activate glowing borders using spring physics variables (`stiffness: 300`, `damping: 20`).
- **Interactive Profile Editor**: Live profile edits (name, track, rank) are written directly to your Supabase tables from the client.
- **Analytics Charting**: Activity charts are drawn dynamically using SVG coordinate scaling.
- **Graceful Fallbacks**: If Supabase credentials are missing or the query fails, the system triggers offline/sandboxed demo mode using local seed states.

---

## 🛠️ Architecture & Component Split

Next.js App Router separating database operations from client-side interactive controls:

### 1. Server-Side Data fetching (RSC)
- **`src/lib/supabase.ts`**: Database connection pool. Declares fetching functions for courses, profiles, achievements, and weekly analytics, containing fallback logic.
- **`src/app/page.tsx`**: A Server Component that fetches courses and passes the rows to `DashboardGrid.tsx`.
- **`src/app/loading.tsx`**: Suspends page navigation with staggered skeleton blocks.

### 2. Client-Side Presentation
- **`src/components/DashboardLayout.tsx`**: Core layout framework managing navigation tabs, profile edits, SVG charting details, and badge alignments.
- **`src/components/DashboardGrid.tsx`**: Implements bento grid alignment, spring scaling transitions, dynamic Lucide icon rendering, and progress animations.

---

## 🗄️ Full Database Setup (Supabase)

Copy and run this query in your Supabase SQL Editor to initialize all tables and seed default mock values:

```sql
-- 1. Courses Table
create table courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  progress integer not null check (progress >= 0 and progress <= 100),
  icon_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Profiles Table
create table profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  rank text not null default 'Scholar',
  learning_track text not null default 'MERN Stack & DSA',
  daily_streak integer not null default 8,
  xp integer not null default 1200,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Badges Table
create table badges (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  icon_name text not null,
  unlocked_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Analytics Table
create table analytics (
  id uuid primary key default gen_random_uuid(),
  day_label text not null,
  minutes_spent integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Seed Initial Mock Values
insert into courses (title, progress, icon_name) values
('Full-Stack Development (MERN Stack)', 78, 'Layers'),
('Data Structures & Algorithms (DSA)', 45, 'Cpu'),
('Database Management Systems (DBMS)', 92, 'Server'),
('System Design Essentials', 60, 'Database');

insert into profiles (full_name, rank, learning_track, daily_streak, xp) values
('Aarav Sharma', 'Scholar', 'MERN Stack & DSA', 8, 1200);

insert into badges (title, description, icon_name) values
('Velocity Demon', 'Solved 10 code queries in 1 hour', 'Zap'),
('RSC Connoisseur', 'Implemented full server data fetching', 'Database'),
('MERN Mastery', 'Finished advanced node API syllabus', 'CheckCircle2');

insert into analytics (day_label, minutes_spent) values
('Mon', 45),
('Tue', 80),
('Wed', 35),
('Thu', 90),
('Fri', 60),
('Sat', 120),
('Sun', 40);
```

---

## ⚙️ Environment Variables

Duplicate `.env.example` to `.env.local` at the root of the project folder:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

---

## 🛠️ Installation & Execution

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run in development mode**:
   ```bash
   npm run dev
   ```
3. **Build and start production server**:
   ```bash
   npm run build
   npm run start
   ```
