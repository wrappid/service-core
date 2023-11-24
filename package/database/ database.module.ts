import { Module, Global } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
// import { ConfigService } from "../config/config.service";
// import { Users } from "../../modules/users/models/user.model";
import { DatabaseService } from "./database.service";
// import { ConfigConstant } from "../constants/config.constant";
// import { CronSchemas } from "../scheduler/model/CronSchemas.model";
import { DatabaseActions } from "./action.database.service";
import { ModelRegistry } from "../registry/ModelRegistry";
// import { ApiLogs } from "../middleware/models/ApiLogs.model";

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: "postgres",
          // ConfigService.getCustomConfig()["database"][
          //   ConfigConstant.database.DB_DIALECT
          // ],
        host: "localhost",
        // ConfigService.getCustomConfig()["database"][
        //   ConfigConstant.database.DB_HOST
        // ],
        port: 5432,
        // ConfigService.getCustomConfig()["database"][
        //   ConfigConstant.database.DB_PORT
        // ],
        username: "postgres",
          // ConfigService.getCustomConfig()["database"][
          //   ConfigConstant.database.DB_USERNAME
          // ],
        password:"admin",
          // ConfigService.getCustomConfig()["database"][
          //   ConfigConstant.database.DB_PASSWORD
          // ],
        database: "nestTest",
          // ConfigService.getCustomConfig()["database"][
          //   ConfigConstant.database.DB_DATABASE
          // ],
        // models: [Users, CronSchemas],
        models: [],
        // <string[]>(<unknown>ModelRegistry.getClasses()),
        synchronize: true,
      }),
    }),
  ],
  providers: [DatabaseService, DatabaseActions],
  exports: [DatabaseService], // Export AppModule to make it available for other modules

})
export class DatabaseModule {}
