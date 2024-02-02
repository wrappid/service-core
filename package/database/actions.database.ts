import { databaseProvider } from "./provider.database";
export const databaseActions = {
  /**
   *
   */
  findAndCountAll: async (database: string, model: string, options?: any) => {
    try {
      return await databaseProvider[database].models[model].findAndCountAll(
        options
      );
    } catch (error: any) {
      throw new Error(error);
    }
  },

  /**
   *
   */
  findAll: async (database: string, model: string, options?: any) => {
    try {
      return await databaseProvider[database].models[model].findAll(options);
    } catch (error: any) {
      throw new Error(error);
    }
  },

  delete: async (database: string, model: string, data: any) => {
    try {
      return await databaseProvider[database].models[model].destroy(data);
    } catch (error: any) {
      throw new Error(error);
    }
  },

  update: async (
    database: string,
    model: string,
    data: any,
    where: any,
    transaction?: any
  ) => {
    try {
      return await databaseProvider[database].models[model].update(
        data,
        where,
        transaction
      );
    } catch (error: any) {
      throw new Error(error);
    }
  },

  findOne: async (database: string, model: string, data: any) => {
    try {
      console.log("::---", data, "---::");
      return await databaseProvider[database].models[model].findOne(data);
    } catch (error: any) {
      throw new Error(error);
    }
  },

  create: async (
    database: string,
    model: string,
    data: any,
    transaction?: any
  ) => {
    try {
      return await databaseProvider[database].models[model].create(
        data,
        transaction
      );
    } catch (error: any) {
      throw new Error(error);
    }
  },

  findByPk: async (database: string, model: string, primaryKey: number) => {
    try {
      return await databaseProvider[database].models[model].findByPk(
        primaryKey
      );
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
