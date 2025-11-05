-- Standard SQL views for the chatbot game

-- View for game summary with player counts
CREATE VIEW game_summary AS
SELECT 
    g.id,
    g.name,
    g.status,
    g.created_at,
    COUNT(gp.player_id) as player_count,
    g.max_players,
    p.name as dungeon_master_name
FROM games g
LEFT JOIN game_players gp ON g.id = gp.game_id
LEFT JOIN players p ON g.dungeon_master_id = p.id
GROUP BY g.id, g.name, g.status, g.created_at, g.max_players, p.name;

-- View for player characters with game info
CREATE VIEW player_characters AS
SELECT 
    p.id as player_id,
    p.name as player_name,
    c.id as character_id,
    c.name as character_name,
    c.class,
    c.level,
    g.name as game_name,
    g.id as game_id
FROM players p
LEFT JOIN characters c ON p.id = c.player_id
LEFT JOIN games g ON c.game_id = g.id
WHERE c.id IS NOT NULL;

-- View for active games with current player counts
CREATE VIEW active_games AS
SELECT 
    g.*,
    COUNT(gp.player_id) as current_players
FROM games g
LEFT JOIN game_players gp ON g.id = gp.game_id
WHERE g.status = 'in_progress'
GROUP BY g.id, g.name, g.description, g.status, g.dungeon_master_id, g.max_players, g.created_at, g.updated_at;

-- View for game messages with player details
CREATE VIEW game_messages AS
SELECT 
    m.*,
    p.name as player_name,
    p.character_name
FROM messages m
LEFT JOIN players p ON m.player_id = p.id
ORDER BY m.created_at DESC;

-- Additional indexes for performance
CREATE INDEX idx_players_class ON players(class);
CREATE INDEX idx_games_status_created ON games(status, created_at);
CREATE INDEX idx_messages_game_type ON messages(game_id, message_type);
CREATE INDEX idx_characters_game_class ON characters(game_id, class);
CREATE INDEX idx_game_sessions_active ON game_sessions(is_active);

-- Note: For production use, consider:
-- 1. Implementing business logic in application layer
-- 2. Using database-specific stored procedures for performance
-- 3. Adding proper error handling and validation
-- 4. Implementing audit logging for game changes
