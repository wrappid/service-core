import { Module } from "@nestjs/common";
import BaseModule from "../common/base.module";
import { WhatsappController } from "./whatsapp.controller";
import { WhatsAppService } from "./whatsapp.service";

@Module({
  imports: [],
  controllers: [WhatsappController],
  providers: [WhatsAppService],
  exports: [],
})
export class WhatsappModule extends BaseModule {
  onCoreModuleInit(): void {}
  onCoreModuleDestroy(): void {}
  onCoreApplicationBootstrap(): void {}
}
