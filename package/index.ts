import { Module } from "@nestjs/common";
import { AppModule } from "./app/app.module";
import { ConfigModule } from "./config/config.module";
import { LoggingMiddleware } from "./middleware/logging.middleware";
import { ValidationPipe } from "./middleware/validation.pipes";
import { DatabaseService } from "./database/database.service";
import { DatabaseModule } from "./database/database.module";
import { ApiRequestLogs } from "./models/ApiRequestLogs.model";
import { ConfigConstant } from "./constant/config.constant";
import BaseModule from "./common/base.module";
import BaseController from "./common/base.controller";
import BaseService from "./common/base.service";
import { ClassRegistry } from "./registry/ClassRegistry";
import { ModelRegistry } from "./registry/ModelRegistry";
import { ModelCtor } from "sequelize-typescript";

@Module({
  imports: [AppModule, ConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
  exports: [AppModule], // Export AppModule to make it available for other modules
})
class RootModule extends BaseModule {
  constructor(private readonly databaseService: DatabaseService) {
    super();
  }

  onModuleInit() {
    console.log(`::===RootModule has been Initialization===::`);
    ModelRegistry.initialize();
    const modelArray = ClassRegistry.getClasses();
    console.log(modelArray);
    this.databaseService.addModels(modelArray as ModelCtor[], "wrappid");
  }
}

export {
  BaseModule,
  BaseService,
  BaseController,
  ConfigConstant,
  RootModule,
  DatabaseModule,
  DatabaseService,
  LoggingMiddleware,
  ValidationPipe,
};
