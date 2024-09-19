/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-description */
import { constant } from "../constants/server.constant";
import { databaseActions } from "../database/actions.database";
import { WrappidLogger } from "../logging/wrappid.logger";

const getRoutes = async (
  dbName: string,
  authRequired: boolean,
  type: string
) => {
  WrappidLogger.logFunctionStart("getRoutes");
  // eslint-disable-next-line no-useless-catch
  try {
    /**
     * Getting all routes
     *
     */
    return await databaseActions.findAll(dbName, "Routes", {
      where: {
        "extraInfo.authRequired": authRequired,
        _status: constant.entityStatus.PUBLISHED,
        "schema.source": type,
      },
    });
  } catch (error:any) {
    WrappidLogger.error(error);
    throw error;
  }finally {
    WrappidLogger.logFunctionEnd("getRoutes");
  }

};

export const getClientRoutes = async (
  dbName: string,
  authRequired: boolean
) => {
  return await getRoutes(dbName, authRequired, constant.__RouteSource.CLIENT_SIDE);
};



/**
 *
 * @param input any
 * @returns any
 * @description This function is used to transform the route data
 * @example
 * const transformedData = transformRouteData(input);
*/
function transformRouteData(input:any) {
  const { schema, extraInfo, ...rest } = input;
  
  return {
    ...rest,
    ...schema,
    ...extraInfo
  };
}

export const getServerRoutes = async (
  dbName: string,
  authRequired: boolean
) => {

  const data =  await getRoutes(dbName, authRequired, constant.__RouteSource.SERVER_SIDE);
  data.forEach((element:any) => {
    element.dataValues = transformRouteData(element.dataValues);
  });
  return data;
};
