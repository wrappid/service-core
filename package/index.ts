import { Module, OnModuleInit } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { BaseModule } from './common/base.module';
import { ConfigModule } from './config/config.module';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { ValidationPipe } from './middleware/validation.pipes';
import { TasksModule } from './scheduler/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { ApiLogs } from './models/ApiLogs.model';

@Module({
    imports: [ AppModule, BaseModule, ConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
  exports: [AppModule ], // Export AppModule to make it available for other modules
}) 
class RootModule implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}
  onModuleInit() {
    console.log(`::===RootModule has been Initialization===::`); 
    this.databaseService.addModels([ApiLogs],'wrappid-database1'); 
      
  }
}
export  {RootModule, DatabaseService, DatabaseModule,  LoggingMiddleware, ValidationPipe } 