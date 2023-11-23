import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";

@Module({
  imports: [ ],
  controllers: [AppController],
  providers: [ AppService],
  exports: [],
})
export class AppModule {}
