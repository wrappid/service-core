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


  async findAndCountAll(model: any, options?: any): Promise<any[]> {
    try {
      return model.findAndCountAll(options);
    } catch (error:any) {
      throw new Error(error);
    }
  }

  async findAll(model: any, options?: any): Promise<any[]> {
    try {
      return model.findAll(options);
    } catch (error:any) {
      throw new Error(error);
    }
  }

  async findOne(model: any, options?: any): Promise<any> {
    try {
      return model.findOne(options);
    } catch (error:any) {
      throw new Error(error);
    }
  }

  async delete(model: any, options?: any): Promise<number> {
    try {
      const instance = await this.findOne(model, options);
      if (instance) {
        return instance.destroy();
      }
    } catch (error:any) {
      throw new Error(error);
    }
  }

  async update(model: any, data: any, options?: any): Promise<any> {
    try {
      const instance = await this.findOne(model, options);
      if (instance) {
        return instance.update(data);
      }
    } catch (error:any) {
      throw new Error(error);
    }
  }

  async create(model: any, data: any): Promise<any> {
    try {
      return model.create(data);
    } catch (error:any) {
      throw new Error(error);
    }
  }
}
