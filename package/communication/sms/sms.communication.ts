import fetch from "node-fetch-commonjs";
import { constant } from "../../constants/server.constant";
import { WrappidLogger } from "../../logging/wrappid.logger";
import { getDefaultCommunicationConfig } from "../../utils/communication.utils";
import { validatePhone } from "../../validation/default.validation";


const communicate = async (smsOptions: any) => {
  try {
    WrappidLogger.logFunctionStart("sms.communicate");
    const defaultProvider = await getDefaultCommunicationConfig("sms");
    if (defaultProvider) {
      const { service, url, username, password, sender }: any = defaultProvider;
      const { phone, message, dlttemplateid } = smsOptions;
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

          // console.log(kit19Url);
          WrappidLogger.info(kit19Url);
          const smsRes: any = await fetch(kit19Url, {
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res: any) => {
              if (res.status !== 200) {
                WrappidLogger.error(`SMS sent failed. Status Code: ${smsRes.status}`);
                throw new Error(`SMS sent failed. Status Code: ${smsRes.status}`);
              }
              return res.text();
            })
            .then((data: any) => {
              console.log(data);
              if (data.includes("Sent.c")) {
                return true;
              } else {
                WrappidLogger.error("SMS sent failed");
                throw new Error("SMS sent failed");
              }
            });

          return smsRes;
        } else {
          WrappidLogger.error(`Invalid phone number (${phone}) for sending SMS.`);
          throw new Error(`Invalid phone number (${phone}) for sending SMS.`);
        }
      } else {
        WrappidLogger.error("SMS Service not accepted.");
        throw new Error("SMS Service not accepted.");
      }
    }else{
      // console.log("No SMS provider with 'default': true found.");
      WrappidLogger.error("No SMS provider with 'default': true found.");
      throw new Error("No SMS provider with 'default': true found.");
    }
  } catch (error:any) {
    WrappidLogger.error(error);
    // console.error(error);
    throw error;
  } finally {
    WrappidLogger.logFunctionEnd("sms.communicate");
  }
};

export default communicate;
