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
      if (validatePhone(phone)) {
        let kit19Url = url;
        // set username, password,sender
        kit19Url += `&username=${username}`;
        kit19Url += `&password=${password}`;
        kit19Url += `&sender=${sender}`;
        // set dlt template id
        kit19Url += `&dlttemplateid=${dlttemplateid}`;
        // set phone, message
        kit19Url += `&phone=${phone}`;
        kit19Url += `&message=${message}`;
        
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
        console.error(`Invalid phone number (${phone}) for sending SMS.`);
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
