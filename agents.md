# D&D Chat Game - Core Architecture & Team Agents

## 🏗️ Project Overview

A multiplayer Dungeons & Dragons chat game where 4 players connect and play against an AI Dungeon Master. Built with modern web technologies for real-time, immersive gameplay.

## 🎯 Core Architecture

### **Technology Stack**

#### **Frontend (Next.js 16)**
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **State Management**: React hooks
- **Real-time**: Supabase Realtime subscriptions
- **UI Components**: Custom components with Lucide React icons
- **Database**: Supabase client integration

#### **Backend (Supabase)**
- **Database**: PostgreSQL with Row Level Security
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime
- **API**: RESTful with Supabase client
- **Storage**: Supabase Storage for assets

#### **AI Service (Node.js + Express)**
- **Language**: TypeScript
- **Framework**: Express.js
- **AI**: OpenAI GPT-4 API
- **Rate Limiting**: rate-limiter-flexible
- **Logging**: Winston

#### **Shared Layer**
- **Types**: Unified TypeScript definitions
- **Utilities**: Common helper functions
- **Validation**: Joi schemas

## 📁 Project Structure

```
Windsurf-workshop/
├── database/                    # ✅ Supabase database setup
│   ├── supabase/
│   │   ├── migrations/          # Database migrations
│   │   ├── seed.sql            # Sample data
│   │   ├── types.ts            # Database types
│   │   └── config.toml         # Supabase config
│   ├── application-logic.ts    # Database helper functions
│   └── README.md               # Database documentation
├── frontend/                    # ✅ Next.js frontend
│   ├── src/
│   │   ├── app/                # App Router pages
│   │   ├── components/         # React components
│   │   ├── hooks/              # Custom hooks
│   │   ├── lib/                # Utilities and clients
│   │   ├── types/              # Frontend types
│   │   └── utils/              # Helper functions
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
├── ai-dungeon-master/           # ✅ AI service
│   ├── src/
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic
│   │   ├── middleware/         # Express middleware
│   │   └── utils/              # Utility functions
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── shared/                      # ✅ Shared code
│   ├── types/                  # Unified type definitions
│   └── utils/                  # Shared utilities
└── agents.md                    # This file
```

## 🎮 Game Architecture

### **Database Schema Design**

#### **Core Entities**
- **players**: User accounts with character stats
- **games**: Game sessions with metadata
- **game_players**: Junction table for player-game relationships
- **messages**: Real-time chat system
- **game_sessions**: Game state management
- **characters**: Detailed character sheets

#### **Key Design Decisions**
1. **Row Level Security**: Each user can only access their own data
2. **JSON Fields**: Flexible storage for inventory, spells, abilities
3. **Real-time Subscriptions**: Live updates for multiplayer
4. **Scalable**: Supports multiple concurrent games

### **Frontend Architecture**

#### **Component Structure**
```
components/
├── providers/          # Context providers
│   ├── SupabaseProvider.tsx
│   └── GameProvider.tsx
├── game/              # Game-specific components
│   ├── GameLobby.tsx
│   ├── GameRoom.tsx
│   ├── ChatInterface.tsx
│   └── CharacterSheet.tsx
├── ui/                # Reusable UI components
│   ├── Button.tsx
│   ├── Modal.tsx
│   └── Input.tsx
└── layout/            # Layout components
    ├── Header.tsx
    └── Sidebar.tsx
```

#### **State Management (Zustand)**
```typescript
interface GameStore {
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
  // ... more actions
}
```

#### **Real-time Architecture**
- **Supabase Realtime**: WebSocket connections for live updates
- **Optimistic Updates**: Immediate UI updates with rollback on error
- **Conflict Resolution**: Last-write-wins with user notification
- **Connection Management**: Automatic reconnection and error handling

### **AI Dungeon Master Architecture**

#### **Service Design**
```typescript
class DungeonMasterService {
  async processRequest(request: DMRequest): Promise<DMResponse>
  async generateCharacterBackstory(class: string, name: string): Promise<string>
  async generateAdventureHook(level: number, classes: string[]): Promise<string>
}
```

#### **Prompt Engineering**
- **System Prompt**: Defines DM persona and rules
- **Context Building**: Formats game state for AI consumption
- **Response Parsing**: Structured JSON responses with metadata
- **Fallback Handling**: Graceful degradation when AI fails

#### **Rate Limiting & Cost Management**
- **DM Requests**: 10 requests/minute per IP
- **General Requests**: 100 requests/minute per IP
- **Caching**: Common responses cached for 5 minutes
- **Cost Tracking**: Monitor OpenAI API usage

## 🔧 Key Technical Decisions

### **1. Database Choice: Supabase**
**Why**: 
- Built-in real-time subscriptions
- Row Level Security for multiplayer
- Managed PostgreSQL with automatic backups
- TypeScript support out of the box
- Generous free tier for development

**Trade-offs**: 
- Vendor lock-in
- Limited control over database configuration
- Potential cost scaling issues

### **2. Frontend Framework: Next.js 14**
**Why**:
- App Router for better performance
- Server-side rendering for SEO
- Built-in optimizations
- Excellent TypeScript support
- Large ecosystem and community

**Trade-offs**:
- Learning curve for App Router
- Opinionated structure
- Build complexity

### **3. AI Integration: OpenAI GPT-4**
**Why**:
- Superior creative writing capabilities
- Better understanding of D&D context
- Structured output support
- Reliable API performance

**Trade-offs**:
- Higher cost compared to alternatives
- Rate limiting constraints
- Dependency on external service

### **4. State Management: Zustand**
**Why**:
- Simple and lightweight
- TypeScript friendly
- No providers needed
- Good performance for complex state

**Trade-offs**:
- Less ecosystem than Redux
- Manual devtools setup
- No built-in persistence

### **5. Styling: TailwindCSS**
**Why**:
- Utility-first approach
- Excellent design system support
- Custom fantasy theme capabilities
- Small bundle size

**Trade-offs**:
- Learning curve
- Potential for inconsistent designs
- HTML class verbosity

## 🚀 Development Workflow

### **Environment Setup**
```bash
# 1. Database
cd database
supabase start
supabase db push

# 2. Frontend
cd frontend
npm install
npm run dev

# 3. AI Service
cd ai-dungeon-master
npm install
cp .env.example .env
# Add OPENAI_API_KEY to .env
npm run dev
```

### **Development Principles**
1. **Type Safety**: All code written in TypeScript
2. **Real-time First**: Design for live multiplayer experience
3. **Progressive Enhancement**: Core functionality works without AI
4. **Error Boundaries**: Graceful error handling throughout
5. **Performance First**: Optimistic updates and efficient rendering

### **Testing Strategy**
- **Unit Tests**: Game logic and utility functions
- **Integration Tests**: AI service and database operations
- **E2E Tests**: Critical user flows with Playwright
- **Load Testing**: Real-time performance with multiple users

## 👥 Team Agent Responsibilities

### **Frontend Developer**
**Focus**: User interface and real-time experience
**Key Tasks**:
- Implement React components with TypeScript
- Set up Supabase real-time subscriptions
- Create responsive game interface
- Handle client-side state management
- Implement user authentication flow

**Files to Work On**:
- `frontend/src/components/`
- `frontend/src/hooks/`
- `frontend/src/app/`
- `frontend/src/lib/`

### **Backend Developer**
**Focus**: Database design and API integration
**Key Tasks**:
- Design and implement database schema
- Set up Row Level Security policies
- Create database functions and triggers
- Implement real-time subscriptions
- Handle data validation and constraints

**Files to Work On**:
- `database/supabase/migrations/`
- `database/application-logic.ts`
- `database/supabase/seed.sql`

### **AI/ML Engineer**
**Focus**: Dungeon Master AI implementation
**Key Tasks**:
- Design prompt engineering strategy
- Implement OpenAI API integration
- Create context management system
- Handle rate limiting and cost optimization
- Implement fallback and error handling

**Files to Work On**:
- `ai-dungeon-master/src/services/`
- `ai-dungeon-master/src/routes/`
- `ai-dungeon-master/src/middleware/`

### **DevOps Engineer**
**Focus**: Deployment and infrastructure
**Key Tasks**:
- Set up CI/CD pipeline
- Configure production Supabase instance
- Deploy AI service to cloud platform
- Set up monitoring and logging
- Implement security best practices

**Files to Work On**:
- Deployment configurations
- Environment variables
- Monitoring setup
- Security policies

### **Game Designer**
**Focus**: Game mechanics and user experience
**Key Tasks**:
- Design D&D 5e rule adaptations
- Create character class systems
- Design combat and skill mechanics
- Write engaging narrative content
- Balance game progression

**Files to Work On**:
- Game logic implementation
- Content creation
- User experience flows
- Balance testing

## 🔄 Communication Protocols

