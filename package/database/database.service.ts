// database.service.ts
import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class DatabaseService {
  constructor(private readonly sequelize: Sequelize) {}

  async checkConnection(): Promise<boolean> {
    try {
      await this.sequelize.authenticate();
      console.log("Database connection has been established successfully.");
      return true;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      return false;
    }
  }
}
