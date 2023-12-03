import { Module } from "@nestjs/common";
import BaseModule from "../common/base.module";
import { ValidationPipe } from "./validation.pipes";
import { LoggingMiddleware } from "./logging.middleware";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [ValidationPipe, LoggingMiddleware],
  exports: [ValidationPipe, LoggingMiddleware],
})
export class MiddlewareModule extends BaseModule {}
