import axios from "axios";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  throw new Error("Missing OPENROUTER_API_KEY in environment variables");
}

export async function askChatbot(message: string) {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    },
    {
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
}

