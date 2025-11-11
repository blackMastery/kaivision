# Database Reference Guide

## Files Created

### Database & Types
- `supabase/migrations/001_create_business_applications.sql` - Database schema migration
- `types/database.ts` - TypeScript types for type safety
- `lib/database.ts` - Database helper functions
- `lib/supabase.ts` - Supabase client configuration (already existed)

### API Routes
- `app/api/applications/route.ts` - API endpoint for form submissions

### Documentation
- `SUPABASE_SETUP.md` - Complete setup instructions
- `DATABASE_REFERENCE.md` - This file

## Database Schema

```sql
business_applications
├── id (UUID, primary key)
├── business_name (VARCHAR)
├── industry (VARCHAR)
├── email (VARCHAR)
├── current_situation (TEXT)
├── goal (TEXT)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## How It Works

### 1. User Submits Form
User fills out the form on the landing page with:
- Business Name
- Industry
- Email
- Current Website Situation
- Primary Goal

### 2. Frontend Sends Data
The form submission (in `app/page.tsx`) sends a POST request to `/api/applications`:
```typescript
fetch('/api/applications', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

### 3. API Route Processes Request
The API route (`app/api/applications/route.ts`):
- Validates required fields
- Validates email format
- Transforms camelCase to snake_case
- Calls the database helper function

### 4. Database Helper Saves Data
The database helper (`lib/database.ts`) uses Supabase client to insert the data:
```typescript
await supabase
  .from('business_applications')
  .insert(data)
```

### 5. Data Stored in Supabase
The data is securely stored in your Supabase PostgreSQL database.

## Security Features

### Row Level Security (RLS)
- **Public Insert Policy**: Allows anonymous users to submit applications
- **Authenticated Read Policy**: Only authenticated users can view applications

This means:
- Form submissions work without authentication
- Only you (when logged in) can view submitted applications

## Quick Start Checklist

- [ ] Create Supabase project at https://supabase.com
- [ ] Run the SQL migration from `supabase/migrations/001_create_business_applications.sql`
- [ ] Get your Project URL and anon key from Supabase dashboard
- [ ] Update `.env.local` with your Supabase credentials
- [ ] Restart your Next.js dev server
- [ ] Test form submission

## Testing the Setup

1. Make sure your `.env.local` has the correct Supabase credentials
2. Start your dev server: `npm run dev`
3. Fill out the form and submit
4. Check your Supabase dashboard > Table Editor > business_applications
5. You should see the new submission!

## Viewing Submissions

### Option 1: Supabase Dashboard
1. Go to your Supabase project
2. Click "Table Editor"
3. Select `business_applications` table
4. View all submissions with timestamps

### Option 2: Create an Admin Page (Future Enhancement)
Create a protected admin route in your Next.js app:
```typescript
import { getAllBusinessApplications } from '@/lib/database';

export default async function AdminPage() {
  const applications = await getAllBusinessApplications();
  // Display applications in a table/list
}
```

## API Endpoints

### POST /api/applications
Submit a new business application.

**Request Body:**
```json
{
  "businessName": "Acme Corp",
  "industry": "E-commerce",
  "email": "contact@acme.com",
  "currentSituation": "No website currently",
  "goal": "Generate online leads"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "id": "uuid",
    "business_name": "Acme Corp",
    "industry": "E-commerce",
    "email": "contact@acme.com",
    "current_situation": "No website currently",
    "goal": "Generate online leads",
    "created_at": "2025-11-10T...",
    "updated_at": "2025-11-10T..."
  }
}
```

**Error Response (400/500):**
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

## Helper Functions

### `createBusinessApplication(data)`
Insert a new business application.

### `getAllBusinessApplications()`
Get all applications (requires authentication).

### `getBusinessApplicationById(id)`
Get a specific application by ID.

### `getBusinessApplicationsByEmail(email)`
Get all applications for a specific email.

## Troubleshooting

### "Failed to submit application"
- Check that `.env.local` has correct Supabase credentials
- Verify the migration was run successfully
- Check browser console for detailed errors
- Verify RLS policies are set correctly

### "Unauthorized" errors
- Make sure the "Allow public insert" policy is enabled
- Check that `NEXT_PUBLIC_` prefix is used for environment variables

### Migration issues
- Run the migration SQL directly in Supabase SQL Editor
- Check for syntax errors in the migration file
- Verify you have the correct permissions in Supabase
