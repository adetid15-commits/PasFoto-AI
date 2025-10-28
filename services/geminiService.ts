
import { GoogleGenAI, Modality } from "@google/genai";
import { Gender } from '../types';

const fileToGenerativePart = (base64Data: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
};

export const generatePasFoto = async (
  imageDataUrl: string,
  gender: Gender,
  backgroundColor: 'red' | 'blue'
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API key not found. Please set the API_KEY environment variable.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const [metadata, base64Data] = imageDataUrl.split(',');
  const mimeType = metadata.split(';')[0].split(':')[1];
  
  if (!base64Data || !mimeType) {
    throw new Error("Invalid image data URL.");
  }

  const imagePart = fileToGenerativePart(base64Data, mimeType);

  const outfitDescription =
    gender === Gender.MALE
      ? 'jas hitam formal, kemeja putih berkerah, dan dasi gelap yang rapi'
      : 'jas hitam formal yang cocok untuk wanita, dengan kemeja putih sopan di dalamnya';

  const prompt = `
    Anda adalah seorang ahli editor foto profesional. Ubah gambar yang diunggah pengguna menjadi pas foto formal Indonesia.
    Ikuti instruksi ini dengan tepat:
    1.  **Latar Belakang:** Ganti seluruh latar belakang dengan warna solid dan seragam: ${backgroundColor}.
    2.  **Pakaian:** Subjek adalah ${gender}. Kenakan mereka ${outfitDescription}. Pakaian baru harus terlihat menyatu secara alami.
    3.  **Pemotongan & Pembingkaian:** Potong foto dengan rasio pas foto standar (misalnya 3:4). Bingkai harus menunjukkan kepala dan bahu, dengan wajah di tengah dan menghadap lurus ke depan.
    4.  **Kualitas Gambar:** Tingkatkan pencahayaan dan kontras untuk tampilan yang cerah dan profesional. Pastikan wajah fokus dan tidak buram. Hasilnya harus beresolusi tinggi, cocok untuk dicetak pada 300 DPI.
    5.  **Keamanan:** Jangan menghasilkan gambar yang tidak pantas, menyinggung, atau terdistorsi. Hasilnya harus berupa potret yang sopan dan profesional.
    
    Hanya kembalikan gambar yang telah diedit. Jangan kembalikan teks atau penjelasan apa pun.
    `;
    
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          imagePart,
          { text: prompt },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    const generatedPart = response.candidates?.[0]?.content?.parts?.[0];
    if (generatedPart && generatedPart.inlineData) {
      const { data, mimeType } = generatedPart.inlineData;
      return `data:${mimeType};base64,${data}`;
    } else {
      throw new Error("Failed to generate image. The API did not return valid image data.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Gagal menghasilkan foto. Silakan coba lagi.");
  }
};
