import { Sequelize } from "sequelize";
import { DatabaseConfig } from "../config/types.config";
import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";
import { GenericModel } from "../database/generic.model";
import { WrappidLogger } from "../logging/wrappid.logger";
import modelSchemaJson from "./ModelSchemas.model.json";

export const databaseProvider: any = {};

/**
 * This function will helps you to setup databases
 */
export async function  setupDatabase() {
  try {
    WrappidLogger.logFunctionStart("setupDatabase");
    const { databases } = ApplicationContext.getContext(constant.CONFIG_KEY);
    
    databases?.forEach(async (database: DatabaseConfig) => {
      const sequelize = new Sequelize(
        database.database,
        database.username,
        database.password,
        {
          host: database.host,
          port: Number(database.port),
          dialect: database.dialect,
          logging: database.logging,
          dialectOptions: database?.dialectOptions
        }
      );
  
      databaseProvider[database.name] = {},
      databaseProvider[database.name]["sequelize"] = sequelize;
      databaseProvider[database.name]["Sequelize"] = Sequelize;
  
      await databaseProvider[database.name].sequelize.authenticate();
      WrappidLogger.info(`Connection to ${database.name} database has been established successfully.`);
      console.log(
        `Connection to ${database.name} database has been established successfully.`
      );
    });
    /**
     * Setting up ModelSchemas to database Provider
     */
    Object.keys(databaseProvider).forEach((databaseName:string) => {
      
      try {
        const modelInstance = GenericModel(modelSchemaJson.table, modelSchemaJson,
          databaseProvider[databaseName].sequelize,
          Sequelize
        );      
        databaseProvider[databaseName].models = {};
        databaseProvider[databaseName].models[modelSchemaJson.table] = modelInstance;
      /**
       * @todo need to review the below line where it should be placed
       */
      } catch (error:any) {
        console.error(error.message);
        process.exit(1);
      }
    });

    WrappidLogger.logFunctionEnd("setupDatabase");
  } catch (error: any) {
    WrappidLogger.error(error);
    // console.error(error);
  }
}

