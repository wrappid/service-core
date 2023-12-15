import { Controller, Get } from "@nestjs/common";
import BaseController from "../common/base.controller";
import { WhatsAppService } from "./whatsapp.service";

@Controller("whatsapp")
export class WhatsappController extends BaseController {
  constructor(private readonly whatsAppService: WhatsAppService) {
    super();
  }
  @Get("sentsms")
  getHello(): Promise<void> {
    return this.whatsAppService.send_message();
  }
}
