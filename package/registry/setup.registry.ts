import { getServerRoutes } from "../route/helper.route";
import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";
import  CoreControllersRegistry from  "./ControllersRegistry";
import  CoreFunctionsRegistry  from  "./FunctionsRegistry";
import  CoreMiddlewaresRegistry from  "./MiddlewaresRegistry";
import  CoreModelsRegistry from  "./ModelsRegistry";
import  CoreRoutesRegistry  from  "./RoutesRegistry";
import  CoreTasksRegistry from  "./TasksRegistry";
import  CoreValidationsRegistry  from  "./ValidationsRegistry";

async function getDbRoutes(): Promise<[any]> {
    console.log("----------------------------------");
    const authenticatedServerRoutes: any = await getServerRoutes(
      "application",
      true
    );
    const unauthenticatedServerRoutes: any = await getServerRoutes(
      "application",
      false
    );
    console.log("----------------------------------");
    return {...authenticatedServerRoutes, ...unauthenticatedServerRoutes};
  }
  

/**
 * setup registries in appliaction context  
 * @param ControllersRegistry 
 * @param FunctionsRegistry 
 * @param ModelsRegistry 
 * @param RoutesRegistry 
 * @param TasksRegistry 
 * @param MiddlewaresRegistry 
 * @param ValidationsRegistry 
 */
export async function setupRegistry(ControllersRegistry: any, FunctionsRegistry: any, ModelsRegistry: any, RoutesRegistry: any, TasksRegistry: any, MiddlewaresRegistry:any, ValidationsRegistry:any) {
    ApplicationContext.setContext(constant.registry.CONTROLLERS_REGISTRY, {...CoreControllersRegistry, ...ControllersRegistry});
    ApplicationContext.setContext(constant.registry.FUNCTIONS_REGISTRY,{...CoreFunctionsRegistry, ...FunctionsRegistry});
    ApplicationContext.setContext(constant.registry.MIDDLEWARES_REGISTRY,{...CoreMiddlewaresRegistry, ...MiddlewaresRegistry});
    ApplicationContext.setContext(constant.registry.MODELS__REGISTRY,{...CoreModelsRegistry, ...ModelsRegistry});
    ApplicationContext.setContext(constant.registry.TASKS_REGISTRY,{...CoreTasksRegistry, ...TasksRegistry});
    ApplicationContext.setContext(constant.registry.VALIDATIONS_REGISTRY,{...CoreValidationsRegistry, ...ValidationsRegistry});
    const dbRoutes = await getDbRoutes();
    let  allDbRoutes:any = {};
    Object.keys(dbRoutes).forEach((element:any) => {
    const Routes = dbRoutes[element];
    const { controllerRef, ...rest } = Routes.dataValues; // Destructuring assignment
    const restructuredData = {
        [controllerRef]: rest // Use entityRef as property name
    };
    allDbRoutes = {...allDbRoutes, ...restructuredData};
    });
    ApplicationContext.setContext(constant.registry.ROUTES_REGISTRY,{...CoreRoutesRegistry, ...RoutesRegistry.default, ...allDbRoutes});
}