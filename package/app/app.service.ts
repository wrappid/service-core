import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ModelRegistry } from "../registry/ModelRegistry";
import BaseService from "../common/base.service";
// import { DatabaseService } from "../database/database.service";

@Injectable()
export class AppService
  extends BaseService
  implements OnModuleInit, OnModuleDestroy
{
  // constructor(private readonly databaseService: DatabaseService) {}

  async onModuleInit() {
    console.log(`::===AppModule has been Initialization===::`);

    // const isConnected = await this.databaseService.checkConnection();
    // console.log(
    //   isConnected
    //     ? "Database connection successful"
    //     : "Unable to connect to the database"
    // );
    // ModelRegistry.initialize();
  }
  getModels(): any {
    const models: any = ModelRegistry.getClasses();
    console.log(models);
    return JSON.stringify(models);
  }

  onModuleDestroy() {
    console.log(`This Module has been destroyed`);
  }
}
