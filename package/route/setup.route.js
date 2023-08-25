/**
 * @todo
 * 1)get routesregistry from modules.routes.registry.js
 * 2)run a loop on  modules.routes.registry to use every single router present in the module 
 * 3)
 */

const {ControllersRegistry} = require("../registry");
const databaseActions = require("../database/actions.database");

const setupRoutes = async (app, AppControllersRegistry) => {
  let controllersRegistry = { ...ControllersRegistry, ...AppControllersRegistry };
  console.log(controllersRegistry);

  console.log(`----------------------------------`);
  let apiRoutes = await databaseActions.findAll("application", "Routes", {
    where: {
      source: "server"
    }
  });
  console.log(`----------------------------------`);
  console.log(apiRoutes);
  console.log(`----------------------------------`);

  console.log(`----------------------------------`);
  console.log(`Setting up routes...`);
  apiRoutes.forEach((apiRoute) => {
    console.log(`Adding ${apiRoute?.name} route...`);
    app.use(`/${apiRoute?.url}`, controllersRegistry[apiRoute?.controllerRef]);
  });
  console.log(`Routes setup successfully.`);
  console.log(`----------------------------------`);
}

module.exports = setupRoutes;