import { WrappidLogger } from "../logging/wrappid.logger";
import { databaseProvider } from "./setup.database";

export const databaseActions = {
  /**
   * This function will run database operation findAndCountAll
   * 
   * @param database : database value
   * @param model : model value
   * @param options : options value
   * @param transaction : transaction value
   * @returns 
   */
  findAndCountAll: async (database: string, model: string, options?: any, transaction?: any ) => {
    WrappidLogger.logFunctionStart();
    if(databaseProvider && Object.keys(databaseProvider).length > 0){
      return await databaseProvider[database].models[model].findAndCountAll(options, transaction);
    } else {
      throw new Error("WrappidError: databases not setup successfully.");
    }
  },

  /**
   * This function will run database operation findAll
   * 
   * @param database : database value
   * @param model : model value
   * @param options : options value
   * @param transaction : transaction value
   * @returns 
   */
  findAll: async (database: string, model: string, options?: any, transaction?: any) => {
    WrappidLogger.logFunctionStart();
    if(databaseProvider && Object.keys(databaseProvider).length > 0){
      return await databaseProvider[database].models[model].findAll(options, transaction);
    } else {
      throw new Error("WrappidError: databases not setup successfully.");
    }
  },

  /**
   * This function will run database operation delete
   * 
   * @param database : database value
   * @param model : model value
   * @param data : data value
   * @param transaction : transaction value
   * @returns 
   */
  delete: async (database: string, model: string, data: any, transaction?: any) => {
    WrappidLogger.logFunctionStart();
    if(databaseProvider && Object.keys(databaseProvider).length > 0){
      return await databaseProvider[database].models[model].destroy(data, transaction);
    } else {
      throw new Error("WrappidError: databases not setup successfully.");
    }
  },

  /**
   * This function will run database operation update
   * 
   * @param database : database value
   * @param model : model value
   * @param data : data value
   * @param where : where value
   * @param transaction : transaction value
   * @returns 
   */
  update: async (
    database: string,
    model: string,
    data: any,
    where: any,
    transaction?: any
  ) => {
    WrappidLogger.logFunctionStart();
    if(databaseProvider && Object.keys(databaseProvider).length > 0){
      return await databaseProvider[database].models[model].update(
        data, where, transaction
      );
    } else {
      throw new Error("WrappidError: databases not setup successfully.");
    }
  },

  /**
   * This function will run database operation findOne
   * 
   * @param database : database value
   * @param model : model value
   * @param data : data value
   * @param transaction : transaction value
   * @returns 
   */
  findOne: async (database: string, model: string, data: any, transaction?: any) => {
    WrappidLogger.logFunctionStart();
    if(databaseProvider && Object.keys(databaseProvider).length > 0){
      console.log("::---", data, "---::");
      return await databaseProvider[database].models[model].findOne(data, transaction);
    } else {
      throw new Error("WrappidError: databases not setup successfully.");
    }
  },

  /**
   * This function will run database operation create
   * 
   * @param database : database value
   * @param model : model value
   * @param data : data value
   * @param transaction : transaction value
   * @returns 
   */
  create: async (
    database: string,
    model: string,
    data: any,
    transaction?: any
  ) => {
    WrappidLogger.logFunctionStart();
    if(databaseProvider && Object.keys(databaseProvider).length > 0){
      return await databaseProvider[database].models[model].create(data, transaction);
    } else {
      throw new Error("WrappidError: databases not setup successfully.");
    }
  },

  /**
   * This function will run database operation findByPk
   * 
   * @param database : database value
   * @param model : model value
   * @param primaryKey : primaryKey value
   * @param options : options value
   * @param transaction : transaction value
   * @returns 
   */
  findByPk: async (database: string, model: string, primaryKey: number, options?: any,  transaction?: any) => {
    WrappidLogger.logFunctionStart();
    if(databaseProvider && Object.keys(databaseProvider).length > 0){
      return await databaseProvider[database].models[model].findByPk(primaryKey, options, transaction);
    } else {
      throw new Error("WrappidError: databases not setup successfully.");
    }
  },
};
