const databaseProvider = require("./database/provider.database");
const databaseActions = require("./database/actions.database");
const setupLogging = require("./logging/setup.logging");
const setupRoutes = require("./route/setup.route");
const setupModels = require("./database/setup.database");
const cacheActions = require("./cache/cache.actions");
const communicationUtils = require("./utils/communication.utils");
const MiddlewaresRegistry = require("./registry/MiddlewaresRegistry");
const initializeCronJobs = require("./tasks/initTasks");
const {ApplicationContext, setApplicationContext} = require("./ApplicationContext");
const constant = require("./constants/server.constant");

module.exports = {
  /**
   * App
   */
  ApplicationContext,
  setApplicationContext,
  /**
   * Constants
   */
  constant,
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
  initializeCronJobs,

  /**
   * Registry
   */
  MiddlewaresRegistry
};
