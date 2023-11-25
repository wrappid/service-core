import { Module, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseService } from './database.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: Sequelize,
      useFactory: async () => {
        const sequelize = new Sequelize({
          dialect: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'admin',
          database: 'nestTest',
        });
        sequelize.addModels([]);
        await sequelize.sync();
        return sequelize;
      },
    },
    DatabaseService
  ],
  exports: [],
})
export class DatabaseModule implements OnModuleInit{
  constructor(
    private readonly databaseService:DatabaseService,
    ){}
  async onModuleInit() {
    console.log(`::===DatabaseModule has been Initialization===::`);
    this.databaseService.checkConnection();
  }
}
