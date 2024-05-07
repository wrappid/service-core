import { WrappidLogger } from "../logging/wrappid.logger";
import { MiddlewaresRegistry } from "../registry";

/**
 * This function will setup default middlewares
 * @param wrappidApp : express application
 */
export function setupMiddlewares(wrappidApp: any) {
  WrappidLogger.logFunctionStart();
  wrappidApp.use(MiddlewaresRegistry.apiLogger);
}