import { ModelDecorator } from "../decorators/ModelDecorator";
import { ClassRegistry } from "./ClassRegistry";
import { join } from "path";

// const DEFAULT_REGISTRY_FILE_LOCATIONS = [path.join(__dirname, "../commands")];
const DEFAULT_REGISTRY_FILE_LOCATIONS = [join(__dirname, "../")];
const DEFAULT_DECORATOR_NAMES = [ModelDecorator.name];

export class ModelRegistry extends ClassRegistry {
  static initialize() {
    ClassRegistry.registryFolderPaths = DEFAULT_REGISTRY_FILE_LOCATIONS;
    ClassRegistry.decoratorNames = DEFAULT_DECORATOR_NAMES;
    ClassRegistry.initialize();
  }
}
