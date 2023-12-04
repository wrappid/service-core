import { Module, OnModuleInit } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { DatabaseModule } from "../database/database.module";
import BaseModule from "../common/base.module";
import { ModelRegistry } from "../registry/ModelRegistry";

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule extends BaseModule {
  onModuleInit() {
    ModelRegistry.initialize();
  }
  // onModuleDestroy() {}
  // onApplicationBootstrap() {}
}
