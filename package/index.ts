import { Module } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { ModelDecorator } from './decorators/ModelDecorator';

@Module({
  imports: [AppModule],
  controllers: [],
  providers: [],
  exports: [AppModule], // Export AppModule to make it available for other modules
})
class RootModule{}
export  {RootModule,ModelDecorator} 