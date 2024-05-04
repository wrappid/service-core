import { constant } from "../constants/server.constant";
import { databaseActions } from "../database/actions.database";

const getRoutes = async (
  dbName: string,
  authRequired: boolean,
  type: string
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    /**
     * Getting all routes
     *
     */
    return await databaseActions.findAll(dbName, "Routes", {
      where: {
        authRequired: authRequired,
        _status: constant.entityStatus.PUBLISHED,
        source: type,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getClientRoutes = async (
  dbName: string,
  authRequired: boolean
) => {
  return await getRoutes(dbName, authRequired, constant.__RouteSource.CLIENT_SIDE);
};

export const getServerRoutes = async (
  dbName: string,
  authRequired: boolean
) => {
  return await getRoutes(dbName, authRequired, constant.__RouteSource.SERVER_SIDE);
};
