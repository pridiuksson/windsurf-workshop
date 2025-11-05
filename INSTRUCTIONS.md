# D&D Chat Game - Vercel Deployment Instructions

## 🚀 Quick Start Guide

This guide will help you deploy the D&D Chat Game on Vercel and set up all necessary services.

## 📋 Prerequisites

- **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
- **GitHub Account**: For code repository
- **Supabase Account**: For database and backend services
- **OpenAI API Key**: For AI Dungeon Master functionality
- **Node.js 18+**: For local development and AI service

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel Frontend │    │  Supabase Backend │    │  AI Service     │
│   (Next.js)      │◄──►│  (PostgreSQL)    │◄──►│  (Node.js)      │
│                 │    │                 │    │                 │
│ - UI Components │    │ - Database      │    │ - OpenAI GPT-4  │
│ - Real-time     │    │ - Auth          │    │ - API Routes    │
│ - Chat Interface│    │ - Storage       │    │ - Rate Limiting │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 Step 1: Deploy Frontend to Vercel

### 1.1 Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select the `dnd-frontend` directory
5. Vercel will automatically detect Next.js

### 1.2 Configure Environment Variables

Add these environment variables in your Vercel project settings:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Service URL (if deployed separately)
NEXT_PUBLIC_AI_SERVICE_URL=https://your-ai-service.vercel.app
```

### 1.3 Deploy

1. Click "Deploy" to deploy your frontend
2. Wait for deployment to complete
3. Your app will be available at: `https://your-project-name.vercel.app`

## 🗄️ Step 2: Set Up Supabase Backend

### 2.1 Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Choose organization and project name
4. Set a strong database password
5. Select a region closest to your users

### 2.2 Get Project Credentials

From your Supabase project settings, copy:
- **Project URL** (for `NEXT_PUBLIC_SUPABASE_URL`)
- **anon public** key (for `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

### 2.3 Set Up Database Schema

1. Go to the SQL Editor in Supabase
2. Run the migration script from `database/supabase/migrations/`
3. Or use the Supabase CLI locally:

```bash
cd database
supabase start
supabase db push
```

### 2.4 Configure Row Level Security (RLS)

Enable RLS policies for multiplayer security:

```sql
-- Enable RLS
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Players can only access their own data
CREATE POLICY "Users can view own profile" ON players
  FOR SELECT USING (auth.uid() = id);

-- Players can insert their own data
CREATE POLICY "Users can insert own profile" ON players
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Players can update their own data
CREATE POLICY "Users can update own profile" ON players
  FOR UPDATE USING (auth.uid() = id);
```

## 🤖 Step 3: Deploy AI Service (Optional)

You have two options for the AI service:

### Option A: Deploy to Vercel (Recommended)

1. **Create API Routes in Frontend:**
   ```typescript
   // dnd-frontend/app/api/dm/process/route.ts
   import { NextRequest, NextResponse } from 'next/server';
   
   export async function POST(request: NextRequest) {
     // Your AI logic here
     return NextResponse.json({ response: "AI response" });
   }
   ```

2. **Add OpenAI Key to Vercel:**
   ```bash
   OPENAI_API_KEY=your_openai_api_key
   ```

### Option B: Deploy to Railway/Render

1. **Fork the AI service directory to separate repo**
2. **Deploy to Railway:**
   ```bash
   # Connect to Railway
   railway login
   railway new
   railway up
   ```

3. **Set environment variables:**
   ```bash
   OPENAI_API_KEY=your_openai_api_key
   PORT=3001
   ```

## 🔧 Step 4: Configure Real-time Features

### 4.1 Enable Real-time Subscriptions

In your Supabase dashboard:

1. Go to **Database** → **Replication**
2. Enable real-time for:
   - `players` table
   - `messages` table
   - `games` table

### 4.2 Add Real-time Client

```typescript
// dnd-frontend/hooks/useRealtime.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useRealtime(gameId: string) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscription = supabase
      .channel(`game-${gameId}`)
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => setMessages(prev => [...prev, payload.new])
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [gameId]);

  return { messages };
}
```

## 🎮 Step 5: Test Your Deployment

### 5.1 Frontend Testing

1. Visit your Vercel URL
2. Try joining a player slot
3. Send a test message
4. Check browser console for errors

### 5.2 Backend Testing

1. Test Supabase connection:
   ```bash
   curl https://your-project.supabase.co/rest/v1/players
   ```

2. Test AI service (if separate):
   ```bash
   curl -X POST https://your-ai-service.vercel.app/api/dm/process
   ```

## 🛠️ Troubleshooting

### Common Issues

#### 1. "Supabase connection failed"
- Check environment variables in Vercel
- Verify Supabase project URL and API keys
- Ensure RLS policies are correctly set

#### 2. "Build failed on Vercel"
- Check build logs for specific errors
- Ensure all dependencies are in package.json
- Verify TypeScript compilation

#### 3. "AI service not responding"
- Check OpenAI API key is valid
- Verify rate limiting settings
- Check service logs

#### 4. "Real-time updates not working"
- Ensure replication is enabled in Supabase
- Check subscription setup
- Verify CORS settings

### Debug Mode

Enable debug logging:

```typescript
// dnd-frontend/lib/supabase.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient({
  options: {
    global: {
      headers: {
        'X-Client-Info': 'dnd-chat-game/1.0.0'
      }
    }
  }
})
```

## 📊 Monitoring

### Vercel Analytics

1. Enable Analytics in Vercel dashboard
2. Monitor page views and performance
3. Set up custom events for game actions

### Supabase Monitoring

1. Monitor database usage in Supabase dashboard
2. Set up alerts for quota limits
3. Track real-time connection usage

## 🔄 CI/CD Pipeline

### Automatic Deployments

Your Vercel project is already set up for automatic deployments:

- **Main branch** → Production deployment
- **Other branches** → Preview deployments

### Environment-specific Variables

```bash
# Production (main branch)
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=prod_anon_key

# Staging (develop branch)  
NEXT_PUBLIC_SUPABASE_URL=https://staging-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=staging_anon_key
```

## 🚀 Going to Production

### 1. Custom Domain

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records as instructed

### 2. Security Hardening

```typescript
// dnd-frontend/next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};
```

### 3. Performance Optimization

- Enable Vercel Analytics
- Set up CDN caching
- Optimize images and assets
- Monitor Core Web Vitals

## 📞 Support

### Getting Help

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **OpenAI Docs**: [platform.openai.com/docs](https://platform.openai.com/docs)

### Community

- **Discord**: Join our community server
- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check our comprehensive docs

---

## 🎉 You're Ready!

Your D&D Chat Game is now live on Vercel! Players can:

1. **Join games** through the web interface
2. **Chat in real-time** with other players
3. **Interact with the AI Dungeon Master**
4. **Save progress** to the database

Enjoy your multiplayer D&D adventure! 🐉⚔️
