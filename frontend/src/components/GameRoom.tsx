'use client'

import { useState } from 'react'

interface GameRoomProps {
  gameId?: string
}

export function GameRoom({ gameId }: GameRoomProps) {
  const [message, setMessage] = useState('')

  return (
    <div className="min-h-screen bg-fantasy-dark flex">
      {/* Main Game Area */}
      <div className="flex-1 flex flex-col">
        {/* Game Scene */}
        <div className="flex-1 p-6">
          <div className="fantasy-border bg-fantasy-dark/90 p-6 h-full">
            <h2 className="text-2xl font-semibold text-fantasy-gold mb-4">
              Game Scene
            </h2>
            <div className="text-gray-300">
              <p>The adventure begins in a tavern...</p>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-700 p-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your action..."
              className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-fantasy-gold focus:outline-none"
            />
            <button className="fantasy-button">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 border-l border-gray-700 p-6">
        {/* Players */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-fantasy-gold mb-3">
            Players
          </h3>
          <div className="space-y-2">
            <div className="text-gray-300">Player 1 - Warrior</div>
            <div className="text-gray-300">Player 2 - Mage</div>
          </div>
        </div>

        {/* Character Sheet */}
        <div className="character-sheet">
          <h3 className="text-lg font-semibold text-fantasy-gold mb-3">
            Character Sheet
          </h3>
          <div className="text-sm text-gray-300">
            <p>Health: 100/100</p>
            <p>Mana: 50/50</p>
            <p>Level: 1</p>
          </div>
        </div>
      </div>
    </div>
  )
}
