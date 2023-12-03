import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import BaseModule from "../common/base.module";

/**
 * @todo missing coding documentation
 *
 * @description
 */
@Module({
  imports: [],
  controllers: [],
  providers: [DatabaseService, ...DatabaseService.getAllDatabaseProviders()],
  exports: [DatabaseService],
})
export class DatabaseModule extends BaseModule {
  constructor(private readonly databaseService: DatabaseService) {
    super();
  }

  async onModuleInit() {
    console.log(`::===DatabaseModule has been Initialization===::`);
    let connectionRes = await this.databaseService.checkConnection();
    if (connectionRes) {
      console.log(
        `All database connection has been established successfully...`
      );
    } else {
      console.log(
        `No database connection has been established successfully...`
      );
    }
  }
}
