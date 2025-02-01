import DatabaseConnector from "@db/connector";
import { getSchemaContents } from "@db/helperFunctions";
import db from "@db/index";
import {
  GenerationConfig,
  GoogleGenerativeAI,
  ResponseSchema,
  SchemaType,
} from "@google/generative-ai";
import { Request, Response } from "express";

const apiKey = process.env.GEMINI_API_KEY!;
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

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig,
});

class GenerateResponseController {
  postGenerateResponse = async (req: Request, res: Response): Promise<any> => {
    try {
      // Get the prompt from the request body
      const { prompt, extra } = req.body;

      if (!prompt) {
        return res.status(400).send({ error: "Prompt is required" });
      }

      if (
        !Array.isArray(extra) ||
        !extra.every((item) => typeof item === "string")
      ) {
        return res
          .status(400)
          .send({ error: "Extra must be an array of strings" });
      }

      const schema = await getSchemaContents();
      const fullPrompt = this.constructPrompt(schema, prompt, extra);

      // Start a new chat session
      const result = await model.generateContent(fullPrompt);

      // Extract the response and send it back
      const responseText = result.response.text();
      console.log({ responseText });

      let sqlQuery: string = JSON.parse(responseText).command;
      sqlQuery = this.removeInnerSingleQuotes(sqlQuery);
      console.log({ sqlQuery });

      const connector = DatabaseConnector.getInstance();
      await connector.connect();
      const response = await connector.query(sqlQuery);

      return res.status(200).send({ response });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .send({ error: "An error occurred while generating the response" });
    }
  };

  private removeInnerSingleQuotes(str: string): string {
    return str.replace(/(?<=[a-zA-Z])'(?=[a-zA-Z])/g, "");
  }

  private constructPrompt(
    schema: string,
    prompt: string,
    extra: string[] | undefined
  ): string {
    return `This is the model of a Postgresql schema:
      ------------------------------------
      ${schema}
      ------------------------------------

      Generate a PostgreSQL query to answer a question. Always use quotes around column names.
      When getting item information, grab from the table "items" and connect with the properties in the table "participants".
      If given a name, search for "championName", unless told otherwise. Always use LOWER() when comparing text.
      If the user asks for "rune", then its "perk".

      ${
        extra &&
        extra.map((item) => {
          return `${item}\n`;
        })
      }

      Question:
      "${prompt}"
    `;
  }
}

export default GenerateResponseController;
