-- PostgreSQL-specific triggers and advanced functions
-- This file contains PostgreSQL/Supabase specific syntax that may not be recognized by standard SQL linters

-- Function to update updated_at timestamp (PostgreSQL PL/pgSQL)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at (PostgreSQL specific)
CREATE TRIGGER update_players_updated_at BEFORE UPDATE ON players
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_games_updated_at BEFORE UPDATE ON games
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_game_sessions_updated_at BEFORE UPDATE ON game_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_characters_updated_at BEFORE UPDATE ON characters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Advanced PostgreSQL functions with UUID support
CREATE OR REPLACE FUNCTION is_game_full_pg(game_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
    current_players INTEGER;
    max_players INTEGER;
BEGIN
    SELECT COUNT(gp.player_id), g.max_players 
    INTO current_players, max_players
    FROM games g
    LEFT JOIN game_players gp ON g.id = gp.game_id
    WHERE g.id = game_uuid
    GROUP BY g.max_players;
    
    RETURN current_players >= max_players;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_player_stats_pg(player_uuid UUID)
RETURNS TABLE(
    name VARCHAR,
    character_name VARCHAR,
    class VARCHAR,
    level INTEGER,
    health INTEGER,
    max_health INTEGER,
    mana INTEGER,
    max_mana INTEGER,
    strength INTEGER,
    dexterity INTEGER,
    intelligence INTEGER,
    wisdom INTEGER,
    charisma INTEGER,
    experience_points INTEGER,
    gold INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.name,
        p.character_name,
        p.class,
        p.level,
        p.health,
        p.max_health,
        p.mana,
        p.max_mana,
        p.strength,
        p.dexterity,
        p.intelligence,
        p.wisdom,
        p.charisma,
        p.experience_points,
        p.gold
    FROM players p
    WHERE p.id = player_uuid;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_experience_pg(player_uuid UUID, exp_amount INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
    current_exp INTEGER;
    current_level INTEGER;
    new_level INTEGER;
    exp_for_next_level INTEGER;
BEGIN
    -- Get current player stats
    SELECT experience_points, level 
    INTO current_exp, current_level
    FROM players 
    WHERE id = player_uuid;
    
    -- Add experience
    UPDATE players 
    SET experience_points = current_exp + exp_amount
    WHERE id = player_uuid;
    
    -- Check for level up (1000 exp per level for simplicity)
    new_level := current_level;
    WHILE (current_exp + exp_amount) >= (new_level * 1000) LOOP
        new_level := new_level + 1;
    END LOOP;
    
    -- If leveled up, update stats
    IF new_level > current_level THEN
        UPDATE players 
        SET 
            level = new_level,
            max_health = max_health + (new_level - current_level) * 10,
            health = health + (new_level - current_level) * 10,
            max_mana = max_mana + (new_level - current_level) * 5,
            mana = mana + (new_level - current_level) * 5,
            strength = strength + (new_level - current_level) * 2,
            dexterity = dexterity + (new_level - current_level) * 2,
            intelligence = intelligence + (new_level - current_level) * 2,
            wisdom = wisdom + (new_level - current_level) * 2,
            charisma = charisma + (new_level - current_level) * 2
        WHERE id = player_uuid;
        
        RETURN TRUE; -- Leveled up
    END IF;
    
    RETURN FALSE; -- No level up
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_game_messages_pg(
    game_uuid UUID,
    page_size INTEGER DEFAULT 50,
    page_number INTEGER DEFAULT 1
)
RETURNS TABLE(
    id UUID,
    player_id UUID,
    player_name VARCHAR,
    content TEXT,
    message_type VARCHAR,
    is_private BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        m.id,
        m.player_id,
        COALESCE(p.name, 'System') as player_name,
        m.content,
        m.message_type,
        m.is_private,
        m.created_at
    FROM messages m
    LEFT JOIN players p ON m.player_id = p.id
    WHERE m.game_id = game_uuid
    ORDER BY m.created_at DESC
    LIMIT page_size OFFSET (page_number - 1) * page_size;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_game_session_pg(game_uuid UUID, initial_scene TEXT DEFAULT '')
RETURNS UUID AS $$
DECLARE
    session_id UUID;
BEGIN
    INSERT INTO game_sessions (game_id, session_data, current_scene)
    VALUES (game_uuid, '{}', initial_scene)
    RETURNING id INTO session_id;
    
    RETURN session_id;
END;
$$ LANGUAGE plpgsql;

-- PostgreSQL specific indexes for performance
CREATE INDEX IF NOT EXISTS idx_players_class_level ON players(class, level);
CREATE INDEX IF NOT EXISTS idx_games_status_created ON games(status, created_at);
CREATE INDEX IF NOT EXISTS idx_messages_game_type ON messages(game_id, message_type);
CREATE INDEX IF NOT EXISTS idx_characters_game_class ON characters(game_id, class);

-- Note: Basic constraints already created in initial schema
-- Additional constraints would be added here if needed

-- PostgreSQL specific extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Function to generate UUID for new records
CREATE OR REPLACE FUNCTION generate_uuid()
RETURNS UUID AS $$
BEGIN
    RETURN uuid_generate_v4();
END;
$$ LANGUAGE plpgsql;
