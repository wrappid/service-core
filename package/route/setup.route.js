/**
 * @todo
 * 1)get routesregistry from modules.routes.registry.js
 * 2)run a loop on  modules.routes.registry to use every single router present in the module 
 * 3)
 */

const {RoutesRegistry} = require("../registry");

const setupRoutes = (app, AppRoutesRegistry) => {
  let routesRegistry = { ...RoutesRegistry, ...AppRoutesRegistry}; 
  console.log(`----------------------------------`);
  console.log(`Setting up routes...`);
  Object.keys(routesRegistry).forEach((route) => {
    console.log(`Adding ${route} route...`);
    app.use(`/${route}`, routesRegistry[route]);
  });
  console.log(`Routes setup successfully.`);
  console.log(`----------------------------------`);
}

module.exports = setupRoutes;