# D&D Game Frontend

A beautiful, modern Dungeons & Dragons game interface built with Next.js, TypeScript, and TailwindCSS.

## Features

- 🎮 **Player Slots**: Support for up to 4 players with easy slot joining
- 💬 **iMessage-style Chat**: Beautiful message interface with support for:
  - Player messages
  - Dungeon Master messages
  - System notifications
- 📊 **Player Stats Screen**: Real-time display of character statistics including:
  - Health and Mana
  - Core attributes (STR, DEX, INT, WIS, CHA)
  - Gold and Experience
  - Character level and class
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

1. **Join a Slot**: Click on any numbered slot (1-4) to join the game
2. **View Your Stats**: Your character stats will appear in the right panel
3. **Chat with Players**: Use the chat interface to communicate with other players and the Dungeon Master
4. **Send Messages**: Type your message and click Send or press Enter

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
│   └── page.tsx          # Main game page
├── components/
│   ├── PlayerSlot.tsx    # Player slot component
│   ├── ChatMessage.tsx   # Individual chat message
│   ├── ChatInterface.tsx # Chat interface with input
│   └── PlayerStats.tsx   # Player statistics panel
├── types/
│   └── game.ts          # TypeScript type definitions
└── lib/
    └── utils.ts         # Utility functions
```

## Integration with Backend

This frontend is designed to work with the application logic defined in `/database/application-logic.ts`. To integrate with a real backend:

1. Replace mock data with API calls
2. Implement real-time updates using WebSockets or Server-Sent Events
3. Connect to your database (Supabase, PostgreSQL, etc.)
4. Add authentication for players

## Future Enhancements

- [ ] Database integration
- [ ] Real-time multiplayer support
- [ ] Character creation and customization
- [ ] Inventory management
- [ ] Spell casting system
- [ ] Dice rolling mechanics
- [ ] Save/load game sessions
