import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { ModelDecorator } from './decorators/ModelDecorator';
import { DatabaseService } from './database/database.service';
import { BaseModule } from './common/base.module';
import { ConfigModule } from './config/config.module';
import { ConfigConstant } from './constant/config.constant';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AppModule, BaseModule, ConfigModule, UsersModule],
  controllers: [],
  providers: [],
  exports: [AppModule ], // Export AppModule to make it available for other modules
}) 
class RootModule implements OnModuleInit {
  onModuleInit() {
    console.log(`::===RootModule has been Initialization===::`);    
  }
}
export  {RootModule, } 