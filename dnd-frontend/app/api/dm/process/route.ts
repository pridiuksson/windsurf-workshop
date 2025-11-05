import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// D&D Dungeon Master System Prompt
const DUNGEON_MASTER_PROMPT = `You are an experienced Dungeons & Dragons Dungeon Master for a multiplayer online game. Your role is to create an immersive, engaging, and fun D&D experience for 4 players.

Your responsibilities:
1. Create vivid descriptions of environments, NPCs, and situations
2. Respond to player actions with appropriate consequences
3. Manage combat encounters with fair mechanics
4. Create interesting story hooks and quests
5. Adapt to different player classes and play styles
6. Keep the game moving at a good pace
7. Be creative but consistent with D&D 5e rules

Player Classes Available: Warrior, Mage, Rogue, Cleric, Paladin, Ranger, Bard, Druid

Response Guidelines:
- Keep responses concise but descriptive (2-4 paragraphs max)
- Use evocative language to paint a picture
- Include dialogue for NPCs when relevant
- Offer players clear choices and actions
- Handle combat with clear initiative and damage descriptions
- Be encouraging and make players feel heroic

Tone: Epic fantasy adventure with moments of tension, discovery, and triumph.

Always respond in character as the Dungeon Master, never as an AI assistant.`;

export async function POST(request: NextRequest) {
  try {
    const { action, game_state, player_action, player_data } = await request.json();

    if (!action || !game_state) {
      return NextResponse.json(
        { error: 'Missing required fields: action, game_state' },
        { status: 400 }
      );
    }

    // Build context for the AI
    let prompt = DUNGEON_MASTER_PROMPT + '\n\n';
    
    // Add current game context
    prompt += `CURRENT GAME STATE:\n`;
    prompt += `- Players in game: ${game_state.players?.length || 0}\n`;
    prompt += `- Current scene: ${game_state.current_scene || 'Starting area'}\n`;
    prompt += `- Game session: ${game_state.session_id || 'New adventure'}\n\n`;

    // Add player information
    if (player_data) {
      prompt += `ACTING PLAYER:\n`;
      prompt += `- Name: ${player_data.character_name}\n`;
      prompt += `- Class: ${player_data.class}\n`;
      prompt += `- Level: ${player_data.level}\n`;
      prompt += `- Health: ${player_data.health}/${player_data.max_health}\n\n`;
    }

    // Add other players' context
    if (game_state.players && game_state.players.length > 1) {
      prompt += `OTHER PLAYERS:\n`;
      game_state.players.forEach((player: any, index: number) => {
        if (player.id !== player_data?.id) {
          prompt += `- ${player.character_name} the ${player.class}\n`;
        }
      });
      prompt += '\n';
    }

    // Process different types of actions
    switch (action) {
      case 'start_adventure':
        prompt += `The players are beginning a new D&D adventure. Create an exciting opening scene that introduces the setting and presents an immediate situation or mystery. The players are:\n${game_state.players?.map((p: any) => `- ${p.character_name} the ${p.class}`).join('\n') || 'No players yet'}`;
        break;

      case 'player_action':
        if (!player_action) {
          return NextResponse.json(
            { error: 'player_action is required for player_action action' },
            { status: 400 }
          );
        }
        prompt += `PLAYER ACTION: ${player_action}\n\n`;
        prompt += `Respond to this action as the Dungeon Master. Describe what happens and what the players see next.`;
        break;

      case 'combat':
        prompt += `COMBAT SITUATION: ${player_action || 'Combat has begun'}\n\n`;
        prompt += `Describe the combat encounter, including enemies, terrain, and tactical options. Use D&D 5e mechanics for combat resolution.`;
        break;

      case 'skill_check':
        prompt += `SKILL CHECK: ${player_action}\n\n`;
        prompt += `The player is attempting a skill check. Describe the challenge and the outcome. Be creative with success and failure consequences.`;
        break;

      case 'dialogue':
        prompt += `DIALOGUE: ${player_action}\n\n`;
        prompt += `A player is speaking to an NPC or the group. Respond as the Dungeon Master, including NPC reactions and consequences of the conversation.`;
        break;

      default:
        prompt += `ACTION: ${player_action || 'General game progression'}\n\n`;
        prompt += `Respond as the Dungeon Master to advance the story.`;
    }

    // Generate response using Gemini Flash
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse the response and add metadata
    const dmResponse = {
      content: text,
      type: determineResponseType(text),
      game_state_updates: {
        last_action: action,
        timestamp: new Date().toISOString()
      },
      sound_effects: determineSoundEffects(text),
      visual_effects: determineVisualEffects(text)
    };

    return NextResponse.json({
      success: true,
      response: dmResponse
    });

  } catch (error) {
    console.error('Dungeon Master API Error:', error);
    
    // Fallback response if AI fails
    const fallbackResponse = {
      content: "The Dungeon Master surveys the scene, ready to guide your adventure. What would you like to do?",
      type: 'narrative',
      game_state_updates: {
        last_action: 'fallback',
        timestamp: new Date().toISOString()
      }
    };

    return NextResponse.json({
      success: true,
      response: fallbackResponse,
      warning: 'Using fallback response due to AI error'
    });
  }
}

// Helper functions to enhance the experience
function determineResponseType(text: string): string {
  const lowerText = text.toLowerCase();
  if (lowerText.includes('combat') || lowerText.includes('attack') || lowerText.includes('damage')) {
    return 'combat';
  } else if (lowerText.includes('"') && (lowerText.includes('says') || lowerText.includes('asks'))) {
    return 'dialogue';
  } else if (lowerText.includes('you see') || lowerText.includes('the room') || lowerText.includes('ahead')) {
    return 'narrative';
  } else {
    return 'narrative';
  }
}

function determineSoundEffects(text: string): string[] {
  const sounds: string[] = [];
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('combat') || lowerText.includes('sword') || lowerText.includes('attack')) {
    sounds.push('sword_clash', 'battle_cry');
  }
  if (lowerText.includes('magic') || lowerText.includes('spell')) {
    sounds.push('magic_whoosh', 'mystical_chime');
  }
  if (lowerText.includes('door') || lowerText.includes('open')) {
    sounds.push('door_creak');
  }
  if (lowerText.includes('fire') || lowerText.includes('torch')) {
    sounds.push('fire_crackle');
  }
  
  return sounds;
}

function determineVisualEffects(text: string): string[] {
  const effects: string[] = [];
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('magic') || lowerText.includes('spell')) {
    effects.push('magic_sparkles', 'mystical_glow');
  }
  if (lowerText.includes('combat') || lowerText.includes('attack')) {
    effects.push('impact_flash', 'weapon_trail');
  }
  if (lowerText.includes('fire') || lowerText.includes('torch')) {
    effects.push('flickering_light', 'warm_glow');
  }
  if (lowerText.includes('dark') || lowerText.includes('shadow')) {
    effects.push('eerie_darkness', 'shadow_movement');
  }
  
  return effects;
}
