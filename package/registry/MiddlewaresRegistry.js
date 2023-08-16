const modulesMiddlewaresRegistry = require("../../modules/modules.functions.registry");
const apiLogger = require("../middlewares/apiLogger.middleware");
const fileHandler = require("../middlewares/fileHandler.middleware");
const validation = require("../middlewares/validation.middleware");

const MiddlewaresRegistry = {
    "apiLogger": apiLogger,
    "fileHandler": fileHandler,
    "validation": validation,
    ...modulesMiddlewaresRegistry
};

module.exports = MiddlewaresRegistry;
