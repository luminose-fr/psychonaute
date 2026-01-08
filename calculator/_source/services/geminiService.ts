import { GoogleGenAI, Type } from "@google/genai";
import { SafetyAdviceResponse } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const getHarmReductionAdvice = async (
  substance: string,
  amount: string,
  weight: number | null
): Promise<SafetyAdviceResponse> => {
  try {
    const ai = getClient();
    
    const prompt = `
      Agis comme un guide expert en réduction des risques (Trip Sitter).
      L'utilisateur prévoit de prendre : ${amount} de ${substance}.
      ${weight ? `Poids de l'utilisateur : ${weight}kg.` : ''}
      
      Fournis une réponse structurée JSON contenant :
      1. 'effects': Une liste de 3 à 5 effets principaux attendus à ce dosage.
      2. 'advice': Un paragraphe court (max 50 mots) de conseils de sécurité cruciaux (Set & Setting).
      3. 'duration': La durée estimée du trip.
      
      Sois objectif, bienveillant, et scientifique. Ne juge pas.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            effects: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            advice: { type: Type.STRING },
            duration: { type: Type.STRING }
          },
          required: ["effects", "advice", "duration"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as SafetyAdviceResponse;
    }
    
    throw new Error("No response text generated");
  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback in case of error
    return {
      effects: ["Erreur de chargement des effets", "Consultez des sources fiables"],
      advice: "Impossible de contacter l'assistant IA. Restez prudent, hydratez-vous et assurez-vous d'être dans un environnement sûr.",
      duration: "Inconnue"
    };
  }
};