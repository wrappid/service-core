import { Module } from "@nestjs/common";
import { CommunicationService } from "./communication.service";
import BaseModule from "common/base.module";

@Module({
  imports: [],
  controllers: [],
  providers: [CommunicationService],
  exports: [],
})
export class CommunicationModule extends BaseModule {
  onCoreModuleInit(): void {}
  onCoreModuleDestroy(): void {}
  onCoreApplicationBootstrap(): void {}
}
