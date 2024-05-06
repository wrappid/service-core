import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { setupCacheProvider } from "./cache/cache.provider";
import { constant } from "./constants/server.constant";
import { ApplicationContext } from "./context/application.context";
import { setupDatabase } from "./database/setup.database";
import { setupModels } from "./database/setup.models.database";
import { setupFunctions } from "./function/setup.functions";
import { setupLogging } from "./logging/setup.logging";
import { setupMiddlewares } from "./middlewares/setup.middleware";
import { setupLocalRegistryContext, updateDatabaseRegistryContext } from "./registry/setup.registry";
import { setupRoutes } from "./route/setup.route";
import setupSwagger from "./swagger/swagger.setup";
import { setupTasks } from "./tasks/setup.tasks";
import { GenericObject } from "./types/generic.types";

export type WrappidAppConfigType = {
  port?: string | number;
  bodyPerser?: GenericObject;
  cors?: GenericObject;
  registry: WrappidRegistryType;
  swagger: GenericObject;
  config: GenericObject;
};

export type WrappidRegistryType = {
  ControllersRegistry: GenericObject;
  FunctionsRegistry: GenericObject;
  MiddlewaresRegistry: GenericObject;
  ModelsRegistry: GenericObject;
  RoutesRegistry: GenericObject;
  TasksRegistry: GenericObject;
  ValidationsRegistry: GenericObject;
};

/**
 * This is a WrappidApp class 
 */
export default class WrappidApp {
  private port: string | number = 8080;
  wrappidApp = express();

  constructor(wrappidAppConfig: WrappidAppConfigType = {
    port: 8080,
    cors: {},
    bodyPerser: {
      json: { limit: "50mb" },
      raw: {
        inflate: true,
        limit: "50mb",
        type: "application/octet-stream",
      },
      urlencoded: { extended: true }
    },
    registry: {
      ControllersRegistry: {}, 
      FunctionsRegistry: {}, 
      ModelsRegistry: {}, 
      RoutesRegistry: {}, 
      TasksRegistry: {}, 
      MiddlewaresRegistry: {}, 
      ValidationsRegistry: {}
    },
    swagger: {},
    config: {}
  }) {
    this.port = wrappidAppConfig.port;
    this.wrappidApp.use(express.static("uploads"));
    this.wrappidApp.use(express.static("build"));
    this.wrappidApp.use(cors(wrappidAppConfig.cors));
    this.wrappidApp.use(bodyParser.json(wrappidAppConfig.bodyPerser.json));
    this.wrappidApp.use(bodyParser.raw(wrappidAppConfig.bodyPerser.raw));
    this.wrappidApp.use(bodyParser.urlencoded(wrappidAppConfig.bodyPerser.urlencoded));
    
    /**
     * setup config to context
     */
    ApplicationContext.setContext(constant.CONFIG_KEY, wrappidAppConfig.config);

    /**
     * set registrues in application context
     */
    setupLocalRegistryContext(wrappidAppConfig.registry);
    
    /**
     *  Setup swagger API Docs
     */
    setupSwagger(this.wrappidApp, wrappidAppConfig.swagger);
  }

  async init() {
    /**
     * Setup Databases
     */
    setupDatabase();
    

    /**
     * Setup Cache Provider
     */
    setupCacheProvider();

    /**
     * Setup Models
     */
    setupModels();

    /**
     * update database registry to context
     */
    await updateDatabaseRegistryContext();
    
    /**
     * Setup Tasks
     */
    setupTasks();
    
    /**
     * Setup Default Middlewares
     */
    setupMiddlewares(this.wrappidApp);
    
    /**
     * Setup Functions
     */
    setupFunctions();
    
    /**
     * Setup Routes
     */
    setupRoutes(this.wrappidApp);
  
    /**
     * Setup Logging
     */
    setupLogging(this.wrappidApp);

    const serverInit = () => {
      console.log("###########################################");
      console.log(`Server is up and running on port ${this.port}...`);
      console.log("###########################################");
    };
  
    this.wrappidApp.listen(this.port, serverInit);
  }
}