# Database Structure for Chatbot Game

This directory contains the Supabase database structure for the 4-player chatbot game with dungeon master functionality.

## 📁 Directory Structure

```
database/
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql    # Core tables and relationships
│   │   ├── 002_rls_policies.sql      # Row Level Security policies
│   │   └── 003_functions_and_triggers.sql  # Database functions and triggers
│   ├── seed.sql                      # Sample data for testing
│   ├── types.ts                      # TypeScript type definitions
│   └── config.toml                   # Supabase configuration
└── README.md                         # This file
```

## 🎮 Game Features Supported

### Core Tables
- **players**: User accounts with character parameters
- **games**: Game sessions with dungeon master
- **game_players**: Junction table for player-game relationships
- **messages**: Real-time chat system
- **game_sessions**: Game state management
- **characters**: Detailed character sheets per game

### Player Parameters
Each player has the following attributes:
- **Basic Stats**: Health, Mana, Level, Experience Points, Gold
- **Attributes**: Strength, Dexterity, Intelligence, Wisdom, Charisma
- **Class System**: Warrior, Mage, Rogue, Cleric, and more
- **Inventory**: Items, weapons, armor
- **Spells**: Class-specific magical abilities
- **Background**: Character backstory and role-playing elements

### Game Features
- **4-Player Support**: Maximum of 4 players per game
- **Dungeon Master**: One player acts as DM
- **Real-time Chat**: Message system with private/public options
- **Game Sessions**: Persistent game state and scene management
- **Experience System**: Level progression and stat improvements
- **Security**: Row Level Security for multi-tenant architecture

## 🚀 Setup Instructions

### 1. Install Supabase CLI
```bash
npm install -g supabase
```

### 2. Initialize Supabase
```bash
supabase init
```

### 3. Start Local Development
```bash
supabase start
```

### 4. Run Migrations
```bash
supabase db push
```

### 5. Seed Data (Optional)
```bash
supabase db reset
```

## 📊 Database Schema

### Entity Relationship Diagram
```
players (1) ──────── (N) games
    │                     │
    │                     │
    └── characters (1) ────┘
          │
          │
    game_players (N)
          │
          │
    messages (N)
          │
          │
    game_sessions (1)
```

### Key Features
- **Row Level Security**: Users can only access their own data
- **Real-time Subscriptions**: Live updates for chat and game state
- **TypeScript Support**: Full type definitions included
- **Scalable Design**: Supports multiple concurrent games

## 🔧 Development

### Adding New Migrations
1. Create new migration file: `004_new_feature.sql`
2. Add your SQL changes
3. Run: `supabase db push`

### Testing
```bash
# Reset database with seed data
supabase db reset

# View logs
supabase logs

# Access database directly
supabase db shell
```

## 🎯 Game Logic

### Experience System
- 1000 XP per level
- Stat increases on level up
- Health and Mana scale with level

### Character Classes
- **Warrior**: High Strength, Health
- **Mage**: High Intelligence, Mana
- **Rogue**: High Dexterity, Speed
- **Cleric**: High Wisdom, Healing

### Chat System
- Public messages to all players
- Private messages to specific players
- Dungeon Master special messages
- System notifications

## 🔐 Security

- Row Level Security enabled on all tables
- Users can only access their own games and characters
- Dungeon Master has special privileges
- JWT-based authentication

## 📝 API Functions

### Core Functions
- `is_game_full()` - Check if game has reached max players
- `get_player_stats()` - Retrieve player statistics
- `add_experience()` - Add XP and handle level ups
- `get_game_messages()` - Paginated message retrieval
- `create_game_session()` - Initialize new game session

### Triggers
- Automatic `updated_at` timestamp management
- Experience and level up handling
- Game state validation

## 🎨 Next Steps

1. **Frontend Integration**: Connect React/Vue app with TypeScript types
2. **Real-time Features**: Implement WebSocket subscriptions
3. **Game Logic**: Add dungeon master tools and game mechanics
4. **Authentication**: Implement user registration and login
5. **Deployment**: Configure production Supabase instance
