import GenerateResponseController from "./generate-response";

describe("GenerateResponseController", () => {
  const controller = new GenerateResponseController();

  describe("replaceDoubleBackslashesForSingleBackslashes", () => {
    it("should replace double backslashes with single backslashes", () => {
      const inputString = "This string has double backslashes: \\\\";
      const expectedOutput = "This string has double backslashes: \\";

      const privateMethod = controller[
        "replaceDoubleBackslashesForSingleBackslashes"
      ] as (str: string) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should not change single backslashes", () => {
      const inputString = "This string has single backslashes: \\";
      const expectedOutput = "This string has single backslashes: \\";

      const privateMethod = controller[
        "replaceDoubleBackslashesForSingleBackslashes"
      ] as (str: string) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should handle strings with no backslashes correctly", () => {
      const inputString = "This string has no backslashes";
      const expectedOutput = "This string has no backslashes";

      const privateMethod = controller[
        "replaceDoubleBackslashesForSingleBackslashes"
      ] as (str: string) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should handle strings with mixed single and double backslashes", () => {
      const inputString = "Mixed backslashes: \\\\ and \\ and \\\\\\\\";
      const expectedOutput = "Mixed backslashes: \\ and \\ and \\\\";

      const privateMethod = controller[
        "replaceDoubleBackslashesForSingleBackslashes"
      ] as (str: string) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should handle an empty string", () => {
      const inputString = "";
      const expectedOutput = "";

      const privateMethod = controller[
        "replaceDoubleBackslashesForSingleBackslashes"
      ] as (str: string) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should handle multiple consecutive double backslashes", () => {
      const inputString = "Consecutive double backslashes: \\\\\\\\";
      const expectedOutput = "Consecutive double backslashes: \\\\";

      const privateMethod = controller[
        "replaceDoubleBackslashesForSingleBackslashes"
      ] as (str: string) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should handle double backslashes at the beginning and end of the string", () => {
      const inputString = "\\\\String with backslashes at both ends\\\\";
      const expectedOutput = "\\String with backslashes at both ends\\";

      const privateMethod = controller[
        "replaceDoubleBackslashesForSingleBackslashes"
      ] as (str: string) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });
  });

  describe("replaceDoubleQuoteForSingleQuote", () => {
    it("should replace double single quotes with single single quotes", () => {
      const inputString = "This string has double quotes: ''";
      const expectedOutput = "This string has double quotes: '";

      const privateMethod = controller["replaceDoubleQuoteForSingleQuote"] as (
        str: string
      ) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should not change single single quotes", () => {
      const inputString = "This string has single quotes: '";
      const expectedOutput = "This string has single quotes: '";

      const privateMethod = controller["replaceDoubleQuoteForSingleQuote"] as (
        str: string
      ) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should handle strings with no quotes correctly", () => {
      const inputString = "This string has no quotes";
      const expectedOutput = "This string has no quotes";

      const privateMethod = controller["replaceDoubleQuoteForSingleQuote"] as (
        str: string
      ) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should handle strings with mixed single and double single quotes", () => {
      const inputString = "Mixed quotes: '' and ' and ''''";
      const expectedOutput = "Mixed quotes: ' and ' and ''";

      const privateMethod = controller["replaceDoubleQuoteForSingleQuote"] as (
        str: string
      ) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should handle an empty string", () => {
      const inputString = "";
      const expectedOutput = "";

      const privateMethod = controller["replaceDoubleQuoteForSingleQuote"] as (
        str: string
      ) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should handle double single quotes at the beginning and end of the string", () => {
      const inputString = "''String with backslashes at both ends''";
      const expectedOutput = "'String with backslashes at both ends'";

      const privateMethod = controller["replaceDoubleQuoteForSingleQuote"] as (
        str: string
      ) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });
  });

  describe("removeInnerSingleQuotes", () => {
    it("should remove single quotes between letters", () => {
      const inputString = "This is a test w'ith in'ner quo't'es in words.";
      const expectedOutput = "This is a test with inner quotes in words.";

      const privateMethod = controller["removeInnerSingleQuotes"] as (
        str: string
      ) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should not remove single quotes at the beginning or end of words", () => {
      const inputString = "'Start' and 'end' quotes should remain.";
      const expectedOutput = "'Start' and 'end' quotes should remain.";

      const privateMethod = controller["removeInnerSingleQuotes"] as (
        str: string
      ) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should handle strings with no inner single quotes", () => {
      const inputString = "This string has no inner single quotes.";
      const expectedOutput = "This string has no inner single quotes.";

      const privateMethod = controller["removeInnerSingleQuotes"] as (
        str: string
      ) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should handle an empty string", () => {
      const inputString = "";
      const expectedOutput = "";

      const privateMethod = controller["removeInnerSingleQuotes"] as (
        str: string
      ) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });
  });

  describe("removeCodeFencing", () => {
    it("should remove code fences and keep content", () => {
      const inputString = "```\nThis is code inside fences.\n```";
      const expectedOutput = "This is code inside fences.";

      const privateMethod = controller["removeCodeFencing"] as (
        str: string
      ) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should remove code fences with language identifier", () => {
      const inputString = "```javascript\nconst x = 10;\n```";
      const expectedOutput = "const x = 10;";

      const privateMethod = controller["removeCodeFencing"] as (
        str: string
      ) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should remove code fences with different language identifiers", () => {
      const inputString =
        "```python\nprint('Hello')\n```\n```typescript\nconst y: number = 20;\n```";
      const expectedOutput = "print('Hello')\nconst y: number = 20;";

      const privateMethod = controller["removeCodeFencing"] as (
        str: string
      ) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should handle strings with no code fences", () => {
      const inputString = "This string has no code fences.";
      const expectedOutput = "This string has no code fences.";

      const privateMethod = controller["removeCodeFencing"] as (
        str: string
      ) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should handle an empty string", () => {
      const inputString = "";
      const expectedOutput = "";

      const privateMethod = controller["removeCodeFencing"] as (
        str: string
      ) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should handle code fences with leading/trailing whitespace", () => {
      const inputString = "  ```\n  Code with whitespace.\n  ```  ";
      const expectedOutput = "  Code with whitespace.";

      const privateMethod = controller["removeCodeFencing"] as (
        str: string
      ) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });

    it("should handle code fences with empty content", () => {
      const inputString = "```\n\n```";
      const expectedOutput = "";

      const privateMethod = controller["removeCodeFencing"] as (
        str: string
      ) => string;
      expect(privateMethod.call(controller, inputString)).toBe(expectedOutput);
    });
  });
});
