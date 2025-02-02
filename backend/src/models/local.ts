interface LocalModelConfig {
  model: "deepseek-r1:8b";
  stream: boolean;
  apiUrl: string;
}

export class LocalModel {
  private config: LocalModelConfig;

  constructor(config?: LocalModelConfig) {
    this.config = {
      model: config?.model || "deepseek-r1:8b",
      stream: config?.stream || false,
      apiUrl: config?.apiUrl || "http://localhost:11434/api/generate",
    };
  }

  async generateContent(prompt: string) {
    const body = {
      ...this.config,
      prompt,
    };

    try {
      const response = await fetch(this.config.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();
      return result.response;
    } catch (error) {
      console.error("Error generating content:", error);
      throw error;
    }
  }
}

export const model = new LocalModel();

// Example usage:
// const model = new LocalModel({ model: "deepseek-r1:8b", stream: false, apiUrl: "http://localhost:11434/api/generate" });
// const response = await model.generateContent("Your prompt here");
