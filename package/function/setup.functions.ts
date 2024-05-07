import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";
import { WrappidLogger } from "../logging/wrappid.logger";
import { GenericObject } from "../types/generic.types";

let appFunctionsRegistry: any = {};

const setupFunctions = async () => {
  WrappidLogger.logFunctionStart();
  const AppFunctionsRegistry: GenericObject = ApplicationContext.getContext(constant.registry.FUNCTIONS_REGISTRY);

  try {
    appFunctionsRegistry = AppFunctionsRegistry;
    console.log(appFunctionsRegistry);
  } catch (error:any) {
    WrappidLogger.error(error);
    throw error;
  }
};

export { appFunctionsRegistry, setupFunctions };

