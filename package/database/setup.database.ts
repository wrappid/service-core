import { Sequelize } from "sequelize";
import { DatabaseConfig } from "../config/types.config";
import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";
import { WrappidLogger } from "../logging/wrappid.logger";

export const databaseProvider: any = {};

/**
 * This function will helps you to setup databases
 */
export function setupDatabase() {
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
        }
      );
  
      (databaseProvider[database.name] = {}),
      (databaseProvider[database.name]["sequelize"] = sequelize);
      databaseProvider[database.name]["Sequelize"] = Sequelize;
  
      await databaseProvider[database.name].sequelize.authenticate();
      WrappidLogger.info(`Connection to ${database.name} database has been established successfully.`);
      console.log(
        `Connection to ${database.name} database has been established successfully.`
      );
    });
    WrappidLogger.logFunctionEnd("setupDatabase");
  } catch (error: any) {
    WrappidLogger.error(error);
    // console.error(error);
  }
}

