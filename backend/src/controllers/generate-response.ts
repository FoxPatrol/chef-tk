import DatabaseConnector from "@db/connector";
import { getSchemaContents } from "@db/helperFunctions";
import { model } from "@models/gemini";
import { Request, Response } from "express";

const queryErrorRetries = 3;

class GenerateResponseController {
  postGenerateResponse = async (req: Request, res: Response): Promise<any> => {
    try {
      // Get the prompt from the request body
      const { prompt, extra = [] } = req.body;

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

      //const result = await model.generateContent(fullPrompt);
      const session = model.startChat();
      let result = await session.sendMessage(fullPrompt);

      const responseText = result.response.text();
      console.log({ responseText });

      //let sqlQuery: string = JSON.parse(responseText || "").command;
      let sqlQuery: string = responseText;
      sqlQuery = this.removeInnerSingleQuotes(sqlQuery);
      sqlQuery = this.removeCodeFencing(sqlQuery);
      sqlQuery = this.replaceDoubleBackslashesForSingleBackslashes(sqlQuery);
      sqlQuery = this.replaceDoubleQuoteForSingleQuote(sqlQuery);
      console.log({ sqlQuery });

      const connector = DatabaseConnector.getInstance();
      await connector.connect();

      let response: any[] | null = null;
      for (let index = 0; index < queryErrorRetries; index++) {
        console.log({ try: index });
        try {
          response = await connector.query(sqlQuery);
          break;
        } catch (error: any) {
          const fullErrorMessage = String(error);
          console.log({ fullErrorMessage });

          const resultRetry = await session.sendMessage(fullErrorMessage);
          const responseTextRetry = resultRetry.response.text();
          console.log({ responseTextRetry });

          let sqlQuery: string = responseTextRetry;
          sqlQuery = this.removeInnerSingleQuotes(sqlQuery);
          sqlQuery = this.removeCodeFencing(sqlQuery);
          sqlQuery =
            this.replaceDoubleBackslashesForSingleBackslashes(sqlQuery);
          sqlQuery = this.replaceDoubleQuoteForSingleQuote(sqlQuery);
          console.log({ sqlQuery });
        }
      }

      if (response === null) {
        return res
          .status(500)
          .send({ error: "Could not generate a response", sqlQuery });
      }

      return res.status(200).send({ response, sqlQuery });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .send({ error: "An error occurred while generating the response" });
    }
  };

  private removeInnerSingleQuotes(str: string): string {
    // eg. Cho'Gath -> ChoGath
    return str.replace(/(?<=[a-zA-Z])'(?=[a-zA-Z])/g, "");
  }

  private removeCodeFencing(str: string): string {
    // eg. ```sql bla bla ``` -> bla bla
    return str.replace(/^\s*```[\w+]*\n([\s\S]*?)\n\s*```\s*$/gm, "$1");
  }

  private replaceDoubleBackslashesForSingleBackslashes(str: string): string {
    // eg. Cho\\'Gath -> Cho\'Gath
    return str.replace(/\\\\/g, "\\");
  }

  private replaceDoubleQuoteForSingleQuote(str: string): string {
    // eg. Cho''Gath -> Cho'Gath
    return str.replace(/''/g, "'");
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
