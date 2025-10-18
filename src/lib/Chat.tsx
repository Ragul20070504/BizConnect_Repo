import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: "user", text: input }]);

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      // Add bot reply
      setMessages(prev => [...prev, { role: "bot", text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "bot", text: "⚠️ Error connecting to chatbot" }]);
    }

    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white shadow-xl rounded-2xl p-4 flex flex-col">
      <div className="flex-1 overflow-y-auto mb-2 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg ${
              m.role === "user" ? "bg-blue-100 self-end" : "bg-gray-200 self-start"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-lg p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

