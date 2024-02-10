import nodemailer from "nodemailer";
import { configProvider } from "../../config/provider.config";
import { validateEmails } from "../../utils/communication.utils";

const { fromName, fromEmail, replyTo, service, email, password } =
  configProvider.emailProvider;

const transporter = nodemailer.createTransport({
  service: service,

  auth: {
    user: email,
    pass: password,
  },
});

const communicate = async (mailOptions: any) => {
  mailOptions = {
    ...mailOptions,
    from: `${fromName} <${fromEmail}>`,
    replyTo: replyTo,
  };
  try {
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
  } catch (error: any) {
    throw new error();
  }
};

export default communicate;
