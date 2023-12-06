import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";
import { LoggingMiddleware } from "./middleware/logging.middleware";
import { ValidationPipe } from "./middleware/validation.pipes";
import { DatabaseService } from "./database/database.service";
import { DatabaseModule } from "./database/database.module";
import { ConfigConstant } from "./constant/config.constant";
import BaseModule from "./common/base.module";
import BaseController from "./common/base.controller";
import BaseService from "./common/base.service";
import { ClassRegistry } from "./registry/ClassRegistry";
import { ModelRegistry } from "./registry/ModelRegistry";
import { ModelCtor } from "sequelize-typescript";
import { join } from "path";
import { ModelDecorator } from "./decorators/model.decorator";
import BaseModel from "./common/base.model";
import { FileHandlerMiddleware } from "./middleware/fileHandler.middleware";
import { ApiRequestLogs } from "./models/ApiRequestLogs.model";

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
  exports: [], // Export AppModule to make it available for other modules
})
class RootModule extends BaseModule {
  constructor(private readonly databaseService: DatabaseService) {
    super();
  }

  onModuleInit() {
    console.log(`::===RootModule has been Initialization===::`);
    this.databaseService.addModels([ApiRequestLogs], "wrappid");

    // ModelRegistry.initialize([join(__dirname, "./")]);
    // const modelArray = ClassRegistry.getClasses();
    // console.log(modelArray);
    // this.databaseService.addModels(modelArray as ModelCtor[], "wrappid");
    // console.log(this.databaseService.getConnection("wrappid"));
    // this.databaseService.associateModels();
  }
}

export {
  FileHandlerMiddleware,
  ModelDecorator,
  ModelRegistry,
  ClassRegistry,
  BaseModel,
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
