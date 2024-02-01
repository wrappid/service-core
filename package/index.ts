import { configProvider } from "./config/provider.config";
import { databaseProvider } from "./database/provider.database";
import { databaseActions } from "./database/actions.database";
import { setupLogging } from "./logging/setup.logging";
import { setupRoutes } from "./route/setup.route";
import { setupModels } from "./database/setup.database";
import { cacheActions } from "./cache/cache.actions";
import { communicate } from "./communication/communicate.communicator";
import { setupTasks } from "./tasks/setup.tasks";
import { constant, DEFAULT_PORT } from "./constants/server.constant";
import { setupFunctions } from "./function/setup.functions";
import setupSwagger from "./swagger/swagger.setup";

import {
  FunctionsRegistry,
  MiddlewaresRegistry,
  ModelsRegistry,
  TasksRegistry,
  ValidationsRegistry,
} from "./registry/index";

export {
  configProvider,
  /**
   * Registry
   */
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
