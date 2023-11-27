import { Module, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { ConfigService } from "@nestjs/config";
import { DatabaseService } from "../database/database.service";
import { DatabaseModule } from "../database/ database.module";
import { BaseModule } from "../common/base.module";
import { UsersModule } from "../modules/users/users.module";

@Module({
  imports: [DatabaseModule ],
  controllers: [AppController],
  providers: [ AppService ],
  exports: [],
})
export class AppModule extends BaseModule {

  // onModuleDestroy() {
  //   console.log(`This Module has been destroyed`);
  // }
  //, beforeApplicationShutdown()  onApplicationShutdown()
}
