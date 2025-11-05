# Windsurf D&D Game - AI Agent Tasks

## 🎯 What's LEFT to Do

Based on our deployment attempts, here's what needs to be completed:

### ⚠️ CRITICAL: Environment Variables Setup

**Problem**: Vercel deployment failed because Supabase environment variables are missing.

**What needs to be done**:
1. Create Supabase project
2. Get these credentials:
   - `NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key`
3. Add them to Vercel project settings

### 🗄️ Database Setup

**Current Status**: Database schema exists but no live project.

**Tasks**:
1. Go to [supabase.com](https://supabase.com) → New Project
2. Run the migration from `database/supabase/migrations/`
3. Enable Row Level Security (RLS)
4. Enable real-time for: `players`, `messages`, `games`

### 🤖 AI Service Deployment

**Current Status**: AI service works locally but needs deployment.

**Options**:
- **Easiest**: Move AI routes into `dnd-frontend/app/api/`
- **Separate**: Deploy `ai-dungeon-master` to Railway/Render

### 🔄 Real-time Features

**Current Status**: Frontend has hooks but needs live database.

**Missing**:
1. Real-time subscription setup
2. WebSocket connection handling
3. Multiplayer state synchronization

## 🚀 Quick Deployment Steps

### Step 1: Create Supabase Project (5 mins)
```bash
# 1. Go to supabase.com → New Project
# 2. Note down: Project URL + anon key
# 3. Run this SQL in Supabase SQL Editor:
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  character_name TEXT NOT NULL,
  class TEXT NOT NULL CHECK (class IN ('Warrior', 'Mage', 'Rogue', 'Cleric', 'Paladin', 'Ranger', 'Bard', 'Druid')),
  level INTEGER DEFAULT 1,
  health INTEGER DEFAULT 100,
  max_health INTEGER DEFAULT 100,
  mana INTEGER DEFAULT 20,
  max_mana INTEGER DEFAULT 20,
  strength INTEGER DEFAULT 10,
  dexterity INTEGER DEFAULT 10,
  intelligence INTEGER DEFAULT 10,
  wisdom INTEGER DEFAULT 10,
  charisma INTEGER DEFAULT 10,
  experience_points INTEGER DEFAULT 0,
  gold INTEGER DEFAULT 50,
  inventory TEXT DEFAULT '[]',
  spells TEXT DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id TEXT NOT NULL,
  player_id UUID REFERENCES players(id),
  content TEXT NOT NULL,
  message_type TEXT NOT NULL CHECK (message_type IN ('player', 'dungeon_master', 'system')),
  is_private BOOLEAN DEFAULT FALSE,
  metadata TEXT DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  player_name TEXT,
  character_name TEXT
);

-- Enable RLS
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
```

### Step 2: Deploy Frontend (2 mins)
```bash
cd dnd-frontend
vercel --prod
# Add environment variables when prompted
```

### Step 3: Choose AI Service Option

**Option A - Easiest (5 mins)**:
```bash
# Move AI logic to frontend API routes
mkdir -p dnd-frontend/app/api/dm
# Copy AI service logic to app/api/dm/process/route.ts
```

**Option B - Separate Service (10 mins)**:
```bash
cd ai-dungeon-master
railway up
# Add OPENAI_API_KEY to Railway env vars
```

## 🧪 Test Everything Works

1. **Frontend loads**: Visit your Vercel URL
2. **Database connects**: Try joining a player slot
3. **Messages work**: Send a chat message
4. **AI responds**: Test AI Dungeon Master

## 📁 Key Files to Work With

```
dnd-frontend/
├── app/page.tsx              # Main game interface
├── hooks/useGame.ts          # Game logic
├── lib/supabase.ts          # Database client
└── components/              # UI components

ai-dungeon-master/
├── src/services/dungeonMasterService.ts  # AI logic
├── src/routes/dungeonMaster.ts           # API endpoints
└── .env.example                          # Environment template

database/
├── supabase/migrations/    # Database schema
└── application-logic.ts   # Database functions
```

## 🎯 Agent Priorities

### Frontend Agent
- [ ] Fix any UI issues after deployment
- [ ] Add real-time message updates
- [ ] Optimize mobile experience

### Backend Agent  
- [ ] Complete database setup
- [ ] Implement RLS policies
- [ ] Add database functions

### AI Agent
- [ ] Deploy AI service (choose option A or B)
- [ ] Add OpenAI integration
- [ ] Implement rate limiting

### DevOps Agent
- [ ] Set up environment variables
- [ ] Configure monitoring
- [ ] Set up CI/CD

## 🚨 Known Issues

1. **Environment Variables**: Missing Supabase credentials
2. **Real-time**: WebSocket connections not tested
3. **AI Service**: Needs deployment strategy
4. **Database**: No live project exists yet

## ✅ Success Criteria

- [ ] Frontend deployed to Vercel
- [ ] Database created and accessible
- [ ] Players can join games
- [ ] Chat messages work in real-time
- [ ] AI Dungeon Master responds
- [ ] 4 players can play simultaneously

---

**Focus**: Get a working demo deployed ASAP. Advanced features can come later.

**Timeline**: 30-60 minutes to have basic multiplayer working.
