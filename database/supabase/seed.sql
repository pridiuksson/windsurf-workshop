-- Seed data for the chatbot game
-- Using standard SQL syntax for compatibility

-- Insert sample players
INSERT INTO players (id, name, character_name, class, level, health, max_health, mana, max_mana, strength, dexterity, intelligence, wisdom, charisma, experience_points, gold) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Player1', 'Aldric Stormblade', 'Warrior', 1, 100, 100, 0, 0, 16, 12, 10, 12, 14, 0, 50),
('550e8400-e29b-41d4-a716-446655440002', 'Player2', 'Lyra Moonwhisper', 'Mage', 1, 60, 60, 40, 40, 8, 12, 18, 16, 12, 0, 30),
('550e8400-e29b-41d4-a716-446655440003', 'Player3', 'Thorn Shadowstep', 'Rogue', 1, 80, 80, 20, 20, 12, 18, 14, 10, 16, 0, 40),
('550e8400-e29b-41d4-a716-446655440004', 'Player4', 'Elara Lightbringer', 'Cleric', 1, 70, 70, 30, 30, 10, 12, 14, 18, 16, 0, 35);

-- Insert a sample game
INSERT INTO games (id, name, description, status, dungeon_master_id, max_players) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'The Lost Dungeon of Shadowmere', 'A mysterious dungeon has appeared near the village of Oakhaven. Brave adventurers are needed to uncover its secrets and face the dangers within.', 'waiting', '550e8400-e29b-41d4-a716-446655440001', 4);

-- Insert game players (all players join the game)
INSERT INTO game_players (id, game_id, player_id) VALUES
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440003'),
('550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440004');

-- Insert sample messages
INSERT INTO messages (id, game_id, player_id, content, message_type) VALUES
('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440001', 'Welcome, brave adventurers! I am your dungeon master. Are you ready to begin your journey into the Lost Dungeon of Shadowmere?', 'dungeon_master'),
('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'As a mage, I am prepared for any magical challenges that await us!', 'player'),
('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440003', 'My blades are sharp and my senses are heightened. Let us proceed with caution.', 'player'),
('550e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440004', 'The divine light guides my path. I will heal and protect our group.', 'player');

-- Create a game session
INSERT INTO game_sessions (id, game_id, session_data, current_scene) VALUES
('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440010', '{"turn": 1, "current_player": "Player2", "game_state": "exploration"}', 'You stand before the ancient stone entrance of the Lost Dungeon of Shadowmere. Massive wooden doors covered in mysterious runes block your path. The air grows cold as you approach, and you can hear faint whispers coming from within. What do you do?');

-- Insert character data for each player in the game
INSERT INTO characters (id, player_id, game_id, name, class, level, health, max_health, mana, max_mana, strength, dexterity, intelligence, wisdom, charisma, experience_points, gold, background) VALUES
('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440010', 'Aldric Stormblade', 'Warrior', 1, 100, 100, 0, 0, 16, 12, 10, 12, 14, 0, 50, 'A former soldier from the northern kingdoms, seeking glory and fortune.'),
('550e8400-e29b-41d4-a716-446655440042', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440010', 'Lyra Moonwhisper', 'Mage', 1, 60, 60, 40, 40, 8, 12, 18, 16, 12, 0, 30, 'A scholar from the Royal Academy, hungry for arcane knowledge.'),
('550e8400-e29b-41d4-a716-446655440043', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440010', 'Thorn Shadowstep', 'Rogue', 1, 80, 80, 20, 20, 12, 18, 14, 10, 16, 0, 40, 'A street-smart survivor with a mysterious past.'),
('550e8400-e29b-41d4-a716-446655440044', '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440010', 'Elara Lightbringer', 'Cleric', 1, 70, 70, 30, 30, 10, 12, 14, 18, 16, 0, 35, 'A devoted servant of the Light, on a holy mission.');
