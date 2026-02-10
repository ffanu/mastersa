
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3, initialDelay = 1000): Promise<T> {
  let lastError: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      const isQuotaError = error?.message?.includes('429') || error?.status === 429 || error?.code === 429;
      
      if (i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i) * (isQuotaError ? 2 : 1);
        console.warn(`Kesalahan API Gemini (percobaan ${i + 1}/${maxRetries}). Mengulang dalam ${delay}ms...`, error.message);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        break;
      }
    }
  }
  throw lastError;
}

export const getAIInsights = async (context: string, data: any) => {
  try {
    const fetchAction = async () => {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Konteks: ${context}. Data: ${JSON.stringify(data)}. Hasilkan 3 wawasan strategis atau peringatan untuk manajer ERP berdasarkan data ini. Kembalikan dalam format JSON. GUNAKAN BAHASA INDONESIA.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                content: { type: Type.STRING },
                severity: { type: Type.STRING, description: "low, medium, or high" }
              },
              required: ["title", "content", "severity"]
            }
          }
        }
      });
      return JSON.parse(response.text || '[]');
    };

    return await withRetry(fetchAction);
  } catch (error: any) {
    console.error("Gemini Error:", error);
    const isQuotaError = error?.message?.includes('429') || error?.status === 429 || error?.code === 429;
    
    if (isQuotaError) {
      return [
        { 
          title: "Kuota AI Habis", 
          content: "AI saat ini mencapai batas pemrosesan. Wawasan strategis akan kembali setelah kuota direset.", 
          severity: "medium" 
        }
      ];
    }

    return [
      { 
        title: "Wawasan Tidak Tersedia", 
        content: "Kami mengalami kendala saat menghubungkan ke mesin kecerdasan. Silakan periksa koneksi Anda.", 
        severity: "low" 
      }
    ];
  }
};
