import { ConfigConstant } from "../../constant/config.constant";
import { SmsCommunicationService } from "./sms.communication.service";
import { ConfigService } from "../../config/config.service";
import { validatePhone } from "../validation.schema";
import { CommunicationService } from "../communication.service";
import { Injectable } from "@nestjs/common";

export interface SmsOptions {
  phone: string;
  message: string;
  dlttemplateid: string;
}

@Injectable()
export class Kit19SmsCommunicationService extends SmsCommunicationService {
  validateRecipents(): void {}
  prepareMessage(): void {}
  async communication() {
    const { url } = ConfigService.getCustomConfig()["smsProvider"];
    let phone = "8777083276";
    let message =
      "976938 is your OTP for mobile no. verification in Rxefy. Do not share it with anyone.";
    try {
      /**
       * Kit19
       */
      if (validatePhone.validate(phone)) {
        //   let kit19Url = url;
        //   // set username, password,sender
        //   kit19Url += `&username=${username}`;
        //   kit19Url += `&password=${password}`;
        //   kit19Url += `&sender=${sender}`;
        //   // set phone, message
        //   kit19Url += `&to=${phone}`;
        //   kit19Url += `&message=${message}`;
        //   // set dlt template id
        //   kit19Url += `&dlttemplateid=${dlttemplateid}`;
        //   console.log(kit19Url);
        //   var smsRes = await fetch(kit19Url, {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   })
        //     .then((res) => {
        //       if (res.status !== 200) {
        //         throw new Error(
        //           `SMS sent failed. Status Code: ${smsRes}`
        //           //   `SMS sent failed. Status Code: ${smsRes.status}`
        //         );
        //       }
        //       return res.text();
        //     })
        //     .then((data) => {
        //       console.log(data);
        //       if (data.includes("Sent.c")) {
        //         return true;
        //       } else {
        //         throw new Error();
        //         // throw new Error({
        //         //   message: "SMS sent failed",
        //         //   stacktrace: data,
        //         // });
        //       }
        //     });

        /**
         * Textlocal
         */
        // var smsRes = await fetch(smsProvider.url, {
        //   method: "post",
        //   headers: {
        //     "Content-Length": mes_body.length,
        //     "Content-Type": "application/x-www-form-urlencoded",
        //   },
        //   body: mes_body,
        // });
        // d = await smsRes.json();
        /**
         * Textlocal
         */
        // if (d.status == "failure") {
        //   console.error("error: can not send otp", d);
        //   return { status: 500, message: "OTP sent errorvia sms" };
        // } else {
        //   console.log("OTP sent via sms");
        //   return { status: 200, message: "OTP sent via sms" };
        // }

        /**
         * Kit19
         */
        var kit19Url = url;
        var finalUrl = kit19Url.replace("#phone", phone);
        finalUrl = finalUrl.replace("#message", message);
        console.log(finalUrl);
        var smsRes = await fetch(finalUrl, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (smsRes.status === 200) {
          console.log("OTP sent via sms");
          return { status: 200, message: "OTP sent via sms" };
        } else {
          console.error("error: can not send otp", smsRes);
          return { status: 500, message: "OTP sent errorvia sms" };
        }
      } else {
        throw new Error(`Invalid phone number (${phone}) for sending SMS.`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
