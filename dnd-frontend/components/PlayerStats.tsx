"use client";

import { Player } from "@/types/game";
import { Heart, Droplet, Sword, Eye, Brain, Award, Smile, Coins, TrendingUp } from "lucide-react";

interface PlayerStatsProps {
  player: Player | null;
}

export default function PlayerStats({ player }: PlayerStatsProps) {
  if (!player) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 h-full flex items-center justify-center">
        <div className="text-center text-gray-400">
          <p className="text-lg">No player selected</p>
          <p className="text-sm mt-2">Join a slot to view your stats</p>
        </div>
      </div>
    );
  }

  const statItems = [
    { label: "HP", value: `${player.health}/${player.max_health}`, icon: Heart, color: "text-red-500" },
    { label: "Mana", value: `${player.mana}/${player.max_mana}`, icon: Droplet, color: "text-blue-500" },
    { label: "STR", value: player.strength, icon: Sword, color: "text-orange-500" },
    { label: "DEX", value: player.dexterity, icon: Eye, color: "text-green-500" },
    { label: "INT", value: player.intelligence, icon: Brain, color: "text-purple-500" },
    { label: "WIS", value: player.wisdom, icon: Award, color: "text-yellow-500" },
    { label: "CHA", value: player.charisma, icon: Smile, color: "text-pink-500" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full overflow-y-auto">
      {/* Character Header */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{player.character_name}</h2>
        <div className="flex items-center gap-3 mt-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {player.class}
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            Level {player.level}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Stats</h3>
        <div className="grid grid-cols-2 gap-3">
          {statItems.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-xs font-medium text-gray-500">{stat.label}</span>
                </div>
                <p className="text-lg font-bold text-gray-800">{stat.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">Gold</span>
          </div>
          <span className="text-lg font-bold text-yellow-700">{player.gold}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Experience</span>
          </div>
          <span className="text-lg font-bold text-green-700">{player.experience_points} XP</span>
        </div>
      </div>
    </div>
  );
}
