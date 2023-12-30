import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import BaseModule from "../../common/base.module";

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
  async onCoreModuleInit(): Promise<void> {
    console.log(`::=== DatabaseModule::onModuleInit START ===::`);
    let connectionRes = await this.databaseService.checkConnection();
    // if (connectionRes) {
    //   console.log(
    //     `All database connection has been established successfully...`
    //   );
    // } else {
    //   console.log(
    //     `No database connection has been established successfully...`
    //   );
    // }
    console.log(`::=== DatabaseModule::onModuleInit END ===::`);
  }
  onCoreModuleDestroy(): void {}
  onCoreApplicationBootstrap(): void {}
  constructor(private readonly databaseService: DatabaseService) {
    super();
  }
}