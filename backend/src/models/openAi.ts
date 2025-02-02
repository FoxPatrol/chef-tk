import OpenAI from "openai";
import { z } from "zod";
import env from "@utils/config";

const ResponseSchema = z.object({
  description: z.string(),
  command: z.string(),
});

export const model = new OpenAI({ apiKey: env.OPEN_AI_API_KEY });

/*
import { zodResponseFormat } from "openai/helpers/zod";

// Use Open Ai
const result = await openai.chat.completions.create({
model: "gpt-4o",
messages: [{ role: "user", content: fullPrompt }],
response_format: zodResponseFormat(ResponseSchema, "sql_query"),
});

const responseText = result.choices[0].message.content
console.log({ responseText });
*/
