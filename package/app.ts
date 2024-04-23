import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { constant } from "./constants/server.constant";
import { ApplicationContext } from "./context/application.context";
import { setupModels } from "./database/setup.database";
import { setupFunctions } from "./function/setup.functions";
import { setupLogging } from "./logging/setup.logging";
import  CoreControllersRegistry  from "./registry/ControllersRegistry";
import  CoreFunctionsRegistry from "./registry/FunctionsRegistry";
import  {MiddlewaresRegistry} from "./registry/index";
import  CoreMiddlewaresRegistry from "./registry/MiddlewaresRegistry";
import  CoreModelsRegistry from "./registry/ModelsRegistry";
import  CoreRoutesRegistry from "./registry/RoutesRegistry";
import  CoreTasksRegistry from "./registry/TasksRegistry";
// import  CoreValidationsRegistry from "./registry/ValidationsRegistry";


import { getServerRoutes } from "./route/helper.route";
import { setupRoutes } from "./route/setup.route";
import setupSwagger from "./swagger/swagger.setup";
import { setupTasks } from "./tasks/setup.tasks";

async function getDbRoutes() {
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

export async function app(wrappidApp: any,ControllersRegistry: any, FunctionsRegistry: any, ModelsRegistry: any, RoutesRegistry: any, TasksRegistry: any, swaggerJsonFile: any){
  
  const options = {
    inflate: true,
    limit: "50mb",
    type: "application/octet-stream",
  };
  
  wrappidApp.use(express.static("uploads"));
  wrappidApp.use(express.static("build"));
  wrappidApp.use(cors());
  wrappidApp.use(bodyParser.json({ limit: "50mb" }));
  wrappidApp.use(bodyParser.raw(options));
  wrappidApp.use(bodyParser.urlencoded({ extended: true }));
  
  /**
   * Setup Models
   */
  setupModels(ModelsRegistry);
  
  /**
   * Setup Tasks
   */
  setupTasks(TasksRegistry);
  
  /**
   * Setup Default Middlewares
   */
  wrappidApp.use(MiddlewaresRegistry.apiLogger);
  
  /**
   * Setup Functions
   */
  setupFunctions(FunctionsRegistry);
  
  /**
   * Setup Routes
   */
  setupRoutes(wrappidApp, ControllersRegistry, RoutesRegistry);
  
  /**
   *  Setup swagger API Docs
   */
  setupSwagger(wrappidApp, swaggerJsonFile);

  /**
   * Setup Logging
   */
  setupLogging(wrappidApp);

  /**
  * setup registries in appliaction context  
  */
  ApplicationContext.setContext(constant.registry.CONTROLLERS_REGISTRY, {...CoreControllersRegistry, ...ControllersRegistry});
  ApplicationContext.setContext(constant.registry.FUNCTIONS_REGISTRY,{...CoreFunctionsRegistry, ...FunctionsRegistry});
  ApplicationContext.setContext(constant.registry.MIDDLEWARES_REGISTRY,{...CoreMiddlewaresRegistry, ...MiddlewaresRegistry});
  ApplicationContext.setContext(constant.registry.MODELS__REGISTRY,{...CoreModelsRegistry, ...ModelsRegistry});
  ApplicationContext.setContext(constant.registry.TASKS_REGISTRY,{...CoreTasksRegistry, ...TasksRegistry});
  // ApplicationContext.setContext(constant.registry.VALIDATIONS_REGISTRY,{...CoreValidationsRegistry, ...ValidationsRegistry});
  ApplicationContext.setContext(constant.registry.ROUTES_REGISTRY,{...CoreRoutesRegistry, ...RoutesRegistry, ...await getDbRoutes()});
  
  
}

