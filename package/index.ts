import { Module, OnModuleInit } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { BaseModule } from './common/base.module';
import { ConfigModule } from './config/config.module';
import { UsersModule } from './modules/users/users.module';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { YupValidationPipe } from './middleware/validation.pipes';
import { TasksModule } from './scheduler/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [ScheduleModule.forRoot(), AppModule, BaseModule, ConfigModule, UsersModule, TasksModule],
  controllers: [],
  providers: [],
  exports: [AppModule ], // Export AppModule to make it available for other modules
}) 
class RootModule implements OnModuleInit {
  onModuleInit() {
    console.log(`::===RootModule has been Initialization===::`);    
  }
}
export  {RootModule, LoggingMiddleware, YupValidationPipe } 