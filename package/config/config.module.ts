import { Module, Global } from "@nestjs/common";
import { ConfigModule as NestJSConfigModule } from "@nestjs/config";
import { ConfigService } from "./config.service";
import BaseModule from "../common/base.module";

@Global()
@Module({
  imports: [
    NestJSConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule extends BaseModule {}
