"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Player, Message } from '@/types/game';

export function useGame() {
  const [players, setPlayers] = useState<(Player | null)[]>([null, null, null, null]);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | undefined>();
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      game_id: "game-1",
      content: "Welcome to D&D Adventure! Join a slot to begin your quest.",
      message_type: "dungeon_master",
      is_private: false,
      metadata: "{}",
      created_at: new Date().toISOString(),
      player_name: "Dungeon Master"
    };
    setMessages([welcomeMessage]);
  }, []);

  // Call Dungeon Master API
  const callDungeonMaster = async (action: string, playerAction?: string) => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/dm/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          game_state: {
            players: players.filter(p => p !== null),
            current_scene: gameStarted ? "Adventure in progress" : "Starting area",
            session_id: "game-1"
          },
          player_action: playerAction,
          player_data: currentPlayer
        }),
      });

      const data = await response.json();
      
      if (data.success && data.response) {
        const dmMessage: Message = {
          id: `dm-${Date.now()}`,
          game_id: "game-1",
          content: data.response.content,
          message_type: "dungeon_master",
          is_private: false,
          metadata: JSON.stringify({
            type: data.response.type,
            sound_effects: data.response.sound_effects || [],
            visual_effects: data.response.visual_effects || []
          }),
          created_at: new Date().toISOString(),
          player_name: "Dungeon Master"
        };
        
        setMessages(prev => [...prev, dmMessage]);
        
        // Update game state if provided
        if (data.response.game_state_updates) {
          // Handle any game state updates here
          if (data.response.game_state_updates.last_action === 'start_adventure') {
            setGameStarted(true);
          }
        }
      }
    } catch (error) {
      console.error('Error calling Dungeon Master:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        game_id: "game-1",
        content: "The Dungeon Master seems to be busy... Try again in a moment!",
        message_type: "system",
        is_private: false,
        metadata: "{}",
        created_at: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Handle joining a slot
  const handleJoinSlot = async (slotNumber: number) => {
    setLoading(true);
    try {
      // Create new player
      const newPlayer: Player = {
        id: `player-${Date.now()}`,
        name: `Player ${slotNumber}`,
        character_name: `Player ${slotNumber}`,
        class: "Warrior",
        level: 1,
        health: 100,
        max_health: 100,
        mana: 20,
        max_mana: 20,
        strength: 16,
        dexterity: 12,
        intelligence: 10,
        wisdom: 12,
        charisma: 14,
        experience_points: 0,
        gold: 50,
        inventory: "[]",
        spells: "[]",
        device_id: `device-${Date.now()}`,
        last_active: new Date().toISOString(),
        is_online: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Save to database
      const { data, error } = await supabase
        .from('players')
        .insert([newPlayer])
        .select()
        .single();

      if (error) throw error;

      // Update local state
      const newPlayers = [...players];
      newPlayers[slotNumber - 1] = data;
      setPlayers(newPlayers);
      setCurrentPlayerId(data.id);
      setCurrentPlayer(data);

      // Add system message
      const joinMessage: Message = {
        id: `msg-${Date.now()}`,
        game_id: "game-1",
        content: `${data.character_name} has joined the game!`,
        message_type: "system",
        is_private: false,
        metadata: "{}",
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, joinMessage]);

      // Start adventure if this is the first player
      const activePlayers = newPlayers.filter(p => p !== null);
      if (activePlayers.length === 1 && !gameStarted) {
        setTimeout(() => {
          callDungeonMaster('start_adventure');
        }, 1000);
      }

    } catch (error) {
      console.error('Error joining slot:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle sending a message
  const handleSendMessage = async (content: string) => {
    if (!currentPlayer) return;

    // Add player message
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      game_id: "game-1",
      player_id: currentPlayer.id,
      content,
      message_type: "player",
      is_private: false,
      metadata: "{}",
      created_at: new Date().toISOString(),
      player_name: currentPlayer.name,
      character_name: currentPlayer.character_name
    };

    setMessages(prev => [...prev, newMessage]);

    // Call Dungeon Master to respond
    await callDungeonMaster('player_action', content);
  };

  // Start the adventure manually
  const startAdventure = async () => {
    if (!gameStarted && players.some(p => p !== null)) {
      await callDungeonMaster('start_adventure');
    }
  };

  return {
    players,
    currentPlayerId,
    currentPlayer,
    messages,
    loading,
    gameStarted,
    handleJoinSlot,
    handleSendMessage,
    startAdventure
  };
}
