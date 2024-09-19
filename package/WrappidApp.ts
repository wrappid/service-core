import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { setupCacheProvider } from "./cache/cache.provider";
import { constant } from "./constants/server.constant";
import { ApplicationContext } from "./context/application.context";
import { setupDatabase } from "./database/setup.database";
import { setupModels } from "./database/setup.models.database";
import { setupFunctions } from "./function/setup.functions";
import { setupLogging } from "./logging/setup.logger";
import { DEFAULT_LOGGER_OPTIONS, WrappidLogger } from "./logging/wrappid.logger";
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
  package: GenericObject;
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
  packageInfo:GenericObject;
  swagger:GenericObject;

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
    config: {},
    package: {}
  }) {
    /**
     * Setting up logging in wrappid service application
     */
    WrappidLogger.init(DEFAULT_LOGGER_OPTIONS);
    this.port = wrappidAppConfig.port;
    this.wrappidApp.use(express.static("uploads"));
    this.wrappidApp.use(express.static("build"));
    this.wrappidApp.use(cors(wrappidAppConfig.cors));
    this.wrappidApp.use(bodyParser.json(wrappidAppConfig.bodyPerser.json));
    this.wrappidApp.use(bodyParser.raw(wrappidAppConfig.bodyPerser.raw));
    this.wrappidApp.use(bodyParser.urlencoded(wrappidAppConfig.bodyPerser.urlencoded));
    this.packageInfo=wrappidAppConfig.package;
    this.swagger=wrappidAppConfig.swagger;

    /**
     * setup config to context
     */
    ApplicationContext.setContext(constant.CONFIG_KEY, wrappidAppConfig.config);

    /**
     * set registrues in application context
     */
    setupLocalRegistryContext(wrappidAppConfig.registry);
    
    
  }
  
  async init() {
    WrappidLogger.logFunctionStart("WrappidApp.init");
    /**
     * Setup Databases
     */
    await setupDatabase();
    

    /**
     * Setup Cache Provider
     */
    setupCacheProvider();

    /**
     * Setup Models
     */
    await setupModels();

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
    
    /**
     * Setup Swagger
     */
    setupSwagger(this.wrappidApp,this.packageInfo,this.swagger);

    const serverInit = () => {
      console.log("###########################################");
      console.log(`Server is up and running on port ${this.port}...`);
      console.log("###########################################");
      WrappidLogger.info("###########################################");
      WrappidLogger.info(`Server is up and running on port ${this.port}...`);
      WrappidLogger.info("###########################################");
    };
  
    this.wrappidApp.listen(this.port, serverInit);
    WrappidLogger.logFunctionEnd("WrappidApp.init");
  }
  
}