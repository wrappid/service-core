import { Injectable } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import { ConfigConstant } from "../constant/config.constant";
import { Sequelize } from "sequelize-typescript";
import sequelize from "sequelize";

@Injectable()
export class DatabaseService {
  static connections: Map<string, Sequelize> = new Map();
  constructor(private readonly sequelize: Sequelize) {}
  static getAllDatabaseProviders() {
    let databases = ConfigService.getCustomConfig()["databases"] || [];
    for (const config of databases) {
      const connectionName = config["name"]; // Use a unique identifier for each database
      const connection = new Sequelize(config);
      this.connections.set(connectionName, connection);
    }
    return databases.map(
      (
        database:
          | {
              name: string;
              host: string;
              port: number;
              dialect: string;
              database: string;
              username: string;
              password: string;
              logging: string;
            }
          | any
        /**
         * @todo need to avoid above any type
         */
      ) => {
        return {
          provide: Sequelize,
          useFactory: async () => {
            const sequelize = new Sequelize(database);
            let connectname = database["name"];
            DatabaseService.connections.set(connectname, sequelize)
            sequelize.addModels([]);
            await sequelize.sync();
            return sequelize;
          },
        };
      }
    );
  }
  static getConnection(connectionName: string): Sequelize | undefined {
    return DatabaseService.connections.get(connectionName);
  }
  async checkConnection(connection:Sequelize): Promise<boolean> {
    try {
      await connection.authenticate();
      // console.log("Database connection has been established successfully.",);
      return true;
    } catch (error) {
      // console.error("Unable to connect to the database:", error);
      return false;
    }
  }

  async findAndCountAll(model: any, options?: any): Promise<any[]> {
    try {
      return model.findAndCountAll(options);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findAll(model: any, options?: any): Promise<any[]> {
    try {
      return model.findAll(options);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findOne(model: any, options?: any): Promise<any> {
    try {
      return model.findOne(options);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async delete(model: any, options?: any): Promise<number> {
    try {
      const instance = await this.findOne(model, options);
      if (instance) {
        return instance.destroy();
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async update(model: any, data: any, options?: any): Promise<any> {
    try {
      const instance = await this.findOne(model, options);
      if (instance) {
        return instance.update(data);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async create(model: any, data: any): Promise<any> {
    try {
      return model.create(data);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
