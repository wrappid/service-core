import { App } from "./app";
import { cacheActions } from "./cache/cache.actions";
import { communicate } from "./communication/communicate.communicator";
import { configProvider } from "./config/provider.config";
import { constant, DEFAULT_PORT } from "./constants/server.constant";
import { ApplicationContext } from "./context/application.context";
import { databaseActions } from "./database/actions.database";
import {
  getDatabases,
  getTables,
  getColumns,
} from "./database/helper.database";
import { databaseProvider } from "./database/provider.database";
import { paymentActions } from "./payment/payment.action";
import {
  ControllersRegistry,
  FunctionsRegistry,
  MiddlewaresRegistry,
  ModelsRegistry,
  TasksRegistry,
  ValidationsRegistry,
  RoutesRegistry
} from "./registry/index";
import { APIService } from "./service/api.service";


export {
  APIService,
  ApplicationContext,
  configProvider,
  /**
   * Registry
   */
  ControllersRegistry as CoreControllersRegistry,
  FunctionsRegistry as CoreFunctionsRegistry,
  MiddlewaresRegistry as CoreMiddlewaresRegistry,
  ModelsRegistry as CoreModelsRegistry,
  TasksRegistry as CoreTasksRegistry,
  ValidationsRegistry as CoreValidationsRegistry,
  RoutesRegistry as CoreRoutesRegistry,

  /**
   * Constants
   */
  constant as coreConstant,
  DEFAULT_PORT,

  /**
   *  Database
   */
  databaseProvider,
  databaseActions,
  cacheActions,
  paymentActions,
  getDatabases,
  getTables,
  getColumns,

  /**
   * communication
   */
  communicate,

  /**
   * 
   */
  App,
  /**
   * 
   */
};
