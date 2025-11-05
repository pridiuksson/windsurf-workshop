"use client";

import { useState } from "react";
import PlayerSlot from "@/components/PlayerSlot";
import ChatInterface from "@/components/ChatInterface";
import PlayerStats from "@/components/PlayerStats";
import { Player, Message } from "@/types/game";
import { Gamepad2 } from "lucide-react";

export default function Home() {
  const [players, setPlayers] = useState<(Player | null)[]>([null, null, null, null]);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | undefined>();
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      game_id: "game-1",
      player_id: undefined,
      content: "Dragon is waiting for you.",
      message_type: "dungeon_master",
      is_private: false,
      metadata: "{}",
      created_at: new Date().toISOString(),
      player_name: "Dungeon Master"
    }
  ]);

  // Handle joining a slot
  const handleJoinSlot = (slotNumber: number) => {
    const newPlayer: Player = {
      id: `player-${slotNumber}`,
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

    const newPlayers = [...players];
    newPlayers[slotNumber - 1] = newPlayer;
    setPlayers(newPlayers);
    setCurrentPlayerId(newPlayer.id);
    setCurrentPlayer(newPlayer);

    // Add system message
    const joinMessage: Message = {
      id: `msg-${Date.now()}`,
      game_id: "game-1",
      content: `${newPlayer.character_name} has joined the game!`,
      message_type: "system",
      is_private: false,
      metadata: "{}",
      created_at: new Date().toISOString()
    };
    setMessages([...messages, joinMessage]);
  };

  // Handle sending a message
  const handleSendMessage = (content: string) => {
    if (!currentPlayer) return;

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

    setMessages([...messages, newMessage]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Gamepad2 className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">D&D Adventure</h1>
          </div>
          <p className="text-purple-300">Join a slot and start your adventure!</p>
        </div>

        {/* Player Slots */}
        <div className="mb-6">
          <div className="flex gap-3 justify-center flex-wrap">
            {[1, 2, 3, 4].map((slotNumber) => (
              <PlayerSlot
                key={slotNumber}
                slotNumber={slotNumber}
                player={players[slotNumber - 1]}
                onJoinSlot={handleJoinSlot}
              />
            ))}
          </div>
        </div>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-250px)]">
          {/* Chat Interface - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2 h-full">
            <ChatInterface
              messages={messages}
              currentPlayerId={currentPlayerId}
              onSendMessage={handleSendMessage}
            />
          </div>

          {/* Player Stats - Takes up 1 column on large screens */}
          <div className="h-full">
            <PlayerStats player={currentPlayer} />
          </div>
        </div>
      </div>
    </div>
  );
}
