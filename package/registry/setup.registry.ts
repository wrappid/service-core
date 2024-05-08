import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";
import { WrappidLogger } from "../logging/wrappid.logger";
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
  try {
    WrappidLogger.logFunctionStart("getDbRoutes");
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
  } catch (error:any) {
    WrappidLogger.error(error);
    throw error;
  } finally {
    WrappidLogger.logFunctionEnd ("getDbRoutes");
  }
}
  

/**
 * Setup registries in appliaction context
 * 
 * @param registry : all registry
 */
export function setupLocalRegistryContext(registry: WrappidRegistryType) {
  try {
    WrappidLogger.logFunctionStart("setupLocalRegistryContext");
    ApplicationContext.setContext(constant.registry.CONTROLLERS_REGISTRY, {...CoreControllersRegistry, ...registry.ControllersRegistry});
    ApplicationContext.setContext(constant.registry.FUNCTIONS_REGISTRY,{...CoreFunctionsRegistry, ...registry.FunctionsRegistry});
    ApplicationContext.setContext(constant.registry.MIDDLEWARES_REGISTRY,{...CoreMiddlewaresRegistry, ...registry.MiddlewaresRegistry});
    ApplicationContext.setContext(constant.registry.MODELS__REGISTRY,{...CoreModelsRegistry, ...registry.ModelsRegistry});
    ApplicationContext.setContext(constant.registry.TASKS_REGISTRY,{...CoreTasksRegistry, ...registry.TasksRegistry});
    ApplicationContext.setContext(constant.registry.VALIDATIONS_REGISTRY,{...CoreValidationsRegistry, ...registry.ValidationsRegistry});
    ApplicationContext.setContext(constant.registry.ROUTES_REGISTRY,{...CoreRoutesRegistry, ...registry.RoutesRegistry.default});
  } catch (error:any) {
    WrappidLogger.error(error);
    throw error;
  } finally {
    WrappidLogger.logFunctionEnd("setupLocalRegistryContext");

  }
}

/**
 * This function will update database registry to context
 */
export async function updateDatabaseRegistryContext() {
  try {
    WrappidLogger.logFunctionStart("updateDatabaseRegistryContext");
    const dbRoutes: GenericObject = await getDbRoutes();
    let  allDbRoutes: GenericObject = {};
    Object.keys(dbRoutes).forEach((element: string) => {
      const Routes = dbRoutes[element];
      const { controllerRef } = Routes.dataValues; // Destructuring assignment
      const restructuredData = {
        [controllerRef]: {...Routes.dataValues} // Use entityRef as property name
      };
      allDbRoutes = {...allDbRoutes, ...restructuredData};
    });
    ApplicationContext.setContext(constant.registry.ROUTES_REGISTRY,{...ApplicationContext.getContext(constant.registry.ROUTES_REGISTRY), ...allDbRoutes}); 
    WrappidLogger.logFunctionEnd("updateDatabaseRegistryContext");
  } catch (error:any) {
    WrappidLogger.error(error);
    // console.error("WrappidError: Setting up routes from database failed.");
  }
}