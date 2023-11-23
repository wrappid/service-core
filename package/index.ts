import { Module } from '@nestjs/common';
import { AppModule } from './app/app.module';

@Module({
  imports: [AppModule],
  controllers: [],
  providers: [],
  exports: [AppModule], // Export AppModule to make it available for other modules
})
export class RootModule {}