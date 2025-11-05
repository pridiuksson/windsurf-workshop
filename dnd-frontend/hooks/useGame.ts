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

    } catch (error) {
      console.error('Error joining slot:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle sending a message
  const handleSendMessage = async (content: string) => {
    if (!currentPlayer) return;

    setLoading(true);
    try {
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

      // Save to database
      const { data, error } = await supabase
        .from('messages')
        .insert([newMessage])
        .select()
        .single();

      if (error) throw error;

      // Update local state
      setMessages(prev => [...prev, data]);

      // TODO: Send to AI service for DM response
      // await sendToAIService(content);

    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    players,
    currentPlayerId,
    currentPlayer,
    messages,
    loading,
    handleJoinSlot,
    handleSendMessage
  };
}
