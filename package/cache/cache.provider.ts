const { createClient } = require("redis");
// const {JSONCache} = require('redis-json');
// const{ Redis } = require('ioredis');
import { configProvider } from "../config/provider.config";
interface cacheDataType {
  name: string;
  username: string;
  password: string;
  host: string;
  port: string;
}
const cacheProvider: any = {};

configProvider.cache.forEach(async (data: cacheDataType) => {
  try {
    const client = createClient({
      username: data.username,
      password: data.password,
      socket: {
        host: data.host,
        port: data.port,
      },
    });
    cacheProvider[data.name] = {};
    cacheProvider[data.name].client = client;
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    console.error(error);
  }
});

module.exports = cacheProvider;
