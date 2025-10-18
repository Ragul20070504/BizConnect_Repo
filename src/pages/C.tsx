import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-8b-instruct:free",
          messages: [{ role: "user", content: input }],
        }),
      });

      if (!res.ok) throw new Error("API call failed");

      const data = await res.json();
      const botMessage: Message = {
        id: Date.now().toString() + "_bot",
        sender: "bot",
        text: data.choices?.[0]?.message?.content || "Sorry, I didn't understand that.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString() + "_error", sender: "bot", text: "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 max-w-full bg-white shadow-lg rounded-xl flex flex-col overflow-hidden">
      <div className="bg-blue-600 text-white px-4 py-2 font-bold">ChatBot</div>

      <div className="flex-1 p-4 overflow-y-auto h-96">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-2 rounded-lg max-w-[75%] ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <div className="mb-3">Typing...</div>}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="flex border-t border-gray-300 p-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 border rounded-lg"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage} className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

