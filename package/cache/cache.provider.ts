import { CacheConfig } from "config/types.config";
import { createClient } from "redis";
import { configProvider } from "../config/provider.config";

const cacheProvider: any = {};

configProvider().cache.forEach(async (data: CacheConfig) => {
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

export { cacheProvider };
