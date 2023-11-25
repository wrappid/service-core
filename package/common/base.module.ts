import { Module } from "@nestjs/common";
import { BaseService } from "./base.service";

@Module({
  imports: [],
  controllers: [],
  providers: [BaseService],
  exports: [],
})
export class BaseModule {}
