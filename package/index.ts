import { cacheActions } from "./cache/cache.actions";
import { communicate } from "./communication/communicate.communicator";
import { configProvider } from "./config/provider.config";
import { constant, DEFAULT_PORT } from "./constants/server.constant";
import { databaseActions } from "./database/actions.database";
import {
  getDatabases,
  getTables,
  getColumns,
} from "./database/helper.database";
import { databaseProvider } from "./database/provider.database";
import { setupModels } from "./database/setup.database";
import { setupFunctions } from "./function/setup.functions";
import { setupLogging } from "./logging/setup.logging";
import {
  ControllersRegistry,
  FunctionsRegistry,
  MiddlewaresRegistry,
  ModelsRegistry,
  TasksRegistry,
  ValidationsRegistry,
} from "./registry/index";
import { setupRoutes } from "./route/setup.route";
import setupSwagger from "./swagger/swagger.setup";
import { setupTasks } from "./tasks/setup.tasks";

export {
  configProvider,
  /**
   * Registry
   */
  ControllersRegistry as CoreControllersRegistry,
  FunctionsRegistry as CoreFunctionsRegistry,
  MiddlewaresRegistry as CoreMiddlewaresRegistry,
  ModelsRegistry as CoreModelsRegistry,
  TasksRegistry as CoreTasksRegistry,
  ValidationsRegistry as CoreValidationsRegistry,

  /**
   * Constants
   */
  constant as coreConstant,
  DEFAULT_PORT,

  /**
   * logging
   */
  setupLogging,

  /**
   * routes
   */
  setupRoutes,

  /**
   * database
   */
  setupModels,
  databaseProvider,
  databaseActions,
  cacheActions,
  getDatabases,
  getTables,
  getColumns,

  /**
   * communication
   */
  communicate,

  /**
   * Cron Functions
   */
  setupTasks,

  /**
   * setupFunctions
   */
  setupFunctions,

  /**
   * Setup swagger API Docs
   */
  setupSwagger,
};
