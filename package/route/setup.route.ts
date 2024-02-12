import { constant } from "../constants/server.constant";
import { apiLogger } from "../middlewares/apiLogger.middleware";
import { handleError } from "../middlewares/handleError.middleware";
import ControllersRegistry from "../registry/ControllersRegistry";
import MiddlewaresRegistry from "../registry/MiddlewaresRegistry";
import { getServerRoutes } from "./helper.route";

export const setupRoutes = async (
  app: any,
  AppControllersRegistry: any,
  AppRoutes: any
) => {
  try {
    /**
     * apply middleware(s)
     * 1. apiLogger
     * 2. handleError
     */
    app.use(apiLogger);
    app.use(handleError);

    const controllersRegistry = {
      ...ControllersRegistry,
      ...AppControllersRegistry,
    };
    console.log(controllersRegistry);

    console.log("----------------------------------");
    const authenticatedServerRoutes: any = await getServerRoutes(
      "application",
      true
    );
    const unauthenticatedServerRoutes: any = await getServerRoutes(
      "application",
      false
    );
    const localServerRoutes = Object.values(AppRoutes.default);
    const serverRoutes = [
      ...authenticatedServerRoutes,
      ...unauthenticatedServerRoutes,
      ...localServerRoutes,
    ];

    console.log("----------------------------------");
    console.log("Setting up routes...");
    serverRoutes.forEach((apiRoute: any) => {
      if (
        typeof controllersRegistry[apiRoute?.controllerRef] === "function" ||
        typeof controllersRegistry[apiRoute?.controllerRef] === "object"
      ) {
        console.log(`Adding ${apiRoute?.name} route...`);
        let funcArray = [];
        if (
          typeof controllersRegistry[apiRoute?.controllerRef] === "function"
        ) {
          funcArray = [controllersRegistry[apiRoute?.controllerRef]];
        } else {
          funcArray = [...controllersRegistry[apiRoute?.controllerRef]];
        }

        /* Attach jwtVerify middleware */
        if (apiRoute?.authRequired && apiRoute?.authRequired === true) {
          funcArray = [MiddlewaresRegistry.jwtVerify, ...funcArray];
        }

        switch (apiRoute?.reqMethod) {
          case constant.httpMethod.HTTP_GET:
            app.get(`/${apiRoute?.url}`, funcArray);
            break;
          case constant.httpMethod.HTTP_POST:
            app.post(`/${apiRoute?.url}`, funcArray);
            break;
          case constant.httpMethod.HTTP_PUT:
            app.put(`/${apiRoute?.url}`, funcArray);
            break;
          case constant.httpMethod.HTTP_PATCH:
            app.patch(`/${apiRoute?.url}`, funcArray);
            break;
          default:
            console.log(
              `${apiRoute.name} is not set because request method is missing.`
            );
            break;
        }
      } else {
        console.log(`CANNOT ADD ${apiRoute?.name} ROUTE...`);
      }
    });
    console.log("Routes setup successfully.");
    console.log("----------------------------------");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
