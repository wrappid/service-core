import { Injectable } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import { Model, ModelCtor, Sequelize } from "sequelize-typescript";
import { Transaction } from "sequelize";
import BaseService from "../common/base.service";
import BaseModel from "../common/base.model";
import { ApiRequestLogs } from "models/ApiRequestLogs.model";

/**
 * @todo missing coding documentation
 *
 * @description
 */
@Injectable()
export class DatabaseService extends BaseService {
  /**
   * @description
   */
  private connections: Map<string, Sequelize> = new Map();
  constructor(private readonly sequelize: Sequelize) {
    super();
    let databases = ConfigService.getCustomConfig()["databases"] || [];
    Object.keys(databases).forEach((dbIdentifier: string) => {
      let seqObj: Sequelize = new Sequelize(databases[dbIdentifier]);
      this.connections.set(dbIdentifier, seqObj);
      // sequelize.addModels([]);
      // await sequelize.sync();
      // return sequelize;
    });
  }

  /**
   *
   * @returns
   */
  static getAllDatabaseProviders() {
    let databases = ConfigService.getCustomConfig()["databases"] || [];
    return Object.keys(databases).map((dbIdentifier: string) => {
      return {
        provide: Sequelize,
        useFactory: async () => {
          const sequelize = new Sequelize(databases[dbIdentifier]);
          /**
           * @todo
           *
           * add models from registry
           */
          sequelize?.addModels([]);
          await sequelize?.sync();
          return sequelize;
        },
      };
    });
  }

  /**
   *
   * @param connectionName
   * @returns
   */
  async getConnection(connectionName: string): Promise<Sequelize> {
    return this.connections.get(connectionName);
  }

  /**
   *
   * @param connection
   * @returns
   */
  async checkConnection(): Promise<boolean> {
    try {
      this.connections.forEach(
        async (dbConn: Sequelize, dbIdentifier: string) => {
          try {
            await dbConn.authenticate();

            console.log(
              `Database connection to ${dbIdentifier} database has been established successfully.`
            );
          } catch (error) {
            console.error(
              "Unable to connect to the ${dbIdentifier} database:",
              error
            );
          }
        }
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   *
   * @param models
   * @param connectionName
   */
  async addModels(models: ModelCtor[], connectionName: string) {
    try {
      const dbObj = this.connections.get(connectionName);
      dbObj.addModels(models);
      console.log(`===Models Added===`);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param connectionName
   * @param model
   * @param options
   * @returns
   */
  async findAndCountAll(connectionName: string, model: string, options?: any) {
    try {
      const datbaseProvider = this.connections.get(connectionName);
      return await datbaseProvider.models[model].findAndCountAll(options);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param connectionName
   * @param model
   * @param options
   * @returns
   */
  async findAll(
    connectionName: string,
    model: string,
    options?: any
  ): Promise<any[]> {
    try {
      const datbaseProvider = this.connections.get(connectionName);
      return await datbaseProvider.models[model].findAll(options);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param connectionName
   * @param model
   * @param options
   * @returns
   */
  async findOne(
    connectionName: string,
    model: string,
    options?: any
  ): Promise<any> {
    try {
      const datbaseProvider = this.connections.get(connectionName);
      return await datbaseProvider.models[model].findOne(options);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param connectionName
   * @param model
   * @param options
   * @returns
   */
  async delete(
    connectionName: string,
    model: string,
    options?: any
  ): Promise<number> {
    try {
      const datbaseProvider = this.connections.get(connectionName);
      return await datbaseProvider.models[model].destroy(options);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param connectionName
   * @param model
   * @param data
   * @param options
   * @returns
   */
  async update(
    connectionName: string,
    model: string,
    data?: any,
    options?: any
  ): Promise<any> {
    try {
      const datbaseProvider = this.connections.get(connectionName);
      return await datbaseProvider.models[model].update(data, options);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param connectionName
   * @param model
   * @param data
   * @returns
   */
  async create(
    connectionName: string,
    model: string,
    data?: any,
    transaction?: any
  ): Promise<any> {
    try {
      const datbaseProvider = this.connections.get(connectionName);
      return datbaseProvider.models[model].create(data, transaction);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  getTransaction(): Promise<Transaction> {
    /**
     * retu
     */
    return this.sequelize.transaction();
  }
}
