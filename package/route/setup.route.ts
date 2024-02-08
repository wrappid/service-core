import MiddlewaresRegistry from "../registry/MiddlewaresRegistry";
import ControllersRegistry from "../registry/ControllersRegistry";
import { databaseActions } from "../database/actions.database";
import { constant } from "../constants/server.constant";
export const setupRoutes = async (
  app: any,
  AppControllersRegistry: any,
  AppRoutes: any
) => {
  try {
    let controllersRegistry = {
      ...ControllersRegistry,
      ...AppControllersRegistry,
    };
    console.log(controllersRegistry);

    console.log("----------------------------------");
    let dbRoutes: any = await databaseActions.findAll("application", "Routes", {
      where: {
        source: "server",
      },
    });
    console.log("----------------------------------");
    // console.log(apiRoutes);
    console.log("----------------------------------");
    let appRoutes = Object.values(AppRoutes.default);
    let apiRoutes = [...dbRoutes, ...appRoutes];
    console.log("----------------------------------");
    console.log("Setting up routes...");
    apiRoutes.forEach((apiRoute: any) => {
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
