import { WrappidLogger } from "../logging/wrappid.logger";
import { cacheProvider } from "./cache.provider";

const clientConnect = async (clientName: string) => {
  try {
    WrappidLogger.logFunctionStart("clientConnect");
    cacheProvider[clientName].client.on("error", (err: any) =>
      WrappidLogger.info(`Redis Client Error ${err}`)
      // console.log("Redis Client Error", err)
    );
    await cacheProvider[clientName].client.connect();
    WrappidLogger.logFunctionEnd("clientConnect");
  } catch (error:any) {
    WrappidLogger.error(error);
  }
};

export const cacheActions = {
  /**
   * The read function helps us to read cache from redis cache
   * 
   * @param clientName : clientName value
   * @param cacheKey : cacheKey value
   * @returns
   */
  read: async (clientName: string, cacheKey: string) => {
    WrappidLogger.logFunctionStart("cacheActions.read");
    await clientConnect(clientName);
    const value = await cacheProvider[clientName].client.get(cacheKey);
    await cacheProvider[clientName].client.disconnect();
    return value;
  },

  /**
   * The update function helps us to update cache from redis cache
   * @param clientName : clientName value
   * @param cacheKey : cacheKey value
   * @param data : data value
   */
  update: async (clientName: string, cacheKey: string, data: string) => {
    WrappidLogger.logFunctionStart("cacheActions.update");
    await clientConnect(clientName);
    await cacheProvider[clientName].client.set(cacheKey, data);
    await cacheProvider[clientName].client.disconnect();
    WrappidLogger.logFunctionEnd("cacheActions.update");
  },

  /**
   * The delete function helps us to delete cache from redis cache
   * 
   * @param clientName : clientName value
   * @param cacheKey : cacheKey value
   */
  delete: async (clientName: string, cacheKey: string) => {
    WrappidLogger.logFunctionStart("cacheActions.delete");
    await clientConnect(clientName);
    const d = await cacheProvider[clientName].client.exists(cacheKey);
    if (d == 1) {
      await cacheProvider[clientName].client.del(cacheKey);
    } else {
      WrappidLogger.info("Key Not Present");
      // console.log("Key Not Present");
    }
    await cacheProvider[clientName].client.disconnect();
    WrappidLogger.logFunctionEnd("cacheActions.delete");
  },
};
