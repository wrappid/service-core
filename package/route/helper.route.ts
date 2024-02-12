import { Op } from "sequelize";
import { constant } from "../constants/server.constant";
import { databaseActions } from "../database/actions.database";

export const getClientRoutes = async (
  dbName: string,
  authRequired: boolean
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
        source: constant.__RouteSource.CLIENT_SIDE,
      },
    });
  } catch (error) {
    throw error;
  }
};
export const getServerRoutes = async (
  dbName: string,
  authRequired: boolean
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
        source: {
          [Op.in]: [
            constant.__RouteSource.SERVER_SIDE,
            /**
             * @todo
             * Need to remove below value
             */
            "server",
          ],
        },
      },
    });
  } catch (error) {
    throw error;
  }
};
