'use client'

import { useState, useEffect } from 'react'
import { useSupabase } from '@/components/providers/SupabaseProvider'
import { Game, Player, GameState, CreateGameData } from '@/types'

export function useGame() {
  const { supabase } = useSupabase()
  const [currentGame, setCurrentGame] = useState<Game | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [loading, setLoading] = useState(false)

  const createGame = async (data: CreateGameData) => {
    setLoading(true)
    try {
      const { data: game, error } = await supabase
        .from('games')
        .insert({
          name: data.name,
          description: data.description,
          max_players: data.max_players || 4,
          status: 'waiting'
        })
        .select()
        .single()

      if (error) throw error
      setCurrentGame(game)
    } catch (error) {
      console.error('Error creating game:', error)
    } finally {
      setLoading(false)
    }
  }

  const joinGame = async (gameId: string) => {
    setLoading(true)
    try {
      // Implementation would go here
      console.log('Joining game:', gameId)
    } catch (error) {
      console.error('Error joining game:', error)
    } finally {
      setLoading(false)
    }
  }

  const leaveGame = async () => {
    setLoading(true)
    try {
      // Implementation would go here
      console.log('Leaving game')
    } catch (error) {
      console.error('Error leaving game:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (content: string, isPrivate: boolean = false) => {
    if (!currentGame) return
    
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          game_id: currentGame.id,
          content,
          message_type: 'player',
          is_private: isPrivate
        })

      if (error) throw error
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const updateGameState = async (updates: Partial<GameState>) => {
    // Implementation would go here
    console.log('Updating game state:', updates)
  }

  return {
    currentGame,
    players,
    gameState,
    loading,
    createGame,
    joinGame,
    leaveGame,
    sendMessage,
    updateGameState
  }
}
