
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile } from "../types";

export const getGeminiResponse = async (
  prompt: string, 
  userProfile: UserProfile, 
  context: any
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are ALBI (Albany Living Behavioral Intelligence), a sovereign urban companion for Downtown Albany.
    User Name: ${userProfile.name}
    User Interests: ${userProfile.interests.join(', ')}
    User Goals: ${userProfile.goals.join(', ')}
    Current Context: ${JSON.stringify(context)}

    Your mission: 
    1. Increase downtown dwell time and local spending.
    2. Provide hyper-contextual recommendations based on user's available "minutes free".
    3. Be warm, intelligent, and sovereign (user-aligned, not corporate).
    4. Use local Albany lore and facts (RAG provided in context).
    5. Encourage booking "Champions" for real human experiences.

    Special Tooling: You have access to Google Maps grounding. Use it for spatial queries, restaurant hours, or navigation-related questions.
    
    Safety: If data is missing, say "I don't have that feed yet" and suggest a logical alternative.
    Keep responses concise and mobile-friendly.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: 42.6526, // Center of Albany
              longitude: -73.7562
            }
          }
        }
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a brief connection issue with the Albany grid. Let me try that again in a second.";
  }
};
