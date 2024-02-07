import fetch from "node-fetch";
import { configProvider } from "../../config/provider.config";
import { constant } from "../../constants/server.constant";
import { validatePhone } from "../../validation/default.validation";

const { service, url, username, password, sender } = configProvider.smsProvider;

const communicate = async (smsOptions: any) => {
  let { phone, message, dlttemplateid } = smsOptions;

  try {
    if (service === constant.smsService.KIT_19) {
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
        let smsRes: any = await fetch(kit19Url, {
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res: any) => {
            if (res.status !== 200) {
              throw new Error(`SMS sent failed. Status Code: ${smsRes.status}`);
            }
            return res.text();
          })
          .then((data: any) => {
            console.log(data);
            if (data.includes("Sent.c")) {
              return true;
            } else {
              throw new Error("SMS sent failed");
            }
          });

        return smsRes;
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
};

export default communicate;
