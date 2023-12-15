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
import { WrappidCacheModule } from "./cache/wrappidcache.module";
import { RedisCacheService } from "./cache/cache.service";
import { Kit19SmsCommunicationService } from "./communication/sms/kit19.sms.communication.service";
import { WhatsappSmsCommunicationService } from "./communication/whatsapp/whatsapp.sms.communication.service";
import { MailSmsCommunicationService } from "./communication/mail/mail.sms.communication.service";
import { WhatsappModule } from "./whatsapp/whatsapp.module";

@Module({
  imports: [ConfigModule, DatabaseModule, WrappidCacheModule, WhatsappModule],
  controllers: [],
  providers: [],
  exports: [], // Export AppModule to make it available for other modules
})
class RootModule extends BaseModule {
  onCoreModuleInit(): void {
    console.log(`::===RootModule::onModuleInit===::`);
    // this.databaseService.addModels([ApiRequestLogs], "wrappid");

    ModelRegistry.initialize([join(__dirname, "./")]);
    // const modelArray = ModelRegistry.getClasses();
    // console.log(modelArray);
    // this.databaseService.addModels(modelArray as ModelCtor[], "wrappid");
    // this.databaseService.associateModels();
    // console.log(this.databaseService.getConnection("wrappid"));
    // console.log(`==================================`);
  }
  onCoreModuleDestroy(): void {}
  onCoreApplicationBootstrap(): void {}
  constructor(private readonly databaseService: DatabaseService) {
    super();
  }
}

export {
  MailSmsCommunicationService,
  WhatsappSmsCommunicationService,
  Kit19SmsCommunicationService,
  RedisCacheService,
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
