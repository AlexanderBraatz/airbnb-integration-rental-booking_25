-- Add status column to Bookings table with CHECK constraint
-- This ensures only valid status values can be stored: 'pending', 'accepted', 'declined'
-- Default value is 'pending' for new bookings

ALTER TABLE "Bookings"
ADD COLUMN status TEXT NOT NULL DEFAULT 'pending'
CHECK (status IN ('pending', 'accepted', 'declined'));

-- Optional: Update existing bookings to have 'pending' status
-- (This is already handled by the DEFAULT, but explicit for clarity)
UPDATE "Bookings"
SET status = 'pending'
WHERE status IS NULL;

-- Add a comment to document the column
COMMENT ON COLUMN "Bookings".status IS 'Booking status: pending (default), accepted, or declined. Constrained to these three values only.';
