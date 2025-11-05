-- Note: device_id, last_active, and is_online columns already exist in players table
-- This migration focuses on the devices table and related indexes

-- Create devices table for device management
-- Table may already exist, this is for migration purposes
CREATE TABLE devices (
    id TEXT PRIMARY KEY,
    device_fingerprint TEXT NOT NULL UNIQUE,
    user_agent TEXT NOT NULL,
    ip_address TEXT,
    last_seen TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
-- Indexes may already exist, this is for migration purposes
CREATE INDEX idx_players_device_id ON players(device_id);
CREATE INDEX idx_players_is_online ON players(is_online);
CREATE INDEX idx_players_last_active ON players(last_active);
CREATE INDEX idx_devices_fingerprint ON devices(device_fingerprint);
CREATE INDEX idx_devices_last_seen ON devices(last_seen);

-- Note: RLS policies already exist for devices table
-- This migration is complete
