import {
  GenerationConfig,
  GoogleGenerativeAI,
  ResponseSchema,
  SchemaType,
} from "@google/generative-ai";
import env from "@utils/config";

const apiKey = env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const responseSchema: ResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    description: {
      type: SchemaType.STRING,
      description:
        "A description of the response in layman terms, 20 words maximum.",
    },
    command: {
      type: SchemaType.STRING,
      description: "The SQL code.",
    },
  },
  required: ["description", "command"],
};

const generationConfig: GenerationConfig = {
  temperature: 0.1,
  topP: 0.95,
  topK: 32,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  responseSchema: responseSchema,
};

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig,
});

/*
// Use Gemini
const result = await model.generateContent(fullPrompt);

// Extract the response and send it back
const responseText = result.response.text();
*/
