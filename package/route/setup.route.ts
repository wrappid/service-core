import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";
import { apiLogger } from "../middlewares/apiLogger.middleware";
import { handleError } from "../middlewares/handleError.middleware";
import MiddlewaresRegistry from "../registry/MiddlewaresRegistry";
import { GenericObject } from "../types/generic.types";
import { setupLandingRoute } from "./setup.landing.route";

export const setupRoutes = async (
  app: any
) => {
  try {
    /**
     * Get Controllers and Routes from Context
     */
    const AppControllersRegistry: GenericObject = ApplicationContext.getContext(constant.registry.CONTROLLERS_REGISTRY);
    const AppRoutesRegistry: GenericObject = ApplicationContext.getContext(constant.registry.ROUTES_REGISTRY);


    /**
     * apply middleware(s)
     * 1. apiLogger
     * 2. handleError
     */
    app.use(apiLogger);
    app.use(handleError);

   
    console.log("----------------------------------");
    console.log("Setting up routes...");
    Object.values(AppRoutesRegistry)?.forEach((apiRoute: any) => {
      if (
        typeof AppControllersRegistry[apiRoute?.controllerRef] === "function" ||
        typeof AppControllersRegistry[apiRoute?.controllerRef] === "object"
      ) {
        console.log(`Adding ${apiRoute?.name} route...`);
        let funcArray = [];
        if (
          typeof AppControllersRegistry[apiRoute?.controllerRef] === "function"
        ) {
          funcArray = [AppControllersRegistry[apiRoute?.controllerRef]];
        } else {
          funcArray = [...AppControllersRegistry[apiRoute?.controllerRef]];
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
    /**
     * Setup landing route
     */
    setupLandingRoute(app);

  } catch (error) {
    console.log(error);
    throw error;
  }
};
