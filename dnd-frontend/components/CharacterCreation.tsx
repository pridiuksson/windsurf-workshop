"use client";

import { useState } from "react";
import { X, Sword, Wand2, Eye, Heart } from "lucide-react";
import { Player } from "@/types/game";
import { cn } from "@/lib/utils";

interface CharacterCreationProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCharacter: (character: Omit<Player, 'id' | 'created_at' | 'updated_at'>) => void;
  deviceId: string;
}

const characterClasses = [
  { 
    name: 'Warrior', 
    icon: Sword, 
    color: 'text-red-500',
    description: 'Strong and brave fighter',
    stats: { health: 100, mana: 0, strength: 16, dexterity: 12, intelligence: 10, wisdom: 12, charisma: 14 }
  },
  { 
    name: 'Mage', 
    icon: Wand2, 
    color: 'text-blue-500',
    description: 'Powerful spellcaster',
    stats: { health: 60, mana: 40, strength: 8, dexterity: 12, intelligence: 18, wisdom: 16, charisma: 12 }
  },
  { 
    name: 'Rogue', 
    icon: Eye, 
    color: 'text-green-500',
    description: 'Stealthy and agile',
    stats: { health: 80, mana: 20, strength: 12, dexterity: 18, intelligence: 14, wisdom: 10, charisma: 16 }
  },
  { 
    name: 'Cleric', 
    icon: Heart, 
    color: 'text-yellow-500',
    description: 'Divine healer',
    stats: { health: 70, mana: 30, strength: 10, dexterity: 12, intelligence: 14, wisdom: 18, charisma: 16 }
  }
];

export default function CharacterCreation({ isOpen, onClose, onCreateCharacter, deviceId }: CharacterCreationProps) {
  const [characterName, setCharacterName] = useState("");
  const [selectedClass, setSelectedClass] = useState<Player['class']>('Warrior');

  if (!isOpen) return null;

  const handleCreate = () => {
    if (!characterName.trim()) {
      alert("Please enter a character name!");
      return;
    }

    const classData = characterClasses.find(c => c.name === selectedClass)!;
    
    const newCharacter: Omit<Player, 'id' | 'created_at' | 'updated_at'> = {
      device_id: deviceId,
      name: characterName,
      character_name: characterName,
      class: selectedClass,
      level: 1,
      health: classData.stats.health,
      max_health: classData.stats.health,
      mana: classData.stats.mana,
      max_mana: classData.stats.mana,
      strength: classData.stats.strength,
      dexterity: classData.stats.dexterity,
      intelligence: classData.stats.intelligence,
      wisdom: classData.stats.wisdom,
      charisma: classData.stats.charisma,
      experience_points: 0,
      gold: 50,
      inventory: "[]",
      spells: "[]",
      last_active: new Date().toISOString(),
      is_online: true
    };

    onCreateCharacter(newCharacter);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Create Character</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Character Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Character Name
            </label>
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="Enter your character name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder:text-gray-500"
              maxLength={20}
            />
          </div>

          {/* Class Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose Your Class
            </label>
            <div className="grid grid-cols-2 gap-3">
              {characterClasses.map((characterClass) => {
                const Icon = characterClass.icon;
                return (
                  <button
                    key={characterClass.name}
                    onClick={() => setSelectedClass(characterClass.name as Player['class'])}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all text-left",
                      selectedClass === characterClass.name
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={cn("w-5 h-5", characterClass.color)} />
                      <span className="font-semibold text-gray-800">{characterClass.name}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{characterClass.description}</p>
                    <div className="text-xs text-gray-500">
                      <div>HP: {characterClass.stats.health} | Mana: {characterClass.stats.mana}</div>
                      <div>STR: {characterClass.stats.strength} | DEX: {characterClass.stats.dexterity}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Class Preview */}
          {selectedClass && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Class Preview: {selectedClass}</h3>
              <div className="grid grid-cols-3 gap-2 text-sm">
                {Object.entries(characterClasses.find(c => c.name === selectedClass)!.stats).map(([stat, value]) => (
                  <div key={stat} className="text-center">
                    <div className="text-gray-500 capitalize">{stat}</div>
                    <div className="font-bold text-gray-800">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Create Character
          </button>
        </div>
      </div>
    </div>
  );
}
