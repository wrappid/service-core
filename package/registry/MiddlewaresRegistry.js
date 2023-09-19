const apiLogger = require("../middlewares/apiLogger.middleware");
const fileHandler = require("../middlewares/fileHandler.middleware");
const jwtVerify = require("../middlewares/jwtVerify.middleware");
const validation = require("../middlewares/validation.middleware");
const upload = require("../utils/upload.utils");

const MiddlewaresRegistry = {
    "apiLogger": apiLogger,
    "fileHandler": upload,
    "jwtVerify": jwtVerify,
    "validation": validation,
};

module.exports = MiddlewaresRegistry;
