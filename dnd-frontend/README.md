# D&D Game Frontend

A beautiful, modern Dungeons & Dragons game interface built with Next.js, TypeScript, and TailwindCSS.

## Features

- 🎮 **Player Slots**: Support for up to 4 players with device-based identification
- 📱 **One Device Per Player**: Each player uses their own device/browser with unique device ID
- 🎭 **Character Creation**: Interactive character creation with class selection:
  - Warrior, Mage, Rogue, and Cleric classes
  - Class-specific stats and abilities
  - Custom character naming
- 💬 **iMessage-style Chat**: Beautiful message interface with support for:
  - Player messages with character names
  - Dungeon Master messages
  - System notifications
  - Online/offline status indicators
- 📊 **Player Stats Screen**: Real-time display of character statistics including:
  - Health and Mana bars
  - Core attributes (STR, DEX, INT, WIS, CHA)
  - Gold and Experience tracking
  - Character level and class information
- 🔐 **Session Management**: Persistent player sessions with automatic cleanup
- 🎨 **Modern UI**: Built with TailwindCSS and Lucide React icons
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Play

1. **Device Identification**: Each device/browser gets a unique device ID shown at the top
2. **Join a Slot**: Click on any available numbered slot (1-4) to create your character
3. **Create Character**: Choose your class (Warrior, Mage, Rogue, Cleric) and enter a character name
4. **View Your Stats**: Your character statistics appear in the right panel with real-time updates
5. **Chat with Players**: Use the iMessage-style chat to communicate with other players
6. **Leave Game**: Click "Leave Game" to exit and free up your slot for others

### Device-Based Features

- **Unique Device ID**: Each browser/device has a unique identifier
- **Session Persistence**: Your character is saved for 24 hours on the same device
- **Online Status**: See which players are currently online
- **One Player Per Device**: Prevents multiple players from using the same device

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **State Management**: React Hooks

## Project Structure

```
dnd-frontend/
├── app/
│   └── page.tsx              # Main game page with device management
├── components/
│   ├── PlayerSlot.tsx        # Player slot with online status
│   ├── ChatMessage.tsx       # Individual chat message bubble
│   ├── ChatInterface.tsx     # Chat interface with input
│   ├── PlayerStats.tsx       # Player statistics panel
│   └── CharacterCreation.tsx # Character creation modal
├── types/
│   └── game.ts              # TypeScript type definitions
├── lib/
│   ├── utils.ts             # Utility functions
│   └── device.ts            # Device fingerprinting and session management
└── README.md                # This file
```

## Integration with Backend

This frontend is designed to work with the application logic defined in `/database/application-logic.ts`. The device-based architecture requires:

### Database Setup
1. Run the migration in `/database/supabase/migrations/002_add_device_support.sql`
2. Set up the `devices` table for device tracking
3. Update the `players` table with device-specific fields

### Backend Integration
1. Replace mock data with API calls to your database
2. Implement device fingerprinting validation
3. Add real-time updates using WebSockets or Server-Sent Events
4. Connect to your database (Supabase, PostgreSQL, etc.)
5. Implement session cleanup for offline players

### Key Functions
- `generateDeviceFingerprint()`: Creates unique device identifier
- `getPlayerByDevice()`: Retrieves player by device ID
- `updatePlayerOnlineStatus()`: Tracks player online/offline status
- `createOrGetDevice()`: Manages device registration

## Future Enhancements

- [x] Device-based player identification
- [x] Character creation and customization
- [x] Session management
- [ ] Real-time multiplayer support with WebSockets
- [ ] Inventory management system
- [ ] Spell casting mechanics
- [ ] Dice rolling interface
- [ ] Game master controls
- [ ] Save/load game sessions
- [ ] Voice chat integration
- [ ] Mobile app support
