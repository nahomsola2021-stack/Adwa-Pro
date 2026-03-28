import { GoogleGenAI } from "@google/genai";

export const generateSummary = async (title: string, content: string): Promise<string> => {
    // Fix: Use process.env.API_KEY and handle its absence as per guidelines.
    if (!process.env.API_KEY) {
        console.warn("Gemini API key is not set. Skipping summary generation.");
        return "AI summary generation is not configured.";
    }

    try {
        // Fix: Initialize GoogleGenAI with API key from environment variables.
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Create a concise, engaging, one-paragraph summary for the following news article. Title: "${title}". Content: "${content}"`;
        
        // Fix: Use the recommended gemini-2.5-flash model and modern API call structure.
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        // Fix: Extract text directly from the response object.
        const summary = response.text;

        if (!summary) {
            console.warn('Gemini API returned no candidates. This may be due to safety settings or a blocked prompt.');
            return 'Could not generate AI summary because the content was blocked.';
        }
        return summary.trim();
    } catch (error) {
        console.error("Failed to fetch from Gemini API:", error);
        // Fix: Provide more specific error message from the caught error object.
        if (error instanceof Error) {
             return `Could not generate AI summary due to a network or API error: ${error.message}`;
        }
        return "Could not generate AI summary due to a network or API error.";
    }
};
