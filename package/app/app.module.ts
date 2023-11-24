import { Module, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { ConfigService } from "@nestjs/config";
import { DatabaseService } from "../database/database.service";
import { DatabaseModule } from "../database/ database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [ AppService,DatabaseService  ],
  exports: [],
})
export class AppModule  {

  // onModuleDestroy() {
  //   console.log(`This Module has been destroyed`);
  // }
  //, beforeApplicationShutdown()  onApplicationShutdown()
}
