// Shared utility functions for D&D Chat Game

import { InventoryItem, Spell, Ability, GameState, PlayerClass } from '../types';

// JSON parsing helpers
export function parseInventory(inventoryString: string): InventoryItem[] {
  try {
    return JSON.parse(inventoryString);
  } catch {
    return [];
  }
}

export function stringifyInventory(inventory: InventoryItem[]): string {
  return JSON.stringify(inventory);
}

export function parseSpells(spellsString: string): Spell[] {
  try {
    return JSON.parse(spellsString);
  } catch {
    return [];
  }
}

export function stringifySpells(spells: Spell[]): string {
  return JSON.stringify(spells);
}

export function parseAbilities(abilitiesString: string): Ability[] {
  try {
    return JSON.parse(abilitiesString);
  } catch {
    return [];
  }
}

export function stringifyAbilities(abilities: Ability[]): string {
  return JSON.stringify(abilities);
}

export function parseGameState(sessionDataString: string): GameState {
  try {
    return JSON.parse(sessionDataString);
  } catch {
    return {
      scene: '',
      npcs: [],
      enemies: [],
      environment: {
        name: '',
        description: '',
        lighting: 'bright',
        terrain: '',
        obstacles: []
      },
      turn_order: [],
      current_turn: '',
      round_number: 1
    };
  }
}

export function stringifyGameState(gameState: GameState): string {
  return JSON.stringify(gameState);
}

// Game mechanics helpers
export function getExpForNextLevel(currentLevel: number): number {
  return currentLevel * 1000;
}

export function getTotalExpForLevel(level: number): number {
  return (level - 1) * 1000;
}

export function canLevelUp(currentExp: number, currentLevel: number): boolean {
  return currentExp >= (currentLevel * 1000);
}

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

export function getClassDefaults(characterClass: PlayerClass) {
  const classDefaults = {
    Warrior: { health: 100, mana: 0, strength: 16, dexterity: 12, intelligence: 10, wisdom: 12, charisma: 14 },
    Mage: { health: 60, mana: 40, strength: 8, dexterity: 12, intelligence: 18, wisdom: 16, charisma: 12 },
    Rogue: { health: 80, mana: 20, strength: 12, dexterity: 18, intelligence: 14, wisdom: 10, charisma: 16 },
    Cleric: { health: 70, mana: 30, strength: 10, dexterity: 12, intelligence: 14, wisdom: 18, charisma: 16 },
    Paladin: { health: 90, mana: 15, strength: 14, dexterity: 10, intelligence: 12, wisdom: 16, charisma: 18 },
    Ranger: { health: 85, mana: 25, strength: 12, dexterity: 16, intelligence: 14, wisdom: 14, charisma: 12 },
    Bard: { health: 65, mana: 35, strength: 10, dexterity: 14, intelligence: 14, wisdom: 12, charisma: 18 },
    Druid: { health: 75, mana: 30, strength: 10, dexterity: 14, intelligence: 14, wisdom: 18, charisma: 12 }
  };
  
  return classDefaults[characterClass] || classDefaults.Warrior;
}

export function validatePlayerHealth(health: number, maxHealth: number): number {
  return Math.min(Math.max(0, health), maxHealth);
}

export function validatePlayerMana(mana: number, maxMana: number): number {
  return Math.min(Math.max(0, mana), maxMana);
}

// Combat helpers
export function rollDice(sides: number = 20, count: number = 1): number {
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }
  return total;
}

export function rollD20(modifier: number = 0): number {
  return rollDice(20) + modifier;
}

export function calculateDamage(damageDice: string, modifier: number = 0): number {
  // Parse damage dice like "2d6+3" or "1d8"
  const match = damageDice.match(/(\d+)d(\d+)(?:\+(\d+))?/);
  if (!match) return modifier;
  
  const [, count, sides, bonus] = match;
  const diceDamage = rollDice(parseInt(sides), parseInt(count));
  const totalBonus = modifier + (bonus ? parseInt(bonus) : 0);
  
  return diceDamage + totalBonus;
}

export function calculateArmorClass(armor: number, dexterity: number): number {
  return 10 + armor + Math.floor((dexterity - 10) / 2);
}

// Time helpers
export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
}

export function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
}

// Validation helpers
export function isValidPlayerClass(value: string): value is PlayerClass {
  const validClasses: PlayerClass[] = ['Warrior', 'Mage', 'Rogue', 'Cleric', 'Paladin', 'Ranger', 'Bard', 'Druid'];
  return validClasses.includes(value as PlayerClass);
}

export function validateCharacterName(name: string): boolean {
  return name.length >= 2 && name.length <= 50 && /^[a-zA-Z\s'-]+$/.test(name);
}

export function validateMessageContent(content: string): boolean {
  return content.length > 0 && content.length <= 1000;
}

// Utility helpers
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Array helpers
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRandomElement<T>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)];
}

// String helpers
export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
