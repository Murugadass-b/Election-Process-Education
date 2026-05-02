import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini API client
// IMPORTANT: In a real production app, you would never expose the API key in the frontend.
// This should go through a secure backend. For the sake of this hackathon, we use Vite env vars.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

// Fallback logic if API key is missing
export const generateCivicResponse = async (step, userQuery = null) => {
  if (!apiKey) {
    console.warn("Gemini API key missing. Returning simulated response.");
    return simulateResponse(step, userQuery);
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    let prompt = "";
    if (userQuery) {
      prompt = `You are a helpful, encouraging Civic Guide focusing on the Indian democratic process. The user is currently learning about the "${step.title}" step of the Indian Election process. They asked: "${userQuery}". Answer concisely (under 4 sentences), in a friendly tone. Mention specific Indian entities if relevant (ECI, EVM, VVPAT, Form 6).`;
    } else {
      prompt = `You are a helpful Civic Guide. The user just navigated to the "${step.title}" step of the Indian Election process. Provide a very brief (2-3 sentences) encouraging welcome to this step, and mention one interesting fact about it in the context of the Indian democratic framework.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I seem to be having trouble connecting to the Election Commission database right now. Please try again later!";
  }
};

const simulateResponse = (step, userQuery) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (userQuery) {
        resolve(`That's a great question about ${step.title}! While I am running in simulation mode, I encourage you to check out the official Election Commission of India (eci.gov.in) website for detailed information.`);
      } else {
        resolve(`Namaste! Welcome to the ${step.title} stage. This is a crucial part of the Indian democratic process, the largest democratic exercise in the world!`);
      }
    }, 1000);
  });
};
