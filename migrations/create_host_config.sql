-- Create host_config table for storing pricing settings and host business email
-- This table uses a singleton pattern (always has id=1)

CREATE TABLE IF NOT EXISTS host_config (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  price_per_night_cents INTEGER NOT NULL,
  price_for_dog_cents INTEGER NOT NULL,
  price_for_cleaning_cents INTEGER NOT NULL,
  host_business_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial row with current hardcoded values
INSERT INTO host_config (
  id,
  price_per_night_cents,
  price_for_dog_cents,
  price_for_cleaning_cents,
  host_business_email
) VALUES (
  1,
  10000,
  2500,
  4488,
  ''
) ON CONFLICT (id) DO NOTHING;

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at on row update
CREATE TRIGGER update_host_config_updated_at
  BEFORE UPDATE ON host_config
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
