import { Module, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { ModelRegistry } from "../registry/ModelRegistry";

@Module({
  imports: [ ],
  controllers: [AppController],
  providers: [ AppService],
  exports: [],
})
export class AppModule  implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    console.log(`This Module has been Initialization`);
    // ModelRegistry.initialize();
  }

  onModuleDestroy() {
    console.log(`This Module has been destroyed`);
  }
  //, beforeApplicationShutdown()  onApplicationShutdown()
}
