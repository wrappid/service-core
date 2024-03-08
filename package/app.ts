import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { setupModels } from "./database/setup.database";
import { setupFunctions } from "./function/setup.functions";
import { setupLogging } from "./logging/setup.logging";
import { MiddlewaresRegistry } from "./registry/index";
import { setupRoutes } from "./route/setup.route";
import setupSwagger from "./swagger/swagger.setup";
import { setupTasks } from "./tasks/setup.tasks";


export function app(wrappidApp: any,ControllersRegistry: any, FunctionsRegistry: any, ModelsRegistry: any, RoutesRegistry: any, TasksRegistry: any, swaggerJsonFile: any){
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
   * Setup Logging
   */
  setupLogging(wrappidApp);
  
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
}
  