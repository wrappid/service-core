import { MiddlewaresRegistry } from "../registry";

/**
 * This function will setup default middlewares
 * @param wrappidApp : express application
 */
export function setupMiddlewares(wrappidApp: any) {
  wrappidApp.use(MiddlewaresRegistry.apiLogger);
}