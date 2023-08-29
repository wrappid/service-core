const fetch = require("node-fetch");
const configProvider = require("../../config/provider.config");
const { constant } = require("../../constants/server.constant");
const { validatePhone } = require("../../validation/default.validation");

const { service, url, username, password, sender } = configProvider.smsProvider;

const communicate = async (smsOptions) => {
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
        var smsRes = await fetch(kit19Url, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.status !== 200) {
            throw new Error(`SMS sent failed. Status Code: ${smsRes.status}`);
          }
          return res.text();
        }).then((data) => {
          console.log(data);
          if (data.includes("Sent.c")) {
            return true;
          } else {
            throw new Error({
              message: "SMS sent failed",
              stacktrace: data
            })
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

module.exports = communicate;
