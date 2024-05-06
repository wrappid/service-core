import { createClient } from "redis";
import { CacheConfig } from "../config/types.config";
import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";

export const cacheProvider: any = {};

/**
 * This function helps us to setup cache
 */
export function setupCacheProvider() {
  const config = ApplicationContext.getContext(constant.CONFIG_KEY);
  
  config?.cache?.forEach(async (data: CacheConfig) => {
    try {
      const client = createClient({
        username: data.username,
        password: data.password,
        socket: {
          host: data.host,
          port: Number(data.port),
        },
      });
      cacheProvider[data.name] = {};
      cacheProvider[data.name].client = client;
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
      console.error(error);
    }
  });
}
