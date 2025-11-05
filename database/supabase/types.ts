// TypeScript types for the Supabase database schema
// Updated for standard SQL compatibility

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
  inventory: string; // JSON string in standard SQL, can be parsed in application
  spells: string; // JSON string in standard SQL, can be parsed in application
  created_at: string;
  updated_at: string;
}

export interface Game {
  id: string;
  name: string;
  description?: string;
  status: 'waiting' | 'in_progress' | 'completed' | 'paused';
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
  message_type: 'player' | 'dungeon_master' | 'system';
  is_private: boolean;
  metadata: string; // JSON string in standard SQL, can be parsed in application
  created_at: string;
}

export interface GameSession {
  id: string;
  game_id: string;
  session_data: string; // JSON string in standard SQL, can be parsed in application
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
  class: Player['class'];
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
  inventory: string; // JSON string in standard SQL, can be parsed in application
  spells: string; // JSON string in standard SQL, can be parsed in application
  abilities: string; // JSON string in standard SQL, can be parsed in application
  background?: string;
  created_at: string;
  updated_at: string;
}

// Parsed versions of JSON fields for application use
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

export interface CreateGameData {
  name: string;
  description?: string;
  max_players?: number;
}

export interface CreatePlayerData {
  name: string;
  character_name: string;
  class: Player['class'];
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

// Database function types (standard SQL versions)
export interface DatabaseFunctions {
  is_game_full: (game_uuid: string) => Promise<boolean>;
  get_player_stats: (player_uuid: string) => Promise<PlayerStats>;
  add_experience: (player_uuid: string, exp_amount: number) => Promise<boolean>;
  get_game_messages: (game_uuid: string, page_size?: number, page_number?: number) => Promise<Message[]>;
  create_game_session: (game_uuid: string, initial_scene?: string) => Promise<string>;
}

// PostgreSQL-specific function types (for when using PostgreSQL/Supabase)
export interface PostgreSQLFunctions {
  is_game_full_pg: (game_uuid: string) => Promise<boolean>;
  get_player_stats_pg: (player_uuid: string) => Promise<PlayerStats>;
  add_experience_pg: (player_uuid: string, exp_amount: number) => Promise<boolean>;
  get_game_messages_pg: (game_uuid: string, page_size?: number, page_number?: number) => Promise<Message[]>;
  create_game_session_pg: (game_uuid: string, initial_scene?: string) => Promise<string>;
}

// Realtime subscription types
export interface RealtimePayload<T = any> {
  schema: string;
  table: string;
  commit_timestamp: string;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  old: Partial<T>;
  new: T;
}

export interface RealtimeEventTypes {
  messages: RealtimePayload<Message>;
  games: RealtimePayload<Game>;
  game_players: RealtimePayload<GamePlayer>;
  game_sessions: RealtimePayload<GameSession>;
  characters: RealtimePayload<Character>;
}

// Helper functions for parsing JSON strings
export function parseInventory(inventoryString: string): InventoryItem[] {
  try {
    return JSON.parse(inventoryString);
  } catch {
    return [];
  }
}

export function parseSpells(spellsString: string): Spell[] {
  try {
    return JSON.parse(spellsString);
  } catch {
    return [];
  }
}

export function parseAbilities(abilitiesString: string): Ability[] {
  try {
    return JSON.parse(abilitiesString);
  } catch {
    return [];
  }
}

export function parseSessionData(sessionDataString: string): Record<string, any> {
  try {
    return JSON.parse(sessionDataString);
  } catch {
    return {};
  }
}

export function parseMetadata(metadataString: string): Record<string, any> {
  try {
    return JSON.parse(metadataString);
  } catch {
    return {};
  }
}

// Helper functions for stringifying JSON
export function stringifyInventory(inventory: InventoryItem[]): string {
  return JSON.stringify(inventory);
}

export function stringifySpells(spells: Spell[]): string {
  return JSON.stringify(spells);
}

export function stringifyAbilities(abilities: Ability[]): string {
  return JSON.stringify(abilities);
}

export function stringifySessionData(sessionData: Record<string, any>): string {
  return JSON.stringify(sessionData);
}

export function stringifyMetadata(metadata: Record<string, any>): string {
  return JSON.stringify(metadata);
}
