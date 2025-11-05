"use client";

import { Player } from "@/types/game";
import { User, UserPlus, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerSlotProps {
  slotNumber: number;
  player?: Player | null;
  onJoinSlot?: (slotNumber: number) => void;
  isCurrentDevice?: boolean;
}

export default function PlayerSlot({ slotNumber, player, onJoinSlot, isCurrentDevice }: PlayerSlotProps) {
  const isOccupied = !!player;

  return (
    <button
      onClick={() => !isOccupied && onJoinSlot?.(slotNumber)}
      className={cn(
        "flex flex-col items-center justify-center px-4 py-3 rounded-lg border-2 transition-all",
        "min-w-[120px] font-medium relative",
        isOccupied
          ? isCurrentDevice
            ? "bg-green-500 border-green-600 text-white cursor-default"
            : "bg-blue-500 border-blue-600 text-white cursor-default"
          : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 hover:border-gray-400 cursor-pointer"
      )}
      disabled={isOccupied}
    >
      {isOccupied ? (
        <>
          <div className="flex items-center gap-2 mb-1">
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">{player.character_name || `Player ${slotNumber}`}</span>
          </div>
          <div className="flex items-center gap-1 text-xs opacity-90">
            {player.is_online ? (
              <>
                <Wifi className="w-3 h-3" />
                <span>Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3" />
                <span>Offline</span>
              </>
            )}
          </div>
          {isCurrentDevice && (
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white" title="Your device" />
          )}
        </>
      ) : (
        <div className="flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          <span className="text-sm">{slotNumber}</span>
        </div>
      )}
    </button>
  );
}
