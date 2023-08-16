const express = require("express");
const wrappidApp = express();

let bodyParser = require("body-parser");

let cors = require("cors");
const setupModels = require("./database/setup.database");
const initializeCronJobs = require("./tasks/initTasks");
const setupLogging = require("./logging/setup.logging");
const setupRoutes = require("./route/setup.route");

let options = {
  inflate: true,
  limit: "50mb",
  type: "application/octet-stream",
};
wrappidApp.use(express.static("uploads"));
wrappidApp.use(express.static("build"));
wrappidApp.use(cors());
wrappidApp.use(bodyParser.json({ limit: "50mb" }));
wrappidApp.use(bodyParser.raw(options));
wrappidApp.use(bodyParser.urlencoded({ extended: true }));


const setupWrappidApp = () => {
  /**
   *
   */
  setupModels(databaseProvider);
  wrappidApp.use(MiddlewaresRegistry.apiLogger);

  /**
   * corn jobs
   */
  initializeCronJobs();

  /**
   * Setup Logging
   */
  setupLogging(wrappidApp);

  /**
   * @todo
   * setup routes
   */
  setupRoutes(wrappidApp);
}

module.exports = {wrappidApp, setupWrappidApp};
