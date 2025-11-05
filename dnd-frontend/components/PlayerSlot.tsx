"use client";

import { Player } from "@/types/game";
import { User, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerSlotProps {
  slotNumber: number;
  player?: Player | null;
  onJoinSlot?: (slotNumber: number) => void;
}

export default function PlayerSlot({ slotNumber, player, onJoinSlot }: PlayerSlotProps) {
  const isOccupied = !!player;

  return (
    <button
      onClick={() => !isOccupied && onJoinSlot?.(slotNumber)}
      className={cn(
        "flex items-center justify-center px-6 py-3 rounded-lg border-2 transition-all",
        "min-w-[120px] font-medium",
        isOccupied
          ? "bg-blue-500 border-blue-600 text-white cursor-default"
          : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 hover:border-gray-400 cursor-pointer"
      )}
      disabled={isOccupied}
    >
      {isOccupied ? (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span className="text-sm">{player.character_name || `Player ${slotNumber}`}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          <span className="text-sm">{slotNumber}</span>
        </div>
      )}
    </button>
  );
}
