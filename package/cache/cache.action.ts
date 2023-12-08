import { DynamicModule } from "@nestjs/common";
import BaseService from "../common/base.service";
import { ConfigService } from "../config/config.service";

export class DatabaseService extends BaseService {
  cacheModules: DynamicModule[] = [];
  constructor() {
    super();
  }
  /**
   *
   * @returns
   */
  static getAllCacheProviders() {
    let databases = ConfigService.getCustomConfig()["cache"] || [];
    return Object.keys(databases).map((cacheIdentifier: string) => {
      return {};
    });
  }
}
