import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    console.log(`This Module has been Initialization`);
  }

  onModuleDestroy() {
    console.log(`This Module has been destroyed`);
  }
  //, beforeApplicationShutdown()  onApplicationShutdown()
}
