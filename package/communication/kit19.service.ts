import { ConfigConstant } from "constant/config.constant";
import { SmsCommunicationService } from "./smsCommunication.service";
import { ConfigService } from "../config/config.service";
import { validatePhone } from "./validation.schema";

export class Kit19Service extends SmsCommunicationService {
  async communicateSMS(smsOptions: any) {
    let { phone, message, dlttemplateid } = smsOptions;
    const { service, url, username, password, sender } =
      ConfigService.getCustomConfig()["smsProvider"];

    try {
      if (service === ConfigConstant.smsService.KIT_19) {
        /**
         * Kit19
         */
        if (validatePhone.validate(phone)) {
          let kit19Url = url;
          // set username, password,sender
          kit19Url += `&username=${username}`;
          kit19Url += `&password=${password}`;
          kit19Url += `&sender=${sender}`;
          // set phone, message
          kit19Url += `&to=${phone}`;
          kit19Url += `&message=${message}`;
          // set dlt template id
          kit19Url += `&dlttemplateid=${dlttemplateid}`;

          console.log(kit19Url);
          var smsRes = await fetch(kit19Url, {
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (res.status !== 200) {
                throw new Error(
                  `SMS sent failed. Status Code: ${smsRes}`
                  //   `SMS sent failed. Status Code: ${smsRes.status}`
                );
              }
              return res.text();
            })
            .then((data) => {
              console.log(data);
              if (data.includes("Sent.c")) {
                return true;
              } else {
                throw new Error();
                // throw new Error({
                //   message: "SMS sent failed",
                //   stacktrace: data,
                // });
              }
            });
        } else {
          throw new Error(`Invalid phone number (${phone}) for sending SMS.`);
        }
      } else {
        throw new Error("SMS Service not accepted.");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
