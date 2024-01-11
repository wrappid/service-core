/**
 * @todo
 * must get it from application context
 * and
 * merge core specific config here
 * and
 * environment must comes from env
 */
const path = require("path");
const constant = require("../constants/server.constant");
const configFilePath =
  process.env[constant.constant.entityStatus.WRAPPID_SERVICE_CONFIG_PATH];
let wrappidConfig;
if (configFilePath === undefined) {
  wrappidConfig = require(path.resolve("./config.json"));
} else {
  wrappidConfig = require(path.resolve(configFilePath));
}

const configProvider = wrappidConfig;
console.log("###########################################");
console.log("configProvider found");
console.log("###########################################");

module.exports = configProvider;
