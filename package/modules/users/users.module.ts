import { Module, OnModuleInit } from "@nestjs/common";
import { Users } from "./models/user.model";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { DatabaseService } from "../../database/database.service";
import { DatabaseModule } from "../../database/ database.module";
import { Students } from "./models/students.model";

@Module({
    imports:[DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements OnModuleInit {
  constructor(private readonly databaseService:DatabaseService){}
  onModuleInit() {
  console.log(`::===UsersModule has been Initialization===::`);
  //get sequelize connection instance
  const sequelize1 = DatabaseService.getConnection("wrappid-database1");
  //Add Model for module and database specific
  sequelize1.addModels([Users]);
  //get sequelize connection instance
  const sequelize2 = DatabaseService.getConnection("wrappid-database2");
  //Add Model for module and database specific
  sequelize2.addModels([Students]);

  }
  
}
