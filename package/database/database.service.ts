import { Injectable } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import { ConfigConstant } from "../constant/config.constant";
import { Model, Sequelize } from "sequelize-typescript";
import sequelize from "sequelize";

@Injectable()
export class DatabaseService {
  private connections: Map<string, Sequelize> = new Map();
  constructor(private readonly sequelize: Sequelize) {
    let databases = ConfigService.getCustomConfig()["databases"] || [];
    databases.forEach(
      (
        database:
           {
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
        let seqObj:Sequelize = new Sequelize(database);
            this.connections.set(database?.name, seqObj);
            // sequelize.addModels([]);
            // await sequelize.sync();
            // return sequelize;
      }
    );
  }


  static getAllDatabaseProviders() {
    let databases = ConfigService.getCustomConfig()["databases"] || [];
    return databases.map(
      (
        database:
           {
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
            // this.connections.set(connectname, sequelize)
            sequelize.addModels([]);
            await sequelize.sync();
            return sequelize;
          },
        };
      }
    );
  }

   getConnection(connectionName: string): Sequelize | undefined {
    return this.connections.get(connectionName);
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

  addModels(models: Model[], database: string){
    models.forEach(element => {
      
    });
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
