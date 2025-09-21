
import { GoogleGenAI, Type, GenerateContentResponse, Chat, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

let chatInstance: Chat | null = null;

const getChatInstance = (systemInstruction: string): Chat => {
  if (!chatInstance) {
    chatInstance = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
      },
    });
  }
  return chatInstance;
};

export const generateStory = async (type: string, language: string, craftInfo: string, productInfo: string): Promise<string> => {
  try {
    const prompt = `You are an expert storyteller for artisans. Generate a compelling ${type} in ${language} for an artisan.
    Craft Information: ${craftInfo}
    Product Information: ${productInfo}
    The tone should be emotional and connect with the audience by highlighting the tradition and skill involved.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    return response.text;
  } catch (error) {
    console.error("Error generating story:", error);
    return "Sorry, I couldn't generate a story right now. Please try again later.";
  }
};

export const generateMarketingContent = async (platform: string, promotion: string, language: string, productInfo: string): Promise<any> => {
    try {
        const prompt = `Act as a social media marketing expert for artisans. Generate an engaging ${platform} post for a ${productInfo} to promote during ${promotion} in ${language}.
        Include a compelling call-to-action, 3-5 trending and relevant hashtags, and 5-7 keywords for SEO.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        postCopy: { type: Type.STRING, description: 'The main text for the social media post.'},
                        hashtags: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'An array of relevant hashtags.' },
                        keywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'An array of SEO keywords.' },
                    }
                }
            }
        });
        
        return JSON.parse(response.text);

    } catch (error) {
        console.error("Error generating marketing content:", error);
        return { postCopy: "Error generating content.", hashtags: [], keywords: [] };
    }
};

export const getMarketTrends = async (): Promise<any> => {
    try {
        const prompt = `As a market trend analyst for the global artisan and handmade craft sector, provide a report on current consumer trends. 
        Focus on: 
        1. Three trending product categories that artisans can adapt their skills to (e.g., eco-friendly home décor).
        2. A popular color palette for the upcoming season with 3-4 color names.
        3. A brief demand forecast for the next 3 months, highlighting a key opportunity.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        productCategories: { type: Type.ARRAY, items: { type: Type.STRING, description: "A trending product category." } },
                        colorPalette: { type: Type.ARRAY, items: { type: Type.STRING, description: "A popular color." } },
                        demandForecast: { type: Type.STRING, description: "A brief forecast summary." },
                    }
                }
            }
        });

        return JSON.parse(response.text);

    } catch (error) {
        console.error("Error getting market trends:", error);
        return { productCategories: [], colorPalette: [], demandForecast: "Could not retrieve trend data." };
    }
};

export const suggestPrice = async (craftType: string, materialCost: string, hours: string): Promise<any> => {
    try {
        const prompt = `You are an e-commerce pricing expert for handmade goods. Based on the following details, suggest a competitive price range (minimum, recommended, premium) in USD.
        Craft Type: ${craftType}
        Materials Cost (USD): ${materialCost}
        Time Spent (hours): ${hours}
        Consider market demand, perceived value, artisan skill, and provide a short justification for the recommended price.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        minPrice: { type: Type.NUMBER },
                        recommendedPrice: { type: Type.NUMBER },
                        premiumPrice: { type: Type.NUMBER },
                        justification: { type: Type.STRING },
                    }
                }
            }
        });
        
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error suggesting price:", error);
        return { minPrice: 0, recommendedPrice: 0, premiumPrice: 0, justification: "Could not generate a price suggestion." };
    }
};

export const editImage = async (base64Image: string, mimeType: string, prompt: string): Promise<string | null> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    { inlineData: { data: base64Image, mimeType: mimeType } },
                    { text: prompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
        return null;

    } catch (error) {
        console.error("Error editing image:", error);
        return null;
    }
};

export const streamChatResponse = (message: string) => {
  const systemInstruction = `You are a helpful AI assistant for artisans using this platform. Your name is 'Karigar Sahayak' (Artisan's Helper). Answer questions about setting up a digital shop, marketing tips, pricing, logistics, and how to use the features of this app. Keep your answers clear, concise, and encouraging.`;
  const chat = getChatInstance(systemInstruction);
  return chat.sendMessageStream({ message });
};
