import {
  OnModuleInit,
  OnModuleDestroy,
  OnApplicationBootstrap,
} from "@nestjs/common";
/**
 * This is the Base Module class
 */
export default abstract class BaseModule
  implements OnModuleInit, OnModuleDestroy, OnApplicationBootstrap
{
  constructor() {}

  onModuleInit() {
    console.log(`onModuleInit Called`);
  }
  onModuleDestroy() {
    console.log(`onModuleDestroy Called`);
  }
  onApplicationBootstrap() {
    console.log(`onApplicationBootstrap Called`);
  }
}
