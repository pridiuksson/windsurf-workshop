// Game types based on the database schema
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
  inventory: string;
  spells: string;
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
  metadata: string;
  created_at: string;
  player_name?: string;
  character_name?: string;
}

export interface GameSlot {
  slotNumber: number;
  player?: Player;
  isOccupied: boolean;
}
