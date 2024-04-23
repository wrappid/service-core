type GenericObject = {
  [key: string]: any;
};

export class ApplicationContext {
  private static context: GenericObject = {};
  
  static getContext(key: string): GenericObject {
    return ApplicationContext.context[key];
  }
  
  static setContext(key: string, value: any): void {
    ApplicationContext.context[key] = value;
  }
}
 