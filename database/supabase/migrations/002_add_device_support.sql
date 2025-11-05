-- Add device support to the players table
ALTER TABLE players 
ADD COLUMN device_id TEXT NOT NULL DEFAULT '',
ADD COLUMN last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN is_online BOOLEAN DEFAULT false;

-- Create devices table for device management
CREATE TABLE IF NOT EXISTS devices (
    id TEXT PRIMARY KEY,
    device_fingerprint TEXT NOT NULL UNIQUE,
    user_agent TEXT NOT NULL,
    ip_address TEXT,
    last_seen TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_players_device_id ON players(device_id);
CREATE INDEX idx_players_is_online ON players(is_online);
CREATE INDEX idx_players_last_active ON players(last_active);
CREATE INDEX idx_devices_fingerprint ON devices(device_fingerprint);
CREATE INDEX idx_devices_last_seen ON devices(last_seen);

-- Add RLS policies for devices table
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own devices
CREATE POLICY "Users can view own devices"
    ON devices FOR SELECT
    USING (device_fingerprint = current_setting('app.current_device_fingerprint', true));

-- Policy: Users can insert their own devices
CREATE POLICY "Users can insert own devices"
    ON devices FOR INSERT
    WITH CHECK (device_fingerprint = current_setting('app.current_device_fingerprint', true));

-- Policy: Users can update their own devices
CREATE POLICY "Users can update own devices"
    ON devices FOR UPDATE
    USING (device_fingerprint = current_setting('app.current_device_fingerprint', true));

-- Update existing players to have device_id based on their id (temporary)
UPDATE players SET device_id = 'device-' || id WHERE device_id = '';

-- Add unique constraint to ensure one player per device per game
-- This will be enforced at the application level for now
-- ALTER TABLE players ADD CONSTRAINT unique_device_per_game UNIQUE(device_id, game_id);
