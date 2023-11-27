import { Module, OnModuleInit } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { DatabaseService } from "./database.service";
import { ConfigService } from "../config/config.service";
import { ConfigConstant } from "../constant/config.constant";

@Module({
  imports: [],
  controllers: [],
  providers: [DatabaseService, ...DatabaseService.getAllDatabaseProviders()],
  exports: [DatabaseService],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}
  async onModuleInit() {
    console.log(`::===DatabaseModule has been Initialization===::`);
    /**
     * @todo
     * Use forEach for all connection check
     */
    const sequelize1 = this.databaseService.getConnection("wrappid-database1");
    if(this.databaseService.checkConnection(sequelize1)){
      console.log(`Database connection has been established successfully:: wrappid-database1`);
    }
    const sequelize2 = this.databaseService.getConnection("wrappid-database1");
    if(this.databaseService.checkConnection(sequelize2)){
      console.log(`Database connection has been established successfully:: wrappid-database2`);
    }
      


  }
}
