'use client'

import { useState } from 'react'

interface GameLobbyProps {
  onJoinGame: (gameId: string) => void
}

export function GameLobby({ onJoinGame }: GameLobbyProps) {
  const [games, setGames] = useState<any[]>([])

  return (
    <div className="min-h-screen bg-fantasy-dark p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-fantasy-gold mb-8 text-center">
          Game Lobby
        </h1>
        
        <div className="grid gap-6">
          {/* Create Game Section */}
          <div className="fantasy-border bg-fantasy-dark/90 p-6">
            <h2 className="text-2xl font-semibold text-fantasy-gold mb-4">
              Create New Game
            </h2>
            <button className="fantasy-button">
              Create Game
            </button>
          </div>

          {/* Available Games */}
          <div className="fantasy-border bg-fantasy-dark/90 p-6">
            <h2 className="text-2xl font-semibold text-fantasy-gold mb-4">
              Available Games
            </h2>
            {games.length === 0 ? (
              <p className="text-gray-400">No games available. Create one!</p>
            ) : (
              <div className="space-y-4">
                {games.map((game) => (
                  <div key={game.id} className="border border-gray-600 rounded p-4">
                    <h3 className="text-lg font-semibold text-white">{game.name}</h3>
                    <p className="text-gray-400">{game.description}</p>
                    <button 
                      onClick={() => onJoinGame(game.id)}
                      className="fantasy-button mt-2"
                    >
                      Join Game
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
