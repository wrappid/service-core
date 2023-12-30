import { INestApplicationContext } from "@nestjs/common";
import { NestApplicationContext } from "@nestjs/core";

/**
 * @todo
 * singleton
 *
 *
 */
export class ApplicationContext {
  private static _instance: ApplicationContext;
  nestAppContext: INestApplicationContext;

  constructor(appContext?: INestApplicationContext) {
    this.nestAppContext = appContext;
  }

  public static getInstance(
    appContext?: INestApplicationContext
  ): ApplicationContext {
    if (!ApplicationContext._instance) {
      ApplicationContext._instance = new ApplicationContext(appContext);
    }
    return ApplicationContext._instance;
  }
}
