import { Module, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseService } from './database.service';
import { ConfigService } from '../config/config.service';
import { ConfigConstant } from '../constant/config.constant';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: Sequelize,
      useFactory: async () => {
        const sequelize = new Sequelize({
          dialect: ConfigService.getCustomConfig()["database"][ConfigConstant.database.DB_DIALECT],
          host: ConfigService.getCustomConfig()["database"][ConfigConstant.database.DB_HOST],
          port: ConfigService.getCustomConfig()["database"][ConfigConstant.database.DB_PORT],
          username: ConfigService.getCustomConfig()["database"][ConfigConstant.database.DB_USERNAME],
          password: ConfigService.getCustomConfig()["database"][ConfigConstant.database.DB_PASSWORD],
          database: ConfigService.getCustomConfig()["database"][ConfigConstant.database.DB_DATABASE]
        });
        sequelize.addModels([]);
        await sequelize.sync();
        return sequelize;
      },
    },
    DatabaseService
  ],
  exports: [DatabaseService],
})
export class DatabaseModule implements OnModuleInit{
  constructor(
    private readonly databaseService:DatabaseService,
    ){}
  async onModuleInit() {
    console.log(`::===DatabaseModule has been Initialization===::`);
    await this.databaseService.checkConnection();
  }
}
