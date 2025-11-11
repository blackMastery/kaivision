-- Create business_applications table
CREATE TABLE IF NOT EXISTS business_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name VARCHAR(255) NOT NULL,
  industry VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  current_situation TEXT NOT NULL,
  goal TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_business_applications_email ON business_applications(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_business_applications_created_at ON business_applications(created_at DESC);

-- Add RLS (Row Level Security) policies
ALTER TABLE business_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (for public form submissions)
CREATE POLICY "Allow public insert" ON business_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to read all (for admin dashboard)
CREATE POLICY "Allow authenticated read" ON business_applications
  FOR SELECT
  TO authenticated
  USING (true);

-- Add a comment to the table
COMMENT ON TABLE business_applications IS 'Stores business applications for free website offer';

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_business_applications_updated_at
  BEFORE UPDATE ON business_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
