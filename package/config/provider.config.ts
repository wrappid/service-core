/**
 * @todo
 * must get it from application context
 * and
 * merge core specific config here
 * and
 * environment must comes from env
 */
import * as fs from "fs";
import { constant } from "../constants/server.constant";
import ConfigType from "./types.config";

export const configProvider = (): ConfigType => {
  // eslint-disable-next-line no-useless-catch
  try {
    let configFilePath: string =
      process.env[constant.entityStatus.WRAPPID_SERVICE_CONFIG_PATH];
    let wrappidConfig: ConfigType;
    if (!configFilePath) {
      configFilePath = "./config.json";
    }
    // eslint-disable-next-line prefer-const
    wrappidConfig = JSON.parse(fs.readFileSync(configFilePath, "utf-8"));
    console.log("###########################################");
    console.log("configProvider found");
    console.log("###########################################");
    return wrappidConfig;
  } catch (error: any) {
    throw error;
  }
};
