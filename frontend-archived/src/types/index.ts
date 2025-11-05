// Frontend-specific types and extensions
// Re-exports shared types with frontend additions

export * from '../../../shared/types';

// Import specific types for use in frontend interfaces
import { 
  Game, 
  Player, 
  Message, 
  GameState, 
  Character, 
  CreateGameData, 
  PlayerClass 
} from '../../../shared/types';

// Frontend-specific UI types
export interface UIState {
  isLoading: boolean;
  error: string | null;
  activeModal: ModalType | null;
  sidebarOpen: boolean;
  chatInput: string;
  selectedCharacter: string | null;
}

export type ModalType = 'create-game' | 'join-game' | 'character-sheet' | 'inventory' | 'settings';

// Component Props
export interface GameLobbyProps {
  onJoinGame: (gameId: string) => void;
}

export interface GameRoomProps {
  gameId?: string;
}

export interface CharacterCreationProps {
  onComplete: (character: Character) => void;
}

export interface ChatMessageProps {
  message: Message;
  isOwn: boolean;
}

export interface CharacterSheetProps {
  character: Character;
  onUpdate: (updates: Partial<Character>) => void;
  readonly?: boolean;
}

// Store State (Zustand)
export interface GameStore {
  // Game state
  currentGame: Game | null;
  players: Player[];
  messages: Message[];
  gameState: GameState | null;
  
  // Player state
  currentPlayer: Player | null;
  character: Character | null;
  
  // UI state
  ui: UIState;
  
  // Actions
  setCurrentGame: (game: Game | null) => void;
  setPlayers: (players: Player[]) => void;
  addMessage: (message: Message) => void;
  setGameState: (state: GameState | null) => void;
  setCurrentPlayer: (player: Player | null) => void;
  setCharacter: (character: Character | null) => void;
  updateUI: (updates: Partial<UIState>) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

// Hook return types
export interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export interface UseGameReturn {
  currentGame: Game | null;
  players: Player[];
  gameState: GameState | null;
  loading: boolean;
  createGame: (data: CreateGameData) => Promise<void>;
  joinGame: (gameId: string) => Promise<void>;
  leaveGame: () => Promise<void>;
  sendMessage: (content: string, isPrivate?: boolean) => Promise<void>;
  updateGameState: (updates: Partial<GameState>) => Promise<void>;
}

export interface UseRealtimeReturn {
  connected: boolean;
  subscribe: (gameId: string) => void;
  unsubscribe: () => void;
}

// Form types
export interface CreateGameForm {
  name: string;
  description: string;
  maxPlayers: number;
}

export interface CharacterForm {
  name: string;
  class: PlayerClass;
  background: string;
}

export interface ChatForm {
  message: string;
  isPrivate: boolean;
  targetPlayer?: string;
}

// Animation types
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface TransitionConfig {
  type: 'spring' | 'tween';
  duration?: number;
  ease?: string;
}

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    warning: string;
    success: string;
  };
  fonts: {
    primary: string;
    fantasy: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Local storage types
export interface LocalStorage {
  userPreferences: UserPreferences;
  lastGameId?: string;
  characterTemplates: CharacterTemplate[];
}

export interface UserPreferences {
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  theme: 'light' | 'dark' | 'fantasy';
  autoSave: boolean;
  chatFontSize: 'small' | 'medium' | 'large';
}

export interface CharacterTemplate {
  id: string;
  name: string;
  class: PlayerClass;
  background: string;
  stats: Partial<Character>;
  createdAt: string;
}

// Error types
export interface FormError {
  field: string;
  message: string;
}

export interface ValidationError {
  [key: string]: string[];
}

// API client types
export interface ApiClient {
  get: <T>(endpoint: string) => Promise<T>;
  post: <T>(endpoint: string, data: any) => Promise<T>;
  put: <T>(endpoint: string, data: any) => Promise<T>;
  delete: <T>(endpoint: string) => Promise<T>;
}

// Re-export User type from Supabase
export interface User {
  id: string;
  email?: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
}
