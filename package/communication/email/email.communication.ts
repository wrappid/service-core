import nodemailer from "nodemailer";
import { getDefaultCommunicationConfig, validateEmails } from "../../utils/communication.utils";


const communicate = async (mailOptions: any) => {
  try {
    const defaultProvider = await getDefaultCommunicationConfig("email");
    if (defaultProvider) {
      const {fromName, fromEmail, replyTo, service, email, password}:any = defaultProvider;

      const transporter = nodemailer.createTransport({
        service: service,
        auth: {
          user: email,
          pass: password,
        },
      });

      mailOptions = {
        ...mailOptions,
        from: `${fromName} <${fromEmail}>`,
        replyTo: replyTo,
      };
      if (validateEmails(mailOptions)) {
        console.log("mailOptions", mailOptions);
        return new Promise(function (resolve, reject) {
          transporter.sendMail(mailOptions, (err: any, info: any) => {
            if (err) {
              console.log("error: ", err);
              reject(err);
            } else {
              console.log("Mail sent successfully!");
              resolve(info);
            }
          });
        })
          .then((res) => {
            console.log("Email sent.................");
            console.log(res);
            return true;
          })
          .catch((error) => {
            console.log("Email sent failed.................");
            console.error(error);
            throw error;
          });
      } else {
        throw new Error("Invalid email recipients.");
      }
    } else {
      console.log("No Email provider with 'default': true found.");
      throw new Error("No Email provider with 'default': true found.");
    }
  } catch (error: any) {
    throw new error();
  }
};

export default communicate;
