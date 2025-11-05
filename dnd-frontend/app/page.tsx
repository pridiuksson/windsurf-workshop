"use client";

import PlayerSlot from "@/components/PlayerSlot";
import ChatInterface from "@/components/ChatInterface";
import PlayerStats from "@/components/PlayerStats";
import { useGame } from "@/hooks/useGame";
import { Gamepad2, Play } from "lucide-react";

export default function Home() {
  const {
    players,
    currentPlayerId,
    currentPlayer,
    messages,
    loading,
    gameStarted,
    handleJoinSlot,
    handleSendMessage,
    startAdventure
  } = useGame();

  const hasPlayers = players.some(p => p !== null);
  const canStartAdventure = hasPlayers && !gameStarted;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Gamepad2 className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">D&D Adventure</h1>
          </div>
          <p className="text-purple-300 mb-4">Multiplayer D&D Game with AI Dungeon Master</p>
          
          {/* Start Adventure Button */}
          {canStartAdventure && (
            <button
              onClick={startAdventure}
              disabled={loading}
              className="mb-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              <Play className="w-5 h-5" />
              {loading ? "Starting Adventure..." : "Start Adventure"}
            </button>
          )}
          
          {gameStarted && (
            <p className="text-green-400 text-sm font-semibold animate-pulse">
              🎲 Adventure in Progress! The Dungeon Master awaits your actions...
            </p>
          )}
          
          {currentPlayer && (
            <p className="text-center text-green-400 text-sm mt-2">
              You are playing as {currentPlayer.character_name} the {currentPlayer.class}
            </p>
          )}
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
                isCurrentDevice={players[slotNumber - 1]?.id === currentPlayerId}
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
              disabled={!gameStarted && !canStartAdventure}
              placeholder={
                !gameStarted && !canStartAdventure
                  ? "Join a game slot first..."
                  : !gameStarted
                  ? "Start the adventure to begin playing!"
                  : "What do you want to do?"
              }
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
