"use client";

import { Message } from "@/types/game";
import { cn } from "@/lib/utils";
import { Shield, User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  currentPlayerId?: string;
}

export default function ChatMessage({ message, currentPlayerId }: ChatMessageProps) {
  const isCurrentPlayer = message.player_id === currentPlayerId;
  const isDungeonMaster = message.message_type === 'dungeon_master';
  const isSystem = message.message_type === 'system';

  const getMessageIcon = () => {
    if (isDungeonMaster) return <Shield className="w-4 h-4" />;
    if (isSystem) return <Bot className="w-4 h-4" />;
    return <User className="w-4 h-4" />;
  };

  const getMessageColor = () => {
    if (isDungeonMaster) return "bg-purple-500";
    if (isSystem) return "bg-gray-500";
    if (isCurrentPlayer) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <div
      className={cn(
        "flex gap-3 mb-4 animate-in slide-in-from-bottom-2",
        isCurrentPlayer && "flex-row-reverse"
      )}
    >
      <div className={cn(
        "shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white",
        getMessageColor()
      )}>
        {getMessageIcon()}
      </div>
      
      <div className={cn(
        "flex flex-col max-w-[70%]",
        isCurrentPlayer && "items-end"
      )}>
        <div className="text-xs text-gray-500 mb-1 px-2">
          {isDungeonMaster ? "Dungeon Master" : 
           isSystem ? "System" : 
           message.character_name || message.player_name || "Unknown"}
        </div>
        
        <div className={cn(
          "rounded-2xl px-4 py-2 text-white shadow-md",
          getMessageColor(),
          isCurrentPlayer ? "rounded-tr-sm" : "rounded-tl-sm"
        )}>
          <p className="text-sm wrap-break-word">{message.content}</p>
        </div>
        
        <div className="text-xs text-gray-400 mt-1 px-2">
          {new Date(message.created_at).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
}
