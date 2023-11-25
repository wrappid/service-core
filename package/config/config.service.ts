import { Injectable } from "@nestjs/common";
import { ConfigService as NestJSConfigService } from "@nestjs/config";
import * as fs from "fs";
@Injectable()
export class ConfigService extends NestJSConfigService {
  private static customConfig: Record<string, any>;

  constructor() {
    super();
  }

  private static loadCustomConfig(): Record<string, any> {
    //Add your file location to your environment variable CONFIG_PATH
    const configFilePath = process.env.CONFIG_PATH;
    const configFileContent = fs.readFileSync(configFilePath);
    return JSON.parse(configFileContent.toString());
  }
  
  public static getCustomConfig(): Record<string, any> {
    if (this.customConfig) {
      return this.customConfig;
    } else {
      this.customConfig = this.loadCustomConfig();
      return this.customConfig;
    }
  }
}
