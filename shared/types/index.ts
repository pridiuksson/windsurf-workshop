// Shared types for D&D Chat Game
// Used across frontend, backend, and AI services

export interface Player {
  id: string;
  name: string;
  character_name: string;
  class: 'Warrior' | 'Mage' | 'Rogue' | 'Cleric' | 'Paladin' | 'Ranger' | 'Bard' | 'Druid';
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

export interface Message {
  id: string;
  game_id: string;
  player_id?: string;
  content: string;
  message_type: 'player' | 'dungeon_master' | 'system';
  is_private: boolean;
  metadata: string; // JSON string
  created_at: string;
  player_name?: string;
  character_name?: string;
}

export interface GameSlot {
  slotNumber: number;
  player?: Player | null;
  isOccupied: boolean;
}

export interface Game {
  id: string;
  name: string;
  description?: string;
  max_players: number;
  status: 'waiting' | 'active' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface GamePlayer {
  id: string;
  game_id: string;
  player_id: string;
  joined_at: string;
}

export interface GameState {
  scene: string;
  npcs: NPC[];
  enemies: Enemy[];
  environment: Environment;
  turn_order: TurnOrder[];
  current_turn: string;
  round_number: number;
}

export interface Character extends Player {
  background?: string;
  abilities: string[]; // JSON string
  equipment: string[]; // JSON string
}

export interface GameSession {
  id: string;
  game_id: string;
  session_data: string; // JSON string of GameState
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
  items: any[]; // JSON array
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

export type PlayerClass = 'Warrior' | 'Mage' | 'Rogue' | 'Cleric' | 'Paladin' | 'Ranger' | 'Bard' | 'Druid';
export type MessageType = 'player' | 'dungeon_master' | 'system';
export type GameStatus = 'waiting' | 'active' | 'completed';
export type NPCAttitude = 'friendly' | 'neutral' | 'hostile';
export type AttackType = 'melee' | 'ranged' | 'magic';
export type EnvironmentLighting = 'bright' | 'dim' | 'dark';

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
  player_data: CreatePlayerData;
}

export interface SendMessageData {
  game_id: string;
  content: string;
  is_private?: boolean;
  target_player_id?: string;
}

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

export interface MessageEvent {
  type: 'message';
  data: Message;
  game_id: string;
}

export interface GameStateUpdateEvent {
  type: 'game_state_update';
  data: GameState;
  game_id: string;
}

export interface PlayerEvent {
  type: 'player_join' | 'player_leave';
  data: GamePlayer | { player_id: string };
  game_id: string;
}

export interface GameError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface ApiResponse<T> {
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
