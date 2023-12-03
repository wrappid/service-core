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

  onModuleInit() {}
  onModuleDestroy() {}
  onApplicationBootstrap() {}
}
