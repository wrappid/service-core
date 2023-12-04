import * as fs from "fs";
import * as path from "path";
import "reflect-metadata"; // Import reflect-metadata to use decorators

export abstract class ClassRegistry {
  private static _registryFolderPaths: string[];
  private static _decoratorFileSuffix: string = ".ts";
  private static _decoratorNames: string[];
  private static _typecastClass: Function = Function;
  private static _classes: { [key: string]: new (...args: any[]) => any } = {};

  /**
   *
   */
  static initialize() {
    ClassRegistry.initializeClassesInFolder(ClassRegistry._registryFolderPaths);
  }

  /**
   *
   * @param classConstructor
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static registerClass(classConstructor: any): void {
    if (this.isCorrectlyDecorated(classConstructor)) {
      ClassRegistry.classes[classConstructor.name] = classConstructor;
    }
  }

  /**
   *
   * @param classConstructor
   * @returns boolean
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static isCorrectlyDecorated(classConstructor: Function): boolean {
    return ClassRegistry._decoratorNames?.some((decoratorName) => {
      return !!Reflect.getMetadata(decoratorName, classConstructor);
    });
  }

  // static getClasses(): Function[] {
  //   return ClassRegistry.classes;
  // }

  // eslint-disable-next-line @typescript-eslint/ban-types
  static getClass(name: string): Function {
    // return ClassRegistry.classes.get(name);
    return ClassRegistry.classes[name];
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  static getClasses(): Function[] {
    // return ClassRegistry.classes.get(name);
    return Object.values(ClassRegistry.classes);
  }

  /**
   *
   * @param className
   * @param args
   * @returns
   */
  static getInstance(className: string, ...args: any[]): any {
    const classConstructor = ClassRegistry.classes[className];
    if (!classConstructor) {
      throw new Error('"' + className + '" not found in registry');
    }
    return new classConstructor(...args);
  }

  /**
   *
   * @param folders
   */
  static initializeClassesInFolder(folders: string[]) {
    folders.forEach((folder) => {
      const files = fs.readdirSync(folder, { withFileTypes: true });

      files.forEach((file) => {
        const filePath = path.join(folder, file.name);
        console.log("Processing:" + filePath);

        if (file.isDirectory()) {
          // Recursively initialize files from subdirectories
          ClassRegistry.initializeClassesInFolder([filePath]);
        } else if (filePath.endsWith(this._decoratorFileSuffix)) {
          // Initialize file
          require(filePath);
        }
      });
    });
  }

  /**
   *
   */
  protected static set registryFolderPaths(value: string[]) {
    ClassRegistry._registryFolderPaths = value;
  }

  /**
   *
   */
  public static set decoratorFileSuffix(value: string) {
    ClassRegistry._decoratorFileSuffix = value;
  }

  /**
   *
   */
  protected static set decoratorNames(value: string[]) {
    ClassRegistry._decoratorNames = value;
  }

  /**
   *
   */
  private static get classes(): any {
    return ClassRegistry._classes;
  }
}
