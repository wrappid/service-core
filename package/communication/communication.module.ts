import { Module } from "@nestjs/common";
import BaseModule from "common/base.module";
import { Kit19SmsCommunicationService } from "./sms/kit19.sms.communication.service";

@Module({
  imports: [],
  controllers: [],
  providers: [Kit19SmsCommunicationService],
  exports: [],
})
export class CommunicationModule extends BaseModule {
  onCoreModuleInit(): void {}
  onCoreModuleDestroy(): void {}
  onCoreApplicationBootstrap(): void {}
}
