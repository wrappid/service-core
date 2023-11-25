import { Injectable } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import { ConfigConstant } from "../constant/config.constant";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class DatabaseService {
  constructor(private readonly sequelize: Sequelize) {}

  static getAllDatabaseProviders() {
    let databases = ConfigService.getCustomConfig()["databases"] || [];
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
            const sequelize = new Sequelize({
              dialect: database[ConfigConstant.database.DB_DIALECT],
              host: database[ConfigConstant.database.DB_HOST],
              port: database[ConfigConstant.database.DB_PORT],
              username: database[ConfigConstant.database.DB_USERNAME],
              password: database[ConfigConstant.database.DB_PASSWORD],
              database: database[ConfigConstant.database.DB_DATABASE],
            });
            sequelize.addModels([]);
            await sequelize.sync();
            return sequelize;
          },
        };
      }
    );
  }

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
