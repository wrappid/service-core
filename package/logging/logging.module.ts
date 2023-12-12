import { Module } from "@nestjs/common";
import BaseModule from "../common/base.module";

@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class LoggingModule extends BaseModule {
  onCoreModuleInit(): void {}
  onCoreModuleDestroy(): void {}
  onCoreApplicationBootstrap(): void {}
}
