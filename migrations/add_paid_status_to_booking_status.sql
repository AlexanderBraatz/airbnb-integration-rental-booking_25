-- Add 'paid' status to the booking_status CHECK constraint
-- This allows bookings to transition from 'accepted' to 'paid' after payment confirmation

ALTER TABLE "Bookings"
DROP CONSTRAINT IF EXISTS "Bookings_status_check";

ALTER TABLE "Bookings"
ADD CONSTRAINT "Bookings_status_check" 
CHECK (status IN ('pending', 'accepted', 'declined', 'paid'));

-- Update the comment to reflect the new status
COMMENT ON COLUMN "Bookings".status IS 'Booking status: pending (default), accepted, declined, or paid. Constrained to these four values only.';
