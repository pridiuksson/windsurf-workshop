# D&D Chat Game

A multiplayer Dungeons & Dragons chat game where 4 players connect and play against an AI Dungeon Master. Built with modern web technologies for real-time, immersive gameplay.

## 🎮 Features

- **4-Player Multiplayer**: Real-time chat and gameplay with friends
- **AI Dungeon Master**: GPT-4 powered storytelling and game management
- **Character Creation**: Choose from 8 D&D classes with unique abilities
- **Real-time Combat**: Turn-based combat with D&D 5e mechanics
- **Persistent Game State**: Save and resume your adventures
- **Rich UI**: Fantasy-themed interface with animations

## 🏗️ Architecture

- **Frontend**: Next.js 14 + TypeScript + TailwindCSS
- **Backend**: Supabase (PostgreSQL + Realtime + Auth)
- **AI Service**: Node.js + Express + OpenAI GPT-4
- **Database**: PostgreSQL with Row Level Security

## 📁 Project Structure

```
├── database/              # Supabase database setup
├── frontend/              # Next.js frontend application
├── ai-dungeon-master/     # AI Dungeon Master service
├── shared/                # Shared types and utilities
└── agents.md             # Team documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase CLI
- OpenAI API key

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Windsurf-workshop
```

2. **Set up the database**
```bash
cd database
npm install -g supabase
supabase start
supabase db push
```

3. **Set up the frontend**
```bash
cd frontend
npm install
cp .env.example .env.local
# Add your Supabase credentials to .env.local
npm run dev
```

4. **Set up the AI service**
```bash
cd ai-dungeon-master
npm install
cp .env.example .env
# Add your OpenAI API key to .env
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:3000
- AI Service: http://localhost:3001
- Database Studio: http://localhost:54323

## 🎯 Development

### Team Structure
- **Frontend Developer**: UI/UX and real-time features
- **Backend Developer**: Database design and API
- **AI/ML Engineer**: Dungeon Master AI implementation
- **DevOps Engineer**: Deployment and infrastructure
- **Game Designer**: Game mechanics and content

### Key Technologies
- **Next.js 14**: React framework with App Router
- **Supabase**: Backend-as-a-Service with real-time capabilities
- **OpenAI GPT-4**: AI Dungeon Master
- **TypeScript**: Type-safe development
- **TailwindCSS**: Utility-first styling
- **Zustand**: Lightweight state management

## 📚 Documentation

- [Architecture Overview](./agents.md) - Detailed technical documentation
- [Database Schema](./database/README.md) - Database structure and design
- [API Documentation](./ai-dungeon-master/README.md) - AI service API

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- [Supabase Dashboard](https://app.supabase.com)
- [OpenAI API](https://platform.openai.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com)

---

Built with ❤️ by the AI Sweden team
