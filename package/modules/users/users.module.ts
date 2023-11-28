import { MiddlewareConsumer, Module, OnModuleInit } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { DatabaseService } from "../../database/database.service";
import { DatabaseModule } from "../../database/ database.module";
import { Users } from "./models/user.model";
import { Students } from "./models/students.model";
import { InjectModel } from "@nestjs/sequelize";
import { LoggingMiddleware } from "../../middleware/logging.middleware";
import { YupValidationPipe } from "../../middleware/validation.pipes";

@Module({
  imports:[DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements OnModuleInit {
  constructor(
    private readonly databaseService:DatabaseService,
    ){}
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggingMiddleware).forRoutes("users");
    }
  async onModuleInit() {
  console.log(`::===UsersModule has been Initialization===::`);
  await this.databaseService.addModels([],'wrappid-database1');
  }
  
}
