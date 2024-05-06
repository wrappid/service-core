import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";
import { GenericObject } from "../types/generic.types";

let appFunctionsRegistry: any = {};

const setupFunctions = async () => {
  const AppFunctionsRegistry: GenericObject = ApplicationContext.getContext(constant.registry.FUNCTIONS_REGISTRY);

  try {
    appFunctionsRegistry = AppFunctionsRegistry;
    console.log(appFunctionsRegistry);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { appFunctionsRegistry, setupFunctions };

