import { appFunctionsRegistry } from "../function/setup.functions";
import CoreFunctionsRegistry from "../modules/_system/functions.registry";

const FunctionsRegistry: any = {
  ...appFunctionsRegistry,
  ...CoreFunctionsRegistry
};
export default FunctionsRegistry;
