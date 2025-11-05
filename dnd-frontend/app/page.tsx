"use client";

import { useState } from "react";
import PlayerSlot from "@/components/PlayerSlot";
import ChatInterface from "@/components/ChatInterface";
import PlayerStats from "@/components/PlayerStats";
import CharacterCreation from "@/components/CharacterCreation";
import { Player, Message } from "@/types/game";
import { Gamepad2, User, LogOut } from "lucide-react";
import { getDeviceId, storePlayerSession, getPlayerSession, clearPlayerSession } from "@/lib/device";

export default function Home() {
  // Initialize state synchronously to avoid effect issues
  const [players, setPlayers] = useState<(Player | null)[]>([null, null, null, null]);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | undefined>(() => getPlayerSession() || undefined);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [deviceId] = useState<string>(() => getDeviceId());
  const [showCharacterCreation, setShowCharacterCreation] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      game_id: "game-1",
      player_id: undefined,
      content: "Welcome to the D&D Adventure! Each player uses their own device.",
      message_type: "dungeon_master",
      is_private: false,
      metadata: "{}",
      created_at: new Date().toISOString(),
      player_name: "Dungeon Master"
    }
  ]);

  // Handle joining a slot
  const handleJoinSlot = (slotNumber: number) => {
    // Check if slot is already occupied
    if (players[slotNumber - 1]) {
      alert("This slot is already occupied by another player!");
      return;
    }

    setSelectedSlot(slotNumber);
    setShowCharacterCreation(true);
  };

  // Handle character creation
  const handleCreateCharacter = (character: Omit<Player, 'id' | 'created_at' | 'updated_at'>) => {
    if (selectedSlot === null) return;

    const newPlayer: Player = {
      ...character,
      id: `player-${deviceId}-${selectedSlot}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const newPlayers = [...players];
    newPlayers[selectedSlot - 1] = newPlayer;
    setPlayers(newPlayers);
    setCurrentPlayerId(newPlayer.id);
    setCurrentPlayer(newPlayer);
    
    // Store player session
    storePlayerSession(newPlayer.id);

    // Add system message
    const joinMessage: Message = {
      id: `msg-${Date.now()}`,
      game_id: "game-1",
      content: `${newPlayer.character_name} the ${newPlayer.class} has joined the game from device ${deviceId.substring(0, 8)}...`,
      message_type: "system",
      is_private: false,
      metadata: "{}",
      created_at: new Date().toISOString()
    };
    setMessages([...messages, joinMessage]);
    
    setSelectedSlot(null);
  };

  // Handle leaving the game
  const handleLeaveGame = () => {
    if (!currentPlayer) return;
    
    // Remove player from slot
    const newPlayers = players.map(p => 
      p?.id === currentPlayer.id ? null : p
    );
    setPlayers(newPlayers);
    
    // Clear current player
    setCurrentPlayer(null);
    setCurrentPlayerId(undefined);
    clearPlayerSession();
    
    // Add system message
    const leaveMessage: Message = {
      id: `msg-${Date.now()}`,
      game_id: "game-1",
      content: `${currentPlayer.character_name} has left the game.`,
      message_type: "system",
      is_private: false,
      metadata: "{}",
      created_at: new Date().toISOString()
    };
    setMessages([...messages, leaveMessage]);
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
          <p className="text-purple-300 mb-4">One device per player. Join a slot to start!</p>
          
          {/* Device Info */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-4">
            <User className="w-4 h-4" />
            <span>Device ID: {deviceId.substring(0, 12)}...</span>
            {currentPlayer && (
              <button
                onClick={handleLeaveGame}
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" />
                Leave Game
              </button>
            )}
          </div>
        </div>

        {/* Player Slots */}
        <div className="mb-6">
          <div className="flex gap-3 justify-center flex-wrap">
            {[1, 2, 3, 4].map((slotNumber) => (
              <PlayerSlot
                key={slotNumber}
                slotNumber={slotNumber}
                player={players[slotNumber - 1]}
                onJoinSlot={currentPlayer ? undefined : handleJoinSlot}
                isCurrentDevice={players[slotNumber - 1]?.device_id === deviceId}
              />
            ))}
          </div>
          {currentPlayer && (
            <p className="text-center text-green-400 text-sm mt-2">
              You are playing as {currentPlayer.character_name} in slot {players.findIndex(p => p?.id === currentPlayer.id) + 1}
            </p>
          )}
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

        {/* Character Creation Modal */}
        <CharacterCreation
          isOpen={showCharacterCreation}
          onClose={() => {
            setShowCharacterCreation(false);
            setSelectedSlot(null);
          }}
          onCreateCharacter={handleCreateCharacter}
          deviceId={deviceId}
        />
      </div>
    </div>
  );
}
