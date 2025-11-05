-- Row Level Security policies for PostgreSQL/Supabase
-- Note: These are PostgreSQL-specific RLS policies

-- Enable RLS on all tables
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;

-- Players policies - Users can only access their own data
CREATE POLICY "Users can view their own players" ON players
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own players" ON players
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own players" ON players
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete their own players" ON players
    FOR DELETE USING (auth.uid() = id);

-- Games policies - Users can view games they participate in or DM
CREATE POLICY "Users can view games they participate in" ON games
    FOR SELECT USING (
        dungeon_master_id = auth.uid() OR
        id IN (SELECT game_id FROM game_players WHERE player_id = auth.uid())
    );

CREATE POLICY "Users can create games" ON games
    FOR INSERT WITH CHECK (dungeon_master_id = auth.uid());

CREATE POLICY "Dungeon masters can update their games" ON games
    FOR UPDATE USING (dungeon_master_id = auth.uid());

CREATE POLICY "Dungeon masters can delete their games" ON games
    FOR DELETE USING (dungeon_master_id = auth.uid());

-- Game_players policies
CREATE POLICY "Users can view game memberships for their games" ON game_players
    FOR SELECT USING (
        player_id = auth.uid() OR
        game_id IN (SELECT id FROM games WHERE dungeon_master_id = auth.uid())
    );

CREATE POLICY "Players can join games" ON game_players
    FOR INSERT WITH CHECK (player_id = auth.uid());

CREATE POLICY "Players can leave games" ON game_players
    FOR DELETE USING (player_id = auth.uid());

-- Messages policies
CREATE POLICY "Users can view messages from their games" ON messages
    FOR SELECT USING (
        game_id IN (SELECT id FROM games WHERE 
            dungeon_master_id = auth.uid() OR
            id IN (SELECT game_id FROM game_players WHERE player_id = auth.uid())
        )
    );

CREATE POLICY "Game participants can send messages" ON messages
    FOR INSERT WITH CHECK (
        player_id = auth.uid() AND
        game_id IN (SELECT id FROM games WHERE 
            dungeon_master_id = auth.uid() OR
            id IN (SELECT game_id FROM game_players WHERE player_id = auth.uid())
        )
    );

-- Game_sessions policies
CREATE POLICY "Users can view sessions from their games" ON game_sessions
    FOR SELECT USING (
        game_id IN (SELECT id FROM games WHERE 
            dungeon_master_id = auth.uid() OR
            id IN (SELECT game_id FROM game_players WHERE player_id = auth.uid())
        )
    );

CREATE POLICY "Dungeon masters can manage sessions" ON game_sessions
    FOR ALL USING (
        game_id IN (SELECT id FROM games WHERE dungeon_master_id = auth.uid())
    );

-- Characters policies
CREATE POLICY "Users can view their characters" ON characters
    FOR SELECT USING (
        player_id = auth.uid() OR
        game_id IN (SELECT id FROM games WHERE dungeon_master_id = auth.uid())
    );

CREATE POLICY "Players can create their characters" ON characters
    FOR INSERT WITH CHECK (player_id = auth.uid());

CREATE POLICY "Players can update their characters" ON characters
    FOR UPDATE USING (player_id = auth.uid());

CREATE POLICY "Players can delete their characters" ON characters
    FOR DELETE USING (player_id = auth.uid());
