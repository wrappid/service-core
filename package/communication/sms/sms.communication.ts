import moment from "moment";
import fetch from "node-fetch-commonjs";

import { configProvider } from "../../config/provider.config";
import { constant } from "../../constants/server.constant";
import { databaseActions } from "../../database/actions.database";
import { validatePhone } from "../../validation/default.validation";

const { service, url, username, password, sender } =
  configProvider().smsProvider;

const communicate = async (smsOptions: any) => {
  const { phone, message, dlttemplateid } = smsOptions;
  console.log("====================================");
  console.log(phone);
  console.log(message);
  console.log(dlttemplateid);
  console.log("====================================");
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
        console.log("====================================");
        console.log("sender::",sender);
        console.log("phone::",phone);
        console.log("message::",message);
        console.log("dlttemplateid::",dlttemplateid);
        console.log("====================================");
        console.log(kit19Url);
        const smsRes: any = await fetch(kit19Url, {
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(async (res: any) => {
            if (res.status !== 200) {
              await databaseActions.create("application", "CommunicationHistories", {
                type: constant.commType.SMS,
                from: sender,
                to: phone,
                retryCount: null,
                status: "faild",
                attachemnts: null,
                variable: null,
                extraInfo: null,
                isActive: null,
                _status: constant.entityStatus.SENT_FAILED,
                createdAt:  moment().format("YYYY-MM-DD HH:mm:ss"),
                updatedAt:  moment().format("YYYY-MM-DD HH:mm:ss"),
                deletedAt: null,
                updatedBy: null,
                mailCommId: null,
                userId: null,
                deletedBy: null,
                templateId: null,
              });
              throw new Error(`SMS sent failed. Status Code: ${smsRes.status}`);
            }
            await databaseActions.create("application", "CommunicationHistories", {
              type: constant.commType.SMS,
              from: sender,
              to: phone,
              retryCount: null,
              status: "success",
              attachemnts: null,
              variable: null,
              extraInfo: null,
              isActive: null,
              _status: constant.entityStatus.SENT,
              createdAt:  moment().format("YYYY-MM-DD HH:mm:ss"),
              updatedAt:  moment().format("YYYY-MM-DD HH:mm:ss"),
              deletedAt: null,
              updatedBy: null,
              mailCommId: null,
              userId: null,
              deletedBy: null,
              templateId: null,
            });
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
