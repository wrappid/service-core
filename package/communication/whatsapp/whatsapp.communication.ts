import fetch from "node-fetch-commonjs";
import { getDefaultCommunicationConfig } from "../../utils/communication.utils";

// eslint-disable-next-line prefer-const
// let { api_url, id, accessToken } = configProvider().whatsappProvider;
// api_url = api_url.replace(":id", id);

async function communicate(whatsappOptions: any) {
  const { phone, messageObject } = whatsappOptions;
  let res = {};
  try {
    const defaultProvider = await getDefaultCommunicationConfig("whatsapp");
    if (defaultProvider) {
      const { api_url,  accessToken }: any = defaultProvider;
      const body = {
        messaging_product: "whatsapp",
        to: "91"+phone,
        type: "template", 
        template: JSON.parse(messageObject.message)
      };
      res = await fetch(api_url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response: any) => {
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
        .then((data: any) => {
          if (data.error) {
            console.error("whatsapp cloud api returned error", data.error);
            throw data.error;
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
        .catch((err: any) => {
          console.log("Error to send whatsapp");
          return {
            status: 500,
            success: false,
            error: err,
          };
        });
    } 
    else{
      console.log("No Whatsapp provider with 'default': true found.");
      throw new Error("No Whatsapp provider with 'default': true found.");
    }
  }catch (err) {
    console.log(err);
    throw err;
  }
  return res;
}

export default communicate;
