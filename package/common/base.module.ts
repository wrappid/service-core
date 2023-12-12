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
  className: string;
  constructor() {
    this.className = new.target.name;
  }

  onModuleInit() {
    console.log(`${this.className} onModuleInit Called`);
    this.onCoreModuleInit();
  }
  onModuleDestroy() {
    console.log(`${this.className} onModuleDestroy Called`);
    this.onCoreModuleDestroy();
  }
  onApplicationBootstrap() {
    console.log(`${this.className} onApplicationBootstrap Called`);
    this.onCoreApplicationBootstrap();
  }

  abstract onCoreModuleInit(): void;
  abstract onCoreModuleDestroy(): void;
  abstract onCoreApplicationBootstrap(): void;
}
