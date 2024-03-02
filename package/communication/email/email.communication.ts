import moment from "moment";
import nodemailer from "nodemailer";
import { configProvider } from "../../config/provider.config";
import { constant } from "../../constants/server.constant";
import { databaseActions } from "../../database/actions.database";
import { validateEmails } from "../../utils/communication.utils";

const { fromName, fromEmail, replyTo, service, email, password } =
  configProvider().emailProvider;

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
        transporter.sendMail(mailOptions, async (err: any, info: any) => {
          if (err) {
            await databaseActions.create("application", "CommunicationHistories", {
              type: constant.commType.SMS,
              from: fromEmail,
              to: mailOptions.to[0],
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
            console.log("error: ", err);
            reject(err);
          } else {
            await databaseActions.create("application", "CommunicationHistories", {
              type: constant.commType.SMS,
              from: fromEmail,
              to: mailOptions.to[0],
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
