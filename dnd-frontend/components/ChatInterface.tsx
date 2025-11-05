"use client";

import { useState, useRef, useEffect } from "react";
import { Message } from "@/types/game";
import ChatMessage from "./ChatMessage";
import { Send } from "lucide-react";

interface ChatInterfaceProps {
  messages: Message[];
  currentPlayerId?: string;
  onSendMessage: (content: string) => void;
}

export default function ChatInterface({ messages, currentPlayerId, onSendMessage }: ChatInterfaceProps) {
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      onSendMessage(messageInput);
      setMessageInput("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            currentPlayerId={currentPlayerId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder:text-gray-500"
          />
          <button
            type="submit"
            disabled={!messageInput.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <span className="hidden sm:inline">Send</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
