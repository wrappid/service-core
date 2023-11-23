const apiLogger = require("../middlewares/apiLogger.middleware");
const fileHandler = require("../middlewares/fileHandler.middleware");
const jwtVerify = require("../middlewares/jwtVerify.middleware");
const validation = require("../middlewares/validation.middleware");

const MiddlewaresRegistry = {
    "apiLogger": apiLogger,
    "fileHandler": fileHandler,
    "jwtVerify": jwtVerify,
    "validation": validation,
};

module.exports = MiddlewaresRegistry;
