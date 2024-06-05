import { WrappidLogger } from "../logging/wrappid.logger";

type GenericObject = {
  [key: string]: any;
};

export class ApplicationContext {
  private static context: GenericObject = {};
  
  static getContext(key: string):any{
    WrappidLogger.logFunctionStart("ApplicationContext.getContext");
    return ApplicationContext.context[key];
  }
  
  static setContext(key: string, value: any): void {
    WrappidLogger.logFunctionStart("ApplicationContext.setContext");
    ApplicationContext.context[key] = value;
  }
}
 