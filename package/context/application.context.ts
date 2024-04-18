import { GenericObject } from "types/generic.types";


export class ApplicationContext {
  private static context: GenericObject = {};
  
  static getContext(key: string): GenericObject {
    return ApplicationContext.context[key];
  }
  
  static setContext(key: string, value: any): void {
    ApplicationContext.context[key] = value;
  }
}
  
// // Usage
// const key = "abdm";
// const userData = "dfdfdf";
  
// ApplicationContext.setContext(key, userData);
  
// const retrievedData = ApplicationContext.getContext()[key];
// console.log(retrievedData); // Output: { name: "Alice", role: "admin" }
  