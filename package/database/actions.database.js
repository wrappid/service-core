const databaseActions = {
  /**
   *
   */
  findAll: async (database, model, data) => {
    try {
      const databaseProvider = require("./provider.database");
      return await databaseProvider[database].models[model].findAll(data);
    } catch (error) {
      throw new Error(error);
    }
  },

  delete: async (database, model, data) => {
    try {
      const databaseProvider = require("./provider.database");
      return await databaseProvider[database].models[model].destroy(data);
    } catch (error) {
      throw new Error(error);
    }
  },

  update: async (database, model, {data, where, transaction}) => {
    try {
      const databaseProvider = require("./provider.database");
      return await databaseProvider[database].models[model].update(data,where,transaction
      );
    } catch (error) {
      throw new Error(error);
    }
  },

  findOne: async (database, model, data ) => {
    try {
      console.log('::---',data,'---::');
      const databaseProvider = require("./provider.database");
      return await databaseProvider[database].models[model].findOne(data);
    } catch (error) {
      throw new Error(error);
    }
  },
  
  create: async (database, model, data, transaction) => {
    try {
      const databaseProvider = require("./provider.database");
      return await databaseProvider[database].models[model].create(data,transaction);
    } catch (error) {
      throw new Error(error);
    }
  },

  findByPk: async (database, model, primaryKey) => {
    try {
      const databaseProvider = require("./provider.database");
      return await databaseProvider[database].models[model].findOne(primaryKey);
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = databaseActions;
