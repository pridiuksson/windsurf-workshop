// Shared types for D&D Chat Game
// Used across frontend, backend, and AI services

export interface Player {
  id: string;
  name: string;
  character_name: string;
  class: PlayerClass;
  level: number;
  health: number;
  max_health: number;
  mana: number;
  max_mana: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  experience_points: number;
  gold: number;
  inventory: string; // JSON string
  spells: string; // JSON string
  created_at: string;
  updated_at: string;
}

export interface Game {
  id: string;
  name: string;
  description?: string;
  status: GameStatus;
  dungeon_master_id?: string;
  max_players: number;
  created_at: string;
  updated_at: string;
}

export interface GamePlayer {
  id: string;
  game_id: string;
  player_id: string;
  joined_at: string;
}

export interface Message {
  id: string;
  game_id: string;
  player_id?: string;
  content: string;
  message_type: MessageType;
  is_private: boolean;
  metadata: string; // JSON string
  created_at: string;
}

export interface GameSession {
  id: string;
  game_id: string;
  session_data: string; // JSON string
  current_scene?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Character {
  id: string;
  player_id?: string;
  game_id?: string;
  name: string;
  class: PlayerClass;
  level: number;
  health: number;
  max_health: number;
  mana: number;
  max_mana: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  experience_points: number;
  gold: number;
  inventory: string; // JSON string
  spells: string; // JSON string
  abilities: string; // JSON string
  background?: string;
  created_at: string;
  updated_at: string;
}

// Enums
export type PlayerClass = 'Warrior' | 'Mage' | 'Rogue' | 'Cleric' | 'Paladin' | 'Ranger' | 'Bard' | 'Druid';
export type GameStatus = 'waiting' | 'in_progress' | 'completed' | 'paused';
export type MessageType = 'player' | 'dungeon_master' | 'system';

// Parsed JSON types
export interface InventoryItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'consumable' | 'misc';
  value: number;
  quantity: number;
  properties?: Record<string, any>;
}

export interface Spell {
  id: string;
  name: string;
  level: number;
  mana_cost: number;
  description: string;
  damage?: number;
  healing?: number;
  effects?: string[];
}

export interface Ability {
  id: string;
  name: string;
  description: string;
  cooldown?: number;
  last_used?: string;
}

// Game State Types
export interface GameState {
  scene: string;
  npcs: NPC[];
  enemies: Enemy[];
  environment: Environment;
  turn_order: TurnOrder[];
  current_turn: string;
  round_number: number;
}

export interface NPC {
  id: string;
  name: string;
  description: string;
  dialogue: string[];
  location: string;
  attitude: 'friendly' | 'neutral' | 'hostile';
}

export interface Enemy {
  id: string;
  name: string;
  type: string;
  health: number;
  max_health: number;
  armor_class: number;
  attacks: Attack[];
  loot: LootTable;
}

export interface Attack {
  name: string;
  damage: string;
  type: 'melee' | 'ranged' | 'magic';
  bonus: number;
}

export interface LootTable {
  gold: { min: number; max: number };
  items: InventoryItem[];
  experience: number;
}

export interface Environment {
  name: string;
  description: string;
  lighting: 'bright' | 'dim' | 'dark';
  terrain: string;
  weather?: string;
  obstacles: string[];
}

export interface TurnOrder {
  player_id: string;
  initiative: number;
  name: string;
}

// API Request/Response Types
export interface CreateGameData {
  name: string;
  description?: string;
  max_players?: number;
}

export interface CreatePlayerData {
  name: string;
  character_name: string;
  class: PlayerClass;
}

export interface JoinGameData {
  game_id: string;
  character_name?: string;
}

export interface SendMessageData {
  game_id: string;
  content: string;
  is_private?: boolean;
  target_player_id?: string;
}

export interface UpdateCharacterData {
  health?: number;
  mana?: number;
  experience_points?: number;
  gold?: number;
  inventory?: InventoryItem[];
  spells?: Spell[];
}

// AI Dungeon Master Types
export interface DMRequest {
  action: 'generate_scene' | 'process_action' | 'create_npc' | 'generate_combat' | 'respond_to_player';
  game_state: GameState;
  player_action?: string;
  player_id?: string;
  context?: Record<string, any>;
}

export interface DMResponse {
  content: string;
  type: 'narrative' | 'dialogue' | 'combat' | 'system';
  game_state_updates?: Partial<GameState>;
  npc_responses?: Record<string, string>;
  sound_effects?: string[];
  visual_effects?: string[];
}

// Real-time Event Types
export interface RealtimeEvent<T = any> {
  type: 'message' | 'player_join' | 'player_leave' | 'game_state_update' | 'character_update';
  data: T;
  game_id: string;
  timestamp: string;
}

export interface MessageEvent extends RealtimeEvent<Message> {
  type: 'message';
}

export interface PlayerJoinEvent extends RealtimeEvent<GamePlayer> {
  type: 'player_join';
}

export interface PlayerLeaveEvent extends RealtimeEvent<{ player_id: string }> {
  type: 'player_leave';
}

export interface GameStateUpdateEvent extends RealtimeEvent<GameState> {
  type: 'game_state_update';
}

export interface CharacterUpdateEvent extends RealtimeEvent<Character> {
  type: 'character_update';
}

// Utility Types
export interface GameStats {
  total_games: number;
  completed_games: number;
  total_players: number;
  active_games: number;
}

export interface PlayerStats {
  games_played: number;
  games_completed: number;
  total_experience: number;
  highest_level: number;
  total_gold: number;
}

// Error Types
export interface GameError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export type ApiResponse<T> = {
  data?: T;
  error?: GameError;
  success: boolean;
};

// Supabase Database type (for TypeScript)
export interface Database {
  public: {
    Tables: {
      players: {
        Row: Player;
        Insert: Omit<Player, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Player, 'id' | 'created_at' | 'updated_at'>>;
      };
      games: {
        Row: Game;
        Insert: Omit<Game, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Game, 'id' | 'created_at' | 'updated_at'>>;
      };
      game_players: {
        Row: GamePlayer;
        Insert: Omit<GamePlayer, 'id' | 'joined_at'>;
        Update: Partial<Omit<GamePlayer, 'id' | 'joined_at'>>;
      };
      messages: {
        Row: Message;
        Insert: Omit<Message, 'id' | 'created_at'>;
        Update: Partial<Omit<Message, 'id' | 'created_at'>>;
      };
      game_sessions: {
        Row: GameSession;
        Insert: Omit<GameSession, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<GameSession, 'id' | 'created_at' | 'updated_at'>>;
      };
      characters: {
        Row: Character;
        Insert: Omit<Character, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Character, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}
