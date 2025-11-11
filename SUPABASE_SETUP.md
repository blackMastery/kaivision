# Supabase Database Setup

## Quick Setup

### 1. Create Supabase Project
1. Go to https://supabase.com and sign in
2. Create a new project
3. Wait for the project to be provisioned

### 2. Run the Migration
You have two options to create the database table:

#### Option A: Using Supabase SQL Editor (Recommended)
1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy the contents of `supabase/migrations/001_create_business_applications.sql`
5. Paste it into the SQL editor
6. Click "Run" to execute the migration

#### Option B: Using Supabase CLI
```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 3. Get Your API Keys
1. In your Supabase project, go to "Project Settings" > "API"
2. Copy your:
   - `Project URL` (looks like: https://xxxxx.supabase.co)
   - `anon/public` key

### 4. Update Environment Variables
Update your `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 5. Verify Setup
After running the migration, you should see a new table called `business_applications` in your Supabase dashboard under "Table Editor".

## Database Schema

### Table: `business_applications`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `business_name` | VARCHAR(255) | Name of the business |
| `industry` | VARCHAR(255) | Business industry |
| `email` | VARCHAR(255) | Contact email |
| `current_situation` | TEXT | Current website situation |
| `goal` | TEXT | Primary goal for the website |
| `created_at` | TIMESTAMP | When the application was submitted |
| `updated_at` | TIMESTAMP | When the application was last updated |

### Security

The table has Row Level Security (RLS) enabled with the following policies:

- **Public Insert**: Anyone can insert new applications (for form submissions)
- **Authenticated Read**: Only authenticated users can read applications (for admin access)

This means the public form can submit applications, but only you (when authenticated) can view them.

## Usage Example

```typescript
import { createBusinessApplication } from '@/lib/database';

// Submit a new application
const application = await createBusinessApplication({
  business_name: 'Acme Corp',
  industry: 'E-commerce',
  email: 'contact@acme.com',
  current_situation: 'No website currently',
  goal: 'Generate online leads'
});
```

## Viewing Submissions

You can view all submissions in your Supabase dashboard:
1. Go to "Table Editor"
2. Select `business_applications` table
3. View all submitted applications

Alternatively, create an admin dashboard in your Next.js app to view and manage applications programmatically.
