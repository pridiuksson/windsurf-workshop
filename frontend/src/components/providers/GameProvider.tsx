'use client'

import { createContext, useContext, useReducer } from 'react'
import { Game, Player, Message, GameState, Character } from '@/types'

interface GameContextType {
  currentGame: Game | null
  players: Player[]
  messages: Message[]
  gameState: GameState | null
  currentPlayer: Player | null
  character: Character | null
  dispatch: React.Dispatch<GameAction>
}

type GameAction = 
  | { type: 'SET_CURRENT_GAME'; payload: Game | null }
  | { type: 'SET_PLAYERS'; payload: Player[] }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_GAME_STATE'; payload: GameState | null }
  | { type: 'SET_CURRENT_PLAYER'; payload: Player | null }
  | { type: 'SET_CHARACTER'; payload: Character | null }

const GameContext = createContext<GameContextType | undefined>(undefined)

function gameReducer(state: GameContextType, action: GameAction): GameContextType {
  switch (action.type) {
    case 'SET_CURRENT_GAME':
      return { ...state, currentGame: action.payload }
    case 'SET_PLAYERS':
      return { ...state, players: action.payload }
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] }
    case 'SET_GAME_STATE':
      return { ...state, gameState: action.payload }
    case 'SET_CURRENT_PLAYER':
      return { ...state, currentPlayer: action.payload }
    case 'SET_CHARACTER':
      return { ...state, character: action.payload }
    default:
      return state
  }
}

const initialState: GameContextType = {
  currentGame: null,
  players: [],
  messages: [],
  gameState: null,
  currentPlayer: null,
  character: null,
  dispatch: () => {}
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return (
    <GameContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