### **Real-time Events**
```typescript
// Message events
interface MessageEvent {
  type: 'message';
  data: Message;
  game_id: string;
}

// Game state updates
interface GameStateUpdateEvent {
  type: 'game_state_update';
  data: GameState;
  game_id: string;
}

// Player join/leave
interface PlayerEvent {
  type: 'player_join' | 'player_leave';
  data: GamePlayer | { player_id: string };
  game_id: string;
}
```

### **API Contracts**
```typescript
// AI Service API
POST /api/dm/process
{
  "action": "generate_scene",
  "game_state": {...},
  "player_action": "I search the room",
  "player_id": "uuid"
}

// Database API (via Supabase)
const { data } = await supabase
  .from('messages')
  .select('*')
  .eq('game_id', gameId)
  .order('created_at');
```

## 📊 Performance Considerations

### **Frontend Optimization**
- **Code Splitting**: Lazy load game components
- **Image Optimization**: Next.js Image component
- **Bundle Size**: Tree shaking and dynamic imports
- **Caching**: SWR for data fetching
- **Rendering**: Virtual scrolling for long chat histories

### **Backend Optimization**
- **Database Indexing**: Optimized queries for real-time data
- **Connection Pooling**: Efficient database connections
- **Caching Strategy**: Redis for frequent game state
- **Rate Limiting**: Prevent abuse and manage costs
- **Monitoring**: Track performance and errors

### **AI Service Optimization**
- **Prompt Caching**: Reuse common prompt structures
- **Batch Processing**: Combine multiple AI requests
- **Response Caching**: Cache AI responses for identical inputs
- **Cost Management**: Track and limit API usage
- **Fallback Strategies**: Graceful degradation when AI is unavailable

## 🔐 Security Architecture

### **Authentication & Authorization**
- **Supabase Auth**: JWT-based authentication
- **Row Level Security**: Database-level access control
- **API Keys**: Secure OpenAI API key management
- **CORS**: Proper cross-origin configuration
- **Rate Limiting**: Prevent abuse and DoS attacks

### **Data Protection**
- **Input Validation**: Joi schemas for all inputs
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Content Security Policy
- **Privacy**: Minimal data collection
- **Encryption**: HTTPS for all communications

## 🚀 Deployment Strategy

### **Frontend (Vercel)**
- Automatic deployments from main branch
- Preview deployments for PRs
- Edge functions for API routes
- Built-in CDN and optimization

### **Backend (Supabase)**
- Managed PostgreSQL with automatic backups
- Real-time subscriptions built-in
- Global CDN for API requests
- Automatic scaling and maintenance

### **AI Service (Railway/Render)**
- Container-based deployment
- Horizontal scaling support
- Environment variable management
- Health checks and monitoring

### **Monitoring & Logging**
- **Frontend**: Vercel Analytics
- **Backend**: Supabase Dashboard
- **AI Service**: Winston + external monitoring
- **Error Tracking**: Sentry integration
- **Performance**: Custom metrics and alerts

## 📈 Scalability Plan

### **Phase 1: MVP (0-100 users)**
- Single Supabase project
- Single AI service instance
- Basic monitoring
- Manual scaling

### **Phase 2: Growth (100-1000 users)**
- Database optimization
- AI service load balancing
- Enhanced monitoring
- Automated scaling

### **Phase 3: Scale (1000+ users)**
- Multi-region deployment
- Database sharding
- AI service clustering
- Advanced caching strategies

## 🎯 Success Metrics

### **Technical Metrics**
- **Uptime**: >99.5%
- **Response Time**: <200ms for API calls
- **AI Response Time**: <3 seconds
- **Real-time Latency**: <100ms
- **Error Rate**: <1%

### **User Metrics**
- **Daily Active Users**: Target 100+
- **Session Duration**: Average 30+ minutes
- **Game Completion Rate**: >70%
- **User Retention**: 50% weekly retention
- **AI Satisfaction**: >4/5 user rating

## 🔄 Iteration Plan

### **Sprint 1: Foundation**
- Set up project structure
- Implement basic authentication
- Create game lobby
- Set up real-time chat

### **Sprint 2: Core Gameplay**
- Character creation system
- Basic game mechanics
- AI Dungeon Master integration
- Game state management

### **Sprint 3: Advanced Features**
- Combat system
- Inventory management
- Spell and ability system
- Experience and leveling

### **Sprint 4: Polish & Optimization**
- UI/UX improvements
- Performance optimization
- Bug fixes and stability
- User feedback integration

This architecture provides a solid foundation for building a scalable, engaging multiplayer D&D chat game with clear separation of concerns and modern development practices.
