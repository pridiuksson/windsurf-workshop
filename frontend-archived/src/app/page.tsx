'use client'

import { useState } from 'react'
import { GameLobby } from '@/components/GameLobby'
import { GameRoom } from '@/components/GameRoom'
import { CharacterCreation } from '@/components/CharacterCreation'
import { useAuth } from '@/hooks/useAuth'
import { useGame } from '@/hooks/useGame'

type GameState = 'lobby' | 'character-creation' | 'game-room'

export default function Home() {
  const { user, loading } = useAuth()
  const { currentGame } = useGame()
  const [gameState, setGameState] = useState<GameState>('lobby')

  if (loading) {
    return (
      <div className="min-h-screen bg-fantasy-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-fantasy-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-fantasy-gold mb-4">
            D&D Chat Game
          </h1>
          <p className="text-gray-300 mb-8">
            A multiplayer adventure with AI Dungeon Master
          </p>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold">
            Sign In to Play
          </button>
        </div>
      </div>
    )
  }

  const renderGameState = () => {
    switch (gameState) {
      case 'lobby':
        return <GameLobby onJoinGame={() => setGameState('character-creation')} />
      case 'character-creation':
        return <CharacterCreation onComplete={() => setGameState('game-room')} />
      case 'game-room':
        return <GameRoom />
      default:
        return <GameLobby onJoinGame={() => setGameState('character-creation')} />
    }
  }

  return (
    <div className="min-h-screen bg-fantasy-dark">
      {renderGameState()}
    </div>
  )
}
