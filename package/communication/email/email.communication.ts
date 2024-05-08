import nodemailer from "nodemailer";
import { WrappidLogger } from "../../logging/wrappid.logger";
import { getDefaultCommunicationConfig, validateEmails } from "../../utils/communication.utils";


const communicate = async (mailOptions: any) => {
  try { 
    WrappidLogger.logFunctionStart("email.communicate");
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
        // console.log("mailOptions", mailOptions);
        WrappidLogger.info(`mailOptions:: ${mailOptions}`);
        return new Promise(function (resolve, reject) {
          transporter.sendMail(mailOptions, (err: any, info: any) => {
            if (err) {
              // console.log("error: ", err);
              WrappidLogger.error(err);
              reject(err);
            } else {
              console.log("Mail sent successfully!");
              WrappidLogger.info("Mail sent successfully!");
              resolve(info);
            }
          });
        })
          .then((res) => {
            // console.log("Email sent.................");
            WrappidLogger.info("Email sent.................");
            WrappidLogger.info(<string>res);
            // console.log(res);
            return true;
          })
          .catch((error) => {
            WrappidLogger.info("Email sent failed.................");
            // console.log("Email sent failed.................");
            WrappidLogger.error(error);
            console.error(error);
            throw error;
          });
      } else {
        throw new Error("Invalid email recipients.");
      }
    } else {
      WrappidLogger.error("No Email provider with 'default': true found.");
      // console.log("No Email provider with 'default': true found.");
      throw new Error("No Email provider with 'default': true found.");
    }
  } catch (error: any) {
    WrappidLogger.error(error);
    throw new error();
  } finally {
    WrappidLogger.logFunctionEnd("email.communicate");
  }
};

export default communicate;
