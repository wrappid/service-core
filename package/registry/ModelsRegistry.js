const CronSchemas = require("../models/CronSchemas.model");
const ApiRequestLogs = require("../models/ApiRequestLogs.model");

const ModelsRegistry = {
    "ApirequestLogs": {
        database : "application",
        model    : ApiRequestLogs
    },
    "CronSchemas": {
        database: "application",
        model   : CronSchemas
    }
};

module.exports = ModelsRegistry;
