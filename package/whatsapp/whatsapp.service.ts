import { Injectable } from "@nestjs/common";
import BaseService from "../common/base.service";
import WhatsApp from "whatsapp";

@Injectable()
export class WhatsAppService extends BaseService {
  async send_message() {
    try {
      // Your test sender phone number
      const wa = new WhatsApp(7890777700);

      // Enter the recipient phone number
      const recipient_number = 8777083276;

      const sent_text_message = wa.messages.text(
        { body: "Hello world" },
        recipient_number
      );
      await sent_text_message.then((res) => {
        console.log(res.rawResponse());
      });
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  }
}
