import { Module, OnModuleInit } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { DatabaseService } from "./database.service";
import { ConfigService } from "../config/config.service";
import { ConfigConstant } from "../constant/config.constant";

@Module({
  imports: [],
  controllers: [],
  providers: [...DatabaseService.getAllDatabaseProviders(), DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}
  async onModuleInit() {
    console.log(`::===DatabaseModule has been Initialization===::`);
    await this.databaseService.checkConnection();
  }
}
