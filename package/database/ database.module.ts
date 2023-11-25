import { Module, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseService } from './database.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'SEQUELIZE',
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
    }
    
  ],
  exports: [],
})
export class DatabaseModule implements OnModuleInit{
  constructor(
    // private readonly databaseService:DatabaseService,
    // private readonly sequelize:Sequelize,
    ){}
  async onModuleInit() {
    console.log(`::===DatabaseModule has been Initialization===::`);
    // await this.sequelize.authenticate();
    // const isConnected = this.databaseService.checkConnection();
  }
}
