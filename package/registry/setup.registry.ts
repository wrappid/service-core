import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";
import { getServerRoutes } from "../route/helper.route";
import { GenericObject } from "../types/generic.types";
import { WrappidRegistryType } from "../WrappidApp";
import CoreControllersRegistry from "./ControllersRegistry";
import CoreFunctionsRegistry from "./FunctionsRegistry";
import CoreMiddlewaresRegistry from "./MiddlewaresRegistry";
import CoreModelsRegistry from "./ModelsRegistry";
import CoreRoutesRegistry from "./RoutesRegistry";
import CoreTasksRegistry from "./TasksRegistry";
import CoreValidationsRegistry from "./ValidationsRegistry";

/**
 * This functions helps us to get all server routes from database
 * 
 * @returns serverRoutes
 */
async function getDbRoutes(): Promise<GenericObject> {
  console.log("----------------------------------");
  const authenticatedServerRoutes: GenericObject = await getServerRoutes(
    "application",
    true
  );
  const unauthenticatedServerRoutes: GenericObject = await getServerRoutes(
    "application",
    false
  );
  console.log("----------------------------------");
  return <GenericObject>{...authenticatedServerRoutes, ...unauthenticatedServerRoutes};
}
  

/**
 * Setup registries in appliaction context
 * 
 * @param registry : all registry
 */
export function setupLocalRegistryContext(registry: WrappidRegistryType) {
  ApplicationContext.setContext(constant.registry.CONTROLLERS_REGISTRY, {...CoreControllersRegistry, ...registry.ControllersRegistry});
  ApplicationContext.setContext(constant.registry.FUNCTIONS_REGISTRY,{...CoreFunctionsRegistry, ...registry.FunctionsRegistry});
  ApplicationContext.setContext(constant.registry.MIDDLEWARES_REGISTRY,{...CoreMiddlewaresRegistry, ...registry.MiddlewaresRegistry});
  ApplicationContext.setContext(constant.registry.MODELS__REGISTRY,{...CoreModelsRegistry, ...registry.ModelsRegistry});
  ApplicationContext.setContext(constant.registry.TASKS_REGISTRY,{...CoreTasksRegistry, ...registry.TasksRegistry});
  ApplicationContext.setContext(constant.registry.VALIDATIONS_REGISTRY,{...CoreValidationsRegistry, ...registry.ValidationsRegistry});
  ApplicationContext.setContext(constant.registry.ROUTES_REGISTRY,{...CoreRoutesRegistry, ...registry.RoutesRegistry.default});
}

/**
 * This function will update database registry to context
 */
export async function updateDatabaseRegistryContext() {
  try {
    const dbRoutes: GenericObject = await getDbRoutes();
    let  allDbRoutes: GenericObject = {};
    Object.keys(dbRoutes).forEach((element: string) => {
      const Routes = dbRoutes[element];
      const { controllerRef, ...rest } = Routes.dataValues; // Destructuring assignment
      const restructuredData = {
        [controllerRef]: {...rest} // Use entityRef as property name
      };
      allDbRoutes = {...allDbRoutes, ...restructuredData};
    });
    ApplicationContext.setContext(constant.registry.ROUTES_REGISTRY,{...ApplicationContext.getContext(constant.registry.ROUTES_REGISTRY), ...allDbRoutes}); 
    console.log("Setting up routes from database successful.");
  } catch (error) {
    console.error("WrappidError: Setting up routes from database failed.");
  }
}