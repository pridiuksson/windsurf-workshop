// Application layer database functions for the chatbot game
// These functions replace the database stored procedures for better compatibility

import { Player, Game, Message, Character, GameSession, InventoryItem, Spell, Ability } from './supabase/types';

// Helper function to check if a game is full
export async function isGameFull(gameId: string, db: any): Promise<boolean> {
  const { data, error } = await db
    .from('games')
    .select(`
      max_players,
      game_players(count)
    `)
    .eq('id', gameId)
    .single();
  
  if (error) throw error;
  
  const currentPlayers = data.game_players?.length || 0;
  return currentPlayers >= data.max_players;
}

// Helper function to get player stats
export async function getPlayerStats(playerId: string, db: any): Promise<Player> {
  const { data, error } = await db
    .from('players')
    .select('*')
    .eq('id', playerId)
    .single();
  
  if (error) throw error;
  return data;
}

// Helper function to add experience and handle level ups
export async function addExperience(playerId: string, expAmount: number, db: any): Promise<{ leveledUp: boolean; newLevel?: number }> {
  // Get current player stats
  const { data: player, error: fetchError } = await db
    .from('players')
    .select('*')
    .eq('id', playerId)
    .single();
  
  if (fetchError) throw fetchError;
  
  const currentExp = player.experience_points;
  const currentLevel = player.level;
  
  // Calculate new level
  let newLevel = currentLevel;
  while (currentExp + expAmount >= (newLevel * 1000)) {
    newLevel++;
  }
  
  const leveledUp = newLevel > currentLevel;
  
  // Update player with new experience and level
  const updateData: any = {
    experience_points: currentExp + expAmount,
    level: newLevel
  };
  
  // If leveled up, update stats
  if (leveledUp) {
    const levelDiff = newLevel - currentLevel;
    updateData.max_health = player.max_health + (levelDiff * 10);
    updateData.health = player.health + (levelDiff * 10);
    updateData.max_mana = player.max_mana + (levelDiff * 5);
    updateData.mana = player.mana + (levelDiff * 5);
    updateData.strength = player.strength + (levelDiff * 2);
    updateData.dexterity = player.dexterity + (levelDiff * 2);
    updateData.intelligence = player.intelligence + (levelDiff * 2);
    updateData.wisdom = player.wisdom + (levelDiff * 2);
    updateData.charisma = player.charisma + (levelDiff * 2);
  }
  
  const { error: updateError } = await db
    .from('players')
    .update(updateData)
    .eq('id', playerId);
  
  if (updateError) throw updateError;
  
  return { leveledUp, newLevel: leveledUp ? newLevel : undefined };
}

// Helper function to get game messages with pagination
export async function getGameMessages(
  gameId: string, 
  pageSize: number = 50, 
  pageNumber: number = 1, 
  db: any
): Promise<Message[]> {
  const offset = (pageNumber - 1) * pageSize;
  
  const { data, error } = await db
    .from('messages')
    .select(`
      *,
      players(name, character_name)
    `)
    .eq('game_id', gameId)
    .order('created_at', { ascending: false })
    .range(offset, offset + pageSize - 1);
  
  if (error) throw error;
  
  // Flatten the player data
  return data.map((message: any) => ({
    ...message,
    player_name: message.players?.name || 'System',
    character_name: message.players?.character_name || null
  }));
}

// Helper function to create a new game session
export async function createGameSession(gameId: string, initialScene: string = '', db: any): Promise<string> {
  const sessionData = {
    game_id: gameId,
    session_data: JSON.stringify({}),
    current_scene: initialScene
  };
  
  const { data, error } = await db
    .from('game_sessions')
    .insert(sessionData)
    .select('id')
    .single();
  
  if (error) throw error;
  return data.id;
}

// Helper function to parse inventory from JSON string
export function parseInventory(inventoryString: string): InventoryItem[] {
  try {
    return JSON.parse(inventoryString);
  } catch {
    return [];
  }
}

// Helper function to stringify inventory for storage
export function stringifyInventory(inventory: InventoryItem[]): string {
  return JSON.stringify(inventory);
}

// Helper function to parse spells from JSON string
export function parseSpells(spellsString: string): Spell[] {
  try {
    return JSON.parse(spellsString);
  } catch {
    return [];
  }
}

// Helper function to stringify spells for storage
export function stringifySpells(spells: Spell[]): string {
  return JSON.stringify(spells);
}

// Helper function to parse abilities from JSON string
export function parseAbilities(abilitiesString: string): Ability[] {
  try {
    return JSON.parse(abilitiesString);
  } catch {
    return [];
  }
}

// Helper function to stringify abilities for storage
export function stringifyAbilities(abilities: Ability[]): string {
  return JSON.stringify(abilities);
}

// Helper function to parse session data from JSON string
export function parseSessionData(sessionDataString: string): Record<string, any> {
  try {
    return JSON.parse(sessionDataString);
  } catch {
    return {};
  }
}

// Helper function to stringify session data for storage
export function stringifySessionData(sessionData: Record<string, any>): string {
  return JSON.stringify(sessionData);
}

// Helper function to validate player health
export function validatePlayerHealth(health: number, maxHealth: number): number {
  return Math.min(Math.max(0, health), maxHealth);
}

// Helper function to validate player mana
export function validatePlayerMana(mana: number, maxMana: number): number {
  return Math.min(Math.max(0, mana), maxMana);
}

// Helper function to calculate experience needed for next level
export function getExpForNextLevel(currentLevel: number): number {
  return currentLevel * 1000;
}

// Helper function to get total experience for a given level
export function getTotalExpForLevel(level: number): number {
  return (level - 1) * 1000;
}

// Helper function to check if player can level up
export function canLevelUp(currentExp: number, currentLevel: number): boolean {
  return currentExp >= (currentLevel * 1000);
}

// Helper function to get stat increases for level up
export function getLevelUpStats(levelDiff: number = 1) {
  return {
    health: levelDiff * 10,
    max_health: levelDiff * 10,
    mana: levelDiff * 5,
    max_mana: levelDiff * 5,
    strength: levelDiff * 2,
    dexterity: levelDiff * 2,
    intelligence: levelDiff * 2,
    wisdom: levelDiff * 2,
    charisma: levelDiff * 2
  };
}

// Helper function to create a new character with default stats
export function createNewCharacter(
  name: string,
  characterClass: string,
  playerId: string,
  gameId: string
): Omit<Character, 'id' | 'created_at' | 'updated_at'> {
  const classDefaults = {
    Warrior: { health: 100, mana: 0, strength: 16, dexterity: 12, intelligence: 10, wisdom: 12, charisma: 14 },
    Mage: { health: 60, mana: 40, strength: 8, dexterity: 12, intelligence: 18, wisdom: 16, charisma: 12 },
    Rogue: { health: 80, mana: 20, strength: 12, dexterity: 18, intelligence: 14, wisdom: 10, charisma: 16 },
    Cleric: { health: 70, mana: 30, strength: 10, dexterity: 12, intelligence: 14, wisdom: 18, charisma: 16 }
  };
  
  const defaults = classDefaults[characterClass as keyof typeof classDefaults] || classDefaults.Warrior;
  
  return {
    player_id: playerId,
    game_id: gameId,
    name,
    class: characterClass as any,
    level: 1,
    health: defaults.health,
    max_health: defaults.health,
    mana: defaults.mana,
    max_mana: defaults.mana,
    strength: defaults.strength,
    dexterity: defaults.dexterity,
    intelligence: defaults.intelligence,
    wisdom: defaults.wisdom,
    charisma: defaults.charisma,
    experience_points: 0,
    gold: 50,
    inventory: stringifyInventory([]),
    spells: stringifySpells([]),
    abilities: stringifyAbilities([]),
    background: ''
  };
}
