import { useState, useEffect, useRef } from "react";
import navigationData from "./navigation.json";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // initially closed
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const query = input.toLowerCase();
      const match = Object.keys(navigationData).find((key) =>
        query.includes(key)
      );

      if (match) {
        const botMessage: Message = {
          id: Date.now().toString() + "_bot",
          sender: "bot",
          text: navigationData[match],
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const res = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_NEXT_PUBLIC_OPENROUTER_API_KEY}`,
            },
            body: JSON.stringify({
              model: "meta-llama/llama-3.3-8b-instruct:free",
              messages: [
                {
                  role: "system",
                  content:
                    "You are a helpful assistant. You can answer business-related questions about our services and company. If the question is irrelevant to business, then ask him politely to ask relevant questions. If the question is about website navigation, refer the user to the navigation system.",
                },
                {
                  role: "user",
                  content: input + " give the response within 200 characters",
                },
              ],
            }),
          }
        );

        if (!res.ok) throw new Error("API call failed");

        const data = await res.json();
        const botMessage: Message = {
          id: Date.now().toString() + "_bot",
          sender: "bot",
          text:
            data.choices?.[0]?.message?.content ||
            "Sorry, I didn't understand that.",
        };

        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "_error",
          sender: "bot",
          text: "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Floating Chatbot Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-7 p-7 rounded-full shadow-lg hover:opacity-90 transition"
          style={{ backgroundColor: "#6b6363", color: "white" }}
          title="Open Chatbot"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.436 0-2.776-.36-3.947-.98L3 21l1.98-4.053C3.36 15.776 3 14.436 3 13c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 max-w-full bg-white shadow-lg rounded-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2 font-bold">
            <span>ChatBot</span>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-200 text-lg"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto h-96">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {msg.sender === "bot" ? (
                    <span>
                      {msg.text.split(" ").map((word, index) => {
                        // Detect paths like /home, /about, etc.
                        if (word.startsWith("/")) {
                          return (
                            <a
                              key={index}
                              href={word}
                              className="text-blue-600 underline"
                            >
                              {word}{" "}
                            </a>
                          );
                        }
                        return word + " ";
                      })}
                    </span>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}
            {loading && <div className="mb-3 text-gray-500">Typing...</div>}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-300 p-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 border rounded-lg"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={sendMessage}
              className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;

