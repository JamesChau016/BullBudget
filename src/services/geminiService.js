import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: API_KEY
});

const SYSTEM_PROMPT = `
You are BullBudget AI — a friendly, expert financial assistant.
Your job is to help users:
- manage their money
- create budgets
- analyze spending
- explain financial concepts simply
Tone: warm, simple, encouraging.
Never provide legal or investment guarantees.
ALWAYS use Markdown formatting: **bold** for key terms, *italics* for emphasis, bullet points for lists, \`code\` for numbers.
Make answers concise and easy to understand. Don't reply too long.
`;

export const chatWithGemini = async (message, history = []) => {
  try {
    console.log("Sending to Gemini:", message);

    // build conversation
    const contents = [];

    // system (role = “model”)
    contents.push({
      role: "model",
      parts: [{ text: SYSTEM_PROMPT }]
    });

    // history
    history.forEach(msg => {
      contents.push({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      });
    });

    // current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    // call Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents
    });

    return {
      success: true,
      response: response.text
    };
  } catch (err) {
    console.error("Gemini error:", err);
    return {
      success: false,
      error: "Service not available. Try again."
    };
  }
};
