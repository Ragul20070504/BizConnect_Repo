// components/ChatBubble.tsx
"use client";

import { useState } from "react";
import { Send } from "lucide-react"; // nice icon
import { chatbot } from "@/lib/chatbot"; // your OpenRouter API call

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // add user message
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    // get bot reply
    const reply = await chatbot(input);
    setMessages([...newMessages, { role: "assistant", content: reply }]);
  };

  return (
    <div className="fixed bottom-5 right-5">
      {/* Bubble button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center"
      >
        💬
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-2xl shadow-xl flex flex-col mt-2">
          <div className="p-3 border-b font-semibold bg-blue-600 text-white rounded-t-2xl">
            AI Chatbot
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-2 border-t flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 text-sm border rounded-lg"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="ml-2 p-2 bg-blue-600 text-white rounded-lg"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

