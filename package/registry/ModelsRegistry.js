const CronSchemas = require("../models/CronSchemas.model");
const ApiRequestLogs = require("../models/ApiRequestLogs.model");

const ModelsRegistry = {
    "ApiRequestLogs": {
        database : "application",
        model    : ApiRequestLogs
    },
    "CronSchemas": {
        database: "application",
        model   : CronSchemas
    }
};

module.exports = ModelsRegistry;
