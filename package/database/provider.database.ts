/**
 * @todo
 *
 * This will be the entry point for all the
 * DB change request from outside application(s)
 *
 * Access/Privileges
 * - 3rd Party Application have read access for data.
 * - Business Application have create, read, update for data.
 * - Database Manager have all the access.
 *
 * Multiple Database
 * - UMS [Development | (Test - Refresh) |Stage/Production]
 *      - User
 *      - Role
 *      - Permission
 *
 * - BUILDER [SINGLE INSTANCE]
 *      - Application Setting(s) eg. Request Timeout, Max File Size
 *      - Route
 *      - Pages
 *      ...
 *
 * - DATA [SINGLE INSTANCE]
 *      - Medicines
 *      - Diseases
 *      ...
 *
 * - APPLICATION
 *      - Patient
 *      ...
 *
 */

"use strict";

import { Dialect, Sequelize } from "sequelize";
import { configProvider } from "../config/provider.config";
import { DatabaseConfig } from "../config/types.config";

export const databaseProvider: any = {};

configProvider().databases.forEach(async (database: DatabaseConfig) => {
  try {
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
    console.log(
      `Connection to ${database.name} database has been established successfully.`
    );
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    console.error(error);
  }
});
