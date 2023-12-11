import { Injectable } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import BaseService from "../common/base.service";
import { Redis } from "ioredis";

@Injectable()
export class RedisCacheService extends BaseService {
  private cacheModules: Map<string, any> = new Map();

  constructor() {
    super();
    let caches = ConfigService.getCustomConfig()["cache"] || [];
    Object.keys(caches).forEach((cacheName: string) => {
      const redisInstance = new Redis({ ...caches[cacheName] });
      this.cacheModules.set(cacheName, redisInstance);
    });
  }
  /**
   *
   * @returns
   */
  static getAllCacheProviders() {
    try {
      let caches = ConfigService.getCustomConfig()["cache"] || [];
      return Object.keys(caches).map((cacheName: string) => {
        return {
          provide: "RedisClient",
          useFactory: async () => {
            const redisInstance = new Redis({ ...caches[cacheName] });
            redisInstance.on("error", (e) => {
              throw new Error(`Redis connection failed: ${e}`);
            });
            return redisInstance;
          },
        };
      });
    } catch (error) {
      console.error("Unable to connect ", error);
    }
  }

  /**
   *
   * @returns
   */
  async checkConnection(): Promise<boolean> {
    try {
      this.cacheModules.forEach(async (dbConn: Redis, dbIdentifier: string) => {
        try {
          await dbConn.ping();

          console.log(
            `All Redis Cache connection has been established successfully.`
          );
        } catch (error) {
          console.error(
            `Unable to connect to the ${dbIdentifier} cache:`,
            error
          );
        }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   *
   * @param connectionName
   * @param key
   * @param value
   */
  async update(
    connectionName: string,
    key: string,
    value: string,
    ttl?: number
  ) {
    try {
      const DEFAULT_TTL: number = 40;
      if (ttl == null) {
        ttl = DEFAULT_TTL;
      }
      const cacheConnection = this.cacheModules.get(connectionName);
      let d = await cacheConnection.exists(key);
      if (!d) {
        //create cache
        console.log("Cache Key Not Present");
        await cacheConnection.set(key, value);
        await cacheConnection.expire(key, ttl);
      } else {
        //update cache
        await cacheConnection.set(key, value);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
  /**
   *
   * @param connectionName
   * @param key
   * @returns
   */
  async read(connectionName: string, key: string): Promise<string> {
    try {
      const cacheConnection = this.cacheModules.get(connectionName);
      let data = await cacheConnection.get(key);
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param connectionName
   * @param key
   */
  async delete(connectionName: string, key: string) {
    try {
      const cacheConnection = this.cacheModules.get(connectionName);
      let d = await cacheConnection.exists(key);
      if (!d) {
        console.log("Cache Key Not Present");
      } else {
        await cacheConnection.del(key);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
