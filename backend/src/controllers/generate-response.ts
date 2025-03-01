import DatabaseConnector from "@db/connector";
import { getSchemaContents } from "@db/helperFunctions";
import { sqlModel, textModel } from "@models/gemini";
import { Request, Response } from "express";

const queryErrorRetries = 3;

class GenerateResponseController {
  private schema = getSchemaContents();

  private sqlSession = sqlModel.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: `This is the model of the Postgresql schema:
              ------------------------------------
              ${this.schema}
              ------------------------------------
            `,
          },
        ],
      },
    ],
  });

  private textSession = textModel.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: `This is the model of the Postgresql schema:
              ------------------------------------
              ${this.schema}
              ------------------------------------
            `,
          },
        ],
      },
    ],
  });

  private promptCount = 0;

  postGenerateResponse = async (req: Request, res: Response): Promise<any> => {
    try {
      // Get the prompt from the request body
      const { prompt: userPrompt, extra = [] } = req.body;

      this.promptCount = 0;

      if (!userPrompt) {
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

      const thinkingPrompt = this.constructThinkingPrompt(userPrompt, extra);
      const r1 = await this.textSession.sendMessage(thinkingPrompt);
      this.promptCount += 1;
      let thinkingResponse = `I NEED MORE INFORMATION. ${r1.response.text()}`;

      const dbQueriedDataList: string[] = [];
      while (
        thinkingResponse.includes("I NEED MORE INFORMATION") ||
        thinkingResponse.includes("I CANNOT ANSWER YOUR QUESTION.")
      ) {
        console.log({ thinkingResponse });

        const reqInfo = this.extractRequiredInfo(thinkingResponse);

        for (const info of reqInfo) {
          const dbQueriedData = await this.getDataFromDatabaseFromPrompt(
            info,
            userPrompt
          );
          console.log({ dbQueriedData });
          dbQueriedDataList.push(JSON.stringify(dbQueriedData));
        }

        if (
          dbQueriedDataList.length < 0 ||
          dbQueriedDataList.every((item) => item === null)
        ) {
          return res
            .status(500)
            .send({ error: "Could not generate a response" });
        }

        const rethinkingPrompt = `The user has this question: '${userPrompt}'. Can you confidently answer it using this data: '${JSON.stringify(
          dbQueriedDataList
        )}'? If yes, then answer it to the best of your ability with confidence (start with exactly \`I CAN ANSWER YOUR QUESTION.\`). 
        If no, then ask what additional information you need to be able to answer the question (start with exactly \`I NEED MORE INFORMATION.\`).
        Each piece of information which you need should start with: \`---REQUIRED-INFO-START---\` and end with \`---REQUIRED-INFO-END---\``;
        console.log({ rethinkingPrompt });
        const r2 = await this.textSession.sendMessage(rethinkingPrompt);
        this.promptCount += 1;

        thinkingResponse = r2.response.text();
      }

      const finalAnswer = thinkingResponse
        .replace("I CAN ANSWER YOUR QUESTION.", "")
        .trim();
      console.log({ finalAnswer });

      return res.status(200).send({
        finalAnswer,
        promptCount: this.promptCount,
      });
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
  private removeKeyword(str: string, keyword: string): string {
    // eg. participantsTable -> participants
    const regex = new RegExp(keyword, "g");
    return str.replace(regex, "");
  }

  private addQuotesAroundColumnName(str: string): string {
    // participants.championName -> participants."championName"
    return str.replace(/\.(\w+)/g, '."$1"');
  }

  private extractRequiredInfo(inputString: string): string[] {
    const regex = /---REQUIRED-INFO-START---([\s\S]*?)---REQUIRED-INFO-END---/g;
    const matches: string[] = [];
    let match;

    while ((match = regex.exec(inputString)) !== null) {
      matches.push(match[1].trim());
    }

    return matches;
  }

  private async getDataFromDatabaseFromPrompt(
    prompt: string,
    userPrompt: string
  ) {
    const sqlRequestPrompt = this.constructSQLRequestPrompt(prompt, userPrompt);
    const result = await this.sqlSession.sendMessage(sqlRequestPrompt);
    this.promptCount += 1;
    const sqlResponse = result.response.text();

    let sqlQuery: string = sqlResponse;
    sqlQuery = this.removeInnerSingleQuotes(sqlQuery);
    sqlQuery = this.removeCodeFencing(sqlQuery);
    sqlQuery = this.replaceDoubleBackslashesForSingleBackslashes(sqlQuery);
    sqlQuery = this.replaceDoubleQuoteForSingleQuote(sqlQuery);
    sqlQuery = this.removeKeyword(sqlQuery, "Table");
    sqlQuery = this.addQuotesAroundColumnName(sqlQuery);

    const connector = DatabaseConnector.getInstance();
    await connector.connect();

    let dbQueriedData: any[] | null = null;
    for (let index = 0; index < queryErrorRetries; index++) {
      try {
        dbQueriedData = await connector.query(sqlQuery);
        break;
      } catch (error: any) {
        const fullErrorMessage = String(error);
        const retryPrompt = `Got the error: ${fullErrorMessage}. Fix the SQL query to get the data, from the postgres database. 
        Do not forget that you have to specify the table when selecting a column.`;

        const resultRetry = await this.sqlSession.sendMessage(retryPrompt);
        this.promptCount += 1;
        const responseTextRetry = resultRetry.response.text();

        sqlQuery = responseTextRetry;
        sqlQuery = this.removeInnerSingleQuotes(sqlQuery);
        sqlQuery = this.removeCodeFencing(sqlQuery);
        sqlQuery = this.replaceDoubleBackslashesForSingleBackslashes(sqlQuery);
        sqlQuery = this.replaceDoubleQuoteForSingleQuote(sqlQuery);
        sqlQuery = this.removeKeyword(sqlQuery, "Table");
        sqlQuery = this.addQuotesAroundColumnName(sqlQuery);
      }
    }

    return `<${prompt}: 
    
    ${JSON.stringify(dbQueriedData)}>`;
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

  private constructThinkingPrompt(
    prompt: string,
    extra: string[] | undefined
  ): string {
    return `What information do you need from the database to answer the question: "${prompt}"?
    ${
      extra &&
      extra.map((item) => {
        return `${item}\n`;
      })
    }

    Each piece of information which you need should start with: \`---REQUIRED-INFO-START---\` and end with \`---REQUIRED-INFO-END---\`.
    `;
  }

  private constructSQLRequestPrompt(
    preInstruction: string,
    prompt: string
  ): string {
    return `     
      To answer the question "${prompt}", you need the following information from the database:

      ------------------------------------
      ${preInstruction}
      ------------------------------------

      Build the SQL query to get the data, from the postgres database. Do not forget that you have to specify the table when selecting a column.
    `;
  }
}

export default GenerateResponseController;
