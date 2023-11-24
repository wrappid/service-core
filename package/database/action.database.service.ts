import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";

@Injectable()
export class DatabaseActions {
  constructor(private sequelize: Sequelize) {}

  async findAndCountAll(model: any, options?: any): Promise<any[]> {
    try {
      return model.findAndCountAll(options);
    } catch (error) {
      // throw new Error(error);
    }
  }

  async findAll(model: any, options?: any): Promise<any[]> {
    try {
      return model.findAll(options);
    } catch (error) {
      // throw new Error(error);
    }
  }

  async findOne(model: any, options?: any): Promise<any> {
    try {
      return model.findOne(options);
    } catch (error) {
      // throw new Error(error);
    }
  }

  async delete(model: any, options?: any): Promise<number> {
    try {
      const instance = await this.findOne(model, options);
      if (instance) {
        return instance.destroy();
      }
    } catch (error) {
      // throw new Error(error);
    }
  }

  async update(model: any, data: any, options?: any): Promise<any> {
    try {
      const instance = await this.findOne(model, options);
      if (instance) {
        return instance.update(data);
      }
    } catch (error) {
      // throw new Error(error);
    }
  }

  async create(model: any, data: any): Promise<any> {
    try {
      return model.create(data);
    } catch (error) {
      // throw new Error(error);
    }
  }
}
