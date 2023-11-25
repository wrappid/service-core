import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { ModelDecorator } from './decorators/ModelDecorator';
import { DatabaseModule } from './database/ database.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [AppModule, ],
  controllers: [],
  providers: [],
  exports: [AppModule], // Export AppModule to make it available for other modules
}) 
class RootModule {
 
}
export  {RootModule, } 