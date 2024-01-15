const CronSchemas = require("../models/CronSchemas.model");
const ApiRequestLogs = require("../models/ApiRequestLogs.model");
const Routes = require("../models/Routes.models");

const ModelsRegistry = {
  ApiRequestLogs: {
    database: "application",
    model: ApiRequestLogs,
  },
  CronSchemas: {
    database: "application",
    model: CronSchemas,
  },
  Routes: {
    database: "application",
    model: Routes,
  },
};

module.exports = ModelsRegistry;
