const fetch = require("node-fetch");
const configProvider = require("../../config/provider.config");
let { api_url, id, token } = configProvider.whatsappProvider;
api_url = api_url.replace(":id", id);
const whatsapp_accessToken = token;

async function communicate(whatsappOptions) {
  let { phone, data } = whatsappOptions;
  let res = {};
  try {
    let body = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: JSON.parse(data),
    };
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
        // console.log("Send status : ", response.status);
        // console.log("Error Msg", response.message);
        // if (!response.ok) {
        //   // create error object and reject if not a 2xx response code
        //   let err = new Error("HTTP status code: " + response.status);
        //   err.response = response;
        //   err.status = response.status;
        //   throw err;
        // }
        // if (response.status == 200) {
        //   console.log("Prescription sent successfully to : ", phone);
        //   return {
        //     success: true,
        //     error: null,
        //   };
        // } else {
        //   return {
        //     success: false,
        //     error: "Error to send prescription",
        //   };
        // }
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

module.exports = communicate;
