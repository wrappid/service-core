import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { constant } from "./constants/server.constant";
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
import  CoreValidationsRegistry from "./registry/ValidationsRegistry";


import { setupRoutes } from "./route/setup.route";
import setupSwagger from "./swagger/swagger.setup";
import { setupTasks } from "./tasks/setup.tasks";
import { ApplicationContext } from "context/application.context";


export function app(wrappidApp: any,ControllersRegistry: any, FunctionsRegistry: any, ModelsRegistry: any, RoutesRegistry: any, TasksRegistry: any, swaggerJsonFile: any){
  /**
  * setup registries in appliaction context  
  */
  ApplicationContext.setContext(constant.registry.CONTROLLER_REGISTRY, {...CoreControllersRegistry, ...ControllersRegistry});
  ApplicationContext.setContext(constant.registry.FUNCTION_REGISTRY,{...CoreFunctionsRegistry, ...CoreFunctionsRegistry});
  ApplicationContext.setContext(constant.registry.MIDDLEWARE_REGISTRY,{...CoreMiddlewaresRegistry, ...CoreMiddlewaresRegistry});
  ApplicationContext.setContext(constant.registry.MODELS__REGISTRY,{...CoreModelsRegistry, ...CoreModelsRegistry});
  ApplicationContext.setContext(constant.registry.TASKS_REGISTRY,{...CoreTasksRegistry, ...CoreTasksRegistry});
  ApplicationContext.setContext(constant.registry.VALIDATIONS_REGISTRY,{...CoreValidationsRegistry, ...CoreValidationsRegistry});
  ApplicationContext.setContext(constant.registry.ROUTES_REGISTRY,{...CoreRoutesRegistry, ...CoreRoutesRegistry});
 
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
}