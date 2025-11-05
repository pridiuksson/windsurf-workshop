-- Initial schema for chatbot game with 4 players and dungeon master
-- Using standard SQL syntax for compatibility

-- Players table
CREATE TABLE players (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    character_name VARCHAR(100) NOT NULL,
    class VARCHAR(50) NOT NULL,
    level INTEGER DEFAULT 1,
    health INTEGER NOT NULL,
    max_health INTEGER NOT NULL,
    mana INTEGER DEFAULT 0,
    max_mana INTEGER DEFAULT 0,
    strength INTEGER NOT NULL,
    dexterity INTEGER NOT NULL,
    intelligence INTEGER NOT NULL,
    wisdom INTEGER NOT NULL,
    charisma INTEGER NOT NULL,
    experience_points INTEGER DEFAULT 0,
    gold INTEGER DEFAULT 0,
    inventory TEXT DEFAULT '[]',
    spells TEXT DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Games table
CREATE TABLE games (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'waiting' CHECK (status IN ('waiting', 'in_progress', 'completed', 'paused')),
    dungeon_master_id VARCHAR(36),
    max_players INTEGER DEFAULT 4,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dungeon_master_id) REFERENCES players(id)
);

-- Game_players junction table
CREATE TABLE game_players (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    game_id VARCHAR(36) NOT NULL,
    player_id VARCHAR(36) NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    UNIQUE(game_id, player_id)
);

-- Messages table for chat
CREATE TABLE messages (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    game_id VARCHAR(36) NOT NULL,
    player_id VARCHAR(36),
    content TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'player' CHECK (message_type IN ('player', 'dungeon_master', 'system')),
    is_private BOOLEAN DEFAULT FALSE,
    metadata TEXT DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE SET NULL
);

-- Game_sessions table for tracking game state
CREATE TABLE game_sessions (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    game_id VARCHAR(36) NOT NULL,
    session_data TEXT DEFAULT '{}',
    current_scene TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

-- Characters table (alternative to players table for more flexibility)
CREATE TABLE characters (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    player_id VARCHAR(36),
    game_id VARCHAR(36),
    name VARCHAR(100) NOT NULL,
    class VARCHAR(50) NOT NULL,
    level INTEGER DEFAULT 1,
    health INTEGER NOT NULL,
    max_health INTEGER NOT NULL,
    mana INTEGER DEFAULT 0,
    max_mana INTEGER DEFAULT 0,
    strength INTEGER NOT NULL,
    dexterity INTEGER NOT NULL,
    intelligence INTEGER NOT NULL,
    wisdom INTEGER NOT NULL,
    charisma INTEGER NOT NULL,
    experience_points INTEGER DEFAULT 0,
    gold INTEGER DEFAULT 0,
    inventory TEXT DEFAULT '[]',
    spells TEXT DEFAULT '[]',
    abilities TEXT DEFAULT '[]',
    background TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_players_name ON players(name);
CREATE INDEX idx_games_status ON games(status);
CREATE INDEX idx_messages_game_id ON messages(game_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_game_players_game_id ON game_players(game_id);
CREATE INDEX idx_game_players_player_id ON game_players(player_id);
CREATE INDEX idx_characters_player_id ON characters(player_id);
CREATE INDEX idx_characters_game_id ON characters(game_id);

-- Basic constraints for data integrity
ALTER TABLE games ADD CONSTRAINT check_max_players 
    CHECK (max_players > 0 AND max_players <= 10);

ALTER TABLE players ADD CONSTRAINT check_health_positive 
    CHECK (health > 0 AND health <= max_health);

ALTER TABLE players ADD CONSTRAINT check_mana_valid 
    CHECK (mana >= 0 AND mana <= max_mana);

ALTER TABLE players ADD CONSTRAINT check_attributes_positive 
    CHECK (strength > 0 AND dexterity > 0 AND intelligence > 0 
           AND wisdom > 0 AND charisma > 0);

-- Note: Row Level Security will be enabled in a separate migration
-- This is to ensure compatibility with different database systems
