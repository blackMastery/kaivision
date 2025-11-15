-- Add phone_number column to business_applications table
ALTER TABLE business_applications
ADD COLUMN IF NOT EXISTS phone_number VARCHAR(20);

-- Add comment to the column
COMMENT ON COLUMN business_applications.phone_number IS 'Contact phone number for the business application';

