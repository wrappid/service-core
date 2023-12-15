import { ConfigService } from "../../config/config.service";
import { CommunicationService } from "../communication.service";
import { Injectable } from "@nestjs/common";

export interface whatsappOptions {}

@Injectable()
export class WhatsappSmsCommunicationService extends CommunicationService {
  validateRecipents(): void {}
  prepareMessage(): void {}
  async communication(): Promise<any> {
    let { api_url, id, token } =
      ConfigService.getCustomConfig()["whatsappProvider"];
    api_url = api_url.replace(":id", id);
    const whatsapp_accessToken = token;

    let phone = "8777083276";
    let data = '{"name":"John", "age":30, "city":"New York"}';
    let res: any = {};
    try {
      let body = {
        messaging_product: "whatsapp",
        to: phone,
        type: "template",
        template: JSON.parse(data),
      };
      console.log(api_url);
      res = await fetch(api_url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + whatsapp_accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            console.error("whatsapp cloud api returned error", data.error);
            return {
              status: 500,
              success: false,
              error: data.error,
            };
          } else
            return {
              status: 200,
              success: true,
              error: null,
              data: data,
            };
        })
        .catch((err) => {
          console.log("Error to send whatsapp");
          return {
            status: 500,
            success: false,
            error: err,
          };
        });
    } catch (err) {
      console.log(err);
      throw err;
    }
    return res;
  }
}
