import { ModelRegistry } from "../registry/ModelRegistry";

// eslint-disable-next-line @typescript-eslint/ban-types
export function ModelDecorator(target: Function) {
  // You can perform any logic here
  ModelRegistry.initialize();
  Reflect.defineMetadata(ModelDecorator.name, true, target);
  ModelRegistry.registerClass(target);
  console.log(`Class ${target.name} has been decorated to be a Model.`);
}
