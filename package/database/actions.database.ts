import { databaseProvider } from "./provider.database";

export const databaseActions = {
  /**
   * 
   * @param database 
   * @param model 
   * @param options 
   * @param transaction 
   * @returns 
   */
  findAndCountAll: async (database: string, model: string, options?: any, transaction?: any ) => {
    try {
      return await databaseProvider[database].models[model].findAndCountAll(options, transaction);
    } catch (error: any) {
      throw new Error(error);
    }
  },

  /**
   * 
   * @param database 
   * @param model 
   * @param options 
   * @param transaction 
   * @returns 
   */
  findAll: async (database: string, model: string, options?: any, transaction?: any) => {
    try {
      return await databaseProvider[database].models[model].findAll(options, transaction);
    } catch (error: any) {
      throw new Error(error);
    }
  },

  /**
   * 
   * @param database 
   * @param model 
   * @param data 
   * @param transaction 
   * @returns 
   */
  delete: async (database: string, model: string, data: any, transaction?: any) => {
    try {
      return await databaseProvider[database].models[model].destroy(data, transaction);
    } catch (error: any) {
      throw new Error(error);
    }
  },

  /**
   * 
   * @param database 
   * @param model 
   * @param data 
   * @param where 
   * @param transaction 
   * @returns 
   */
  update: async (
    database: string,
    model: string,
    data: any,
    where: any,
    transaction?: any
  ) => {
    try {
      return await databaseProvider[database].models[model].update(
        data, where, transaction
      );
    } catch (error: any) {
      throw new Error(error);
    }
  },

  /**
   * 
   * @param database 
   * @param model 
   * @param data 
   * @param transaction 
   * @returns 
   */
  findOne: async (database: string, model: string, data: any, transaction?: any) => {
    try {
      console.log("::---", data, "---::");
      return await databaseProvider[database].models[model].findOne(data, transaction);
    } catch (error: any) {
      throw new Error(error);
    }
  },

  /**
   * 
   * @param database 
   * @param model 
   * @param data 
   * @param transaction 
   * @returns 
   */
  create: async (
    database: string,
    model: string,
    data: any,
    transaction?: any
  ) => {
    try {
      return await databaseProvider[database].models[model].create(data, transaction);
    } catch (error: any) {
      throw new Error(error);
    }
  },

  /**
   * 
   * @param database 
   * @param model 
   * @param primaryKey 
   * @param options 
   * @param transaction 
   * @returns 
   */
  findByPk: async (database: string, model: string, primaryKey: number, options?: any,  transaction?: any) => {
    try {
      return await databaseProvider[database].models[model].findByPk(primaryKey, options, transaction);
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
