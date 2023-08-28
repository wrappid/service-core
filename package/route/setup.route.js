const { ControllersRegistry, MiddlewaresRegistry } = require("../registry");
const databaseActions = require("../database/actions.database");
const { constant } = require("../constants/server.constant");

const setupRoutes = async (app, AppControllersRegistry) => {
  let controllersRegistry = {
    ...ControllersRegistry,
    ...AppControllersRegistry,
  };
  console.log(controllersRegistry);

  console.log(`----------------------------------`);
  let apiRoutes = await databaseActions.findAll("application", "Routes", {
    where: {
      source: "server",
    },
  });
  console.log(`----------------------------------`);
  console.log(apiRoutes);
  console.log(`----------------------------------`);

  console.log(`----------------------------------`);
  console.log(`Setting up routes...`);
  apiRoutes.forEach((apiRoute) => {
    console.log(`Adding ${apiRoute?.name} route...`);
    if (typeof controllersRegistry[apiRoute?.controllerRef] === "function" || typeof controllersRegistry[apiRoute?.controllerRef] === "object") {
      let funcArray = [...controllersRegistry[apiRoute?.controllerRef]];
      /**
       * Attach jwtVerify middleware
       *
       */
      if (apiRoute?.authRequired) {
        funcArray = [MiddlewaresRegistry.jwtVerify, ...funcArray];
      }

      switch (apiRoute?.reqMethod) {
        case constant.httpMethod.HTTP_GET:
          app.get(
            `/${apiRoute?.url}`,
            funcArray
          );
          break;
        case constant.httpMethod.HTTP_POST:
          app.post(
            `/${apiRoute?.url}`,
            funcArray
          );
          break;
        case constant.httpMethod.HTTP_PUT:
          app.put(
            `/${apiRoute?.url}`,
            funcArray
          );
          break;
        case constant.httpMethod.HTTP_PATCH:
          app.patch(
            `/${apiRoute?.url}`,
            funcArray
          );
          break;
        default:
          console.log(
            `${apiRoute.name} is not set because request method is missing.`
          );
          break;
      }
    }
  });
  console.log(`Routes setup successfully.`);
  console.log(`----------------------------------`);
};

module.exports = setupRoutes;
