import { cacheProvider } from "./cache.provider";

const clientConnect = async (clientName: string) => {
  try {
    cacheProvider[clientName].client.on("error", (err: any) =>
      console.log("Redis Client Error", err)
    );
    await cacheProvider[clientName].client.connect();
  } catch (error) {
    console.log(error);
  }
};

export const cacheActions = {
  /**
   *
   * @param {*} clientName
   * @param {*} cacheKey
   * @returns
   */
  read: async (clientName: string, cacheKey: string) => {
    try {
      await clientConnect(clientName);
      const value = await cacheProvider[clientName].client.get(cacheKey);
      return value;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await cacheProvider[clientName].client.disconnect();
    }
  },

  /**
   *
   * @param {*} clientName
   * @param {*} cacheKey
   * @param {*} data
   */
  update: async (clientName: string, cacheKey: string, data: string) => {
    try {
      await clientConnect(clientName);

      await cacheProvider[clientName].client.set(cacheKey, data);
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await cacheProvider[clientName].client.disconnect();
    }
  },

  /**
   *
   * @param {*} clientName
   * @param {*} cacheKey
   */
  delete: async (clientName: string, cacheKey: string) => {
    try {
      await clientConnect(clientName);
      const d = await cacheProvider[clientName].client.exists(cacheKey);
      if (d == 1) {
        await cacheProvider[clientName].client.del(cacheKey);
      } else {
        console.log("Key Not Present");
      }
    } catch (error: any) {
      throw new Error(error);
    } finally {
      await cacheProvider[clientName].client.disconnect();
    }
  },
};
