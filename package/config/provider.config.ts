/**
 * @todo
 * must get it from application context
 * and
 * merge core specific config here
 * and
 * environment must comes from env
 */
import { constant } from "../constants/server.constant";

const path = require("path");

const configFilePath =
  process.env[constant.entityStatus.WRAPPID_SERVICE_CONFIG_PATH];
let wrappidConfig;
if (configFilePath) {
  wrappidConfig = require(path.resolve(configFilePath));
} else {
  wrappidConfig = require(path.resolve("./config.json"));
}

export const configProvider = wrappidConfig;
console.log("###########################################");
console.log("configProvider found");
console.log("###########################################");
