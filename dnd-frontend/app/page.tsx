"use client";

import PlayerSlot from "@/components/PlayerSlot";
import ChatInterface from "@/components/ChatInterface";
import PlayerStats from "@/components/PlayerStats";
import { useGame } from "@/hooks/useGame";
import { Gamepad2 } from "lucide-react";

export default function Home() {
  const {
    players,
    currentPlayerId,
    currentPlayer,
    messages,
    loading,
    handleJoinSlot,
    handleSendMessage
  } = useGame();

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
