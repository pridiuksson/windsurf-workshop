'use client'

import { useState } from 'react'
import { PlayerClass } from '@/types'

interface CharacterCreationProps {
  onComplete: (character: any) => void
}

const classes: PlayerClass[] = ['Warrior', 'Mage', 'Rogue', 'Cleric', 'Paladin', 'Ranger', 'Bard', 'Druid']

export function CharacterCreation({ onComplete }: CharacterCreationProps) {
  const [characterName, setCharacterName] = useState('')
  const [selectedClass, setSelectedClass] = useState<PlayerClass>('Warrior')
  const [background, setBackground] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (characterName && selectedClass) {
      onComplete({
        name: characterName,
        class: selectedClass,
        background
      })
    }
  }

  return (
    <div className="min-h-screen bg-fantasy-dark flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="fantasy-border bg-fantasy-dark/90 p-8">
          <h1 className="text-3xl font-bold text-fantasy-gold mb-6 text-center">
            Create Your Character
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Character Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Character Name
              </label>
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-fantasy-gold focus:outline-none"
                placeholder="Enter character name"
                required
              />
            </div>

            {/* Class Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value as PlayerClass)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-fantasy-gold focus:outline-none"
              >
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Background */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Background (Optional)
              </label>
              <textarea
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-fantasy-gold focus:outline-none h-24 resize-none"
                placeholder="Describe your character's background..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full fantasy-button"
              disabled={!characterName}
            >
              Create Character
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
