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
    RoutesRegistry,
    TasksRegistry,
    ValidationsRegistry
} = require("./registry");

module.exports = {
  /**
   * Registry
   */
  CoreFunctionsRegistry: FunctionsRegistry,
  CoreMiddlewaresRegistry: MiddlewaresRegistry,
  CoreModelsRegistry: ModelsRegistry,
  CoreRoutesRegistry: RoutesRegistry,
  CoreTasksRegistry: TasksRegistry,
  CoreValidationsRegistry: ValidationsRegistry,

  /**
   * Constants
   */
  constant,
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
