const configProvider = require("./config/provider.config");
const databaseProvider = require("./database/provider.database");
const databaseActions = require("./database/actions.database");
const setupLogging = require("./logging/setup.logging");
const setupRoutes = require("./route/setup.route");
const setupModels = require("./database/setup.database");
const cacheActions = require("./cache/cache.actions");
const communicationUtils = require("./utils/communication.utils");
const setupTasks = require("./tasks/setup.tasks");
const { constant,DEFAULT_PORT } = require("./constants/server.constant");
const {
    FunctionsRegistry,
    MiddlewaresRegistry,
    ModelsRegistry,
    TasksRegistry,
    ValidationsRegistry
} = require("./registry");

module.exports = {
  configProvider,
  /**
   * Registry
   */
  CoreFunctionsRegistry: FunctionsRegistry,
  CoreMiddlewaresRegistry: MiddlewaresRegistry,
  CoreModelsRegistry: ModelsRegistry,
  CoreTasksRegistry: TasksRegistry,
  CoreValidationsRegistry: ValidationsRegistry,

  /**
   * Constants
   */
  coreConstant: constant,
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
  communicationUtils,

  /**
   * Cron Functions
   */
  setupTasks
};
