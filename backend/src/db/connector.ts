import env from "@utils/config";
import { Client } from "pg";

export default class DatabaseConnector {
  // Static variable to hold the single instance
  private static instance: DatabaseConnector | undefined;
  private client: Client;
  private isConnected: boolean = false;

  private constructor() {
    this.client = new Client({
      connectionString: env.DATABASE_URL,
    });
    this.isConnected = false; // Initialize connection state
  }

  async connect() {
    if (!this.isConnected) {
      try {
        await this.client.connect();
        this.isConnected = true; // Update connection state
        console.log("Connected to the database");
      } catch (error) {
        console.error("Connection error", error);
      }
    }
  }

  async query(stmt: string) {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      const res = await this.client.query(stmt);
      return res.rows; // Return the fetched rows
    } catch (error) {
      console.error("Error executing query", error);
      return []; // Return an empty array in case of error
    }
  }

  async disconnect() {
    if (this.isConnected) {
      await this.client.end();
      this.isConnected = false; // Update connection state
      console.log("Disconnected from the database");
    }
  }

  // Static method to get the instance
  static getInstance() {
    if (!DatabaseConnector.instance) {
      DatabaseConnector.instance = new DatabaseConnector();
    }
    return DatabaseConnector.instance;
  }
}
