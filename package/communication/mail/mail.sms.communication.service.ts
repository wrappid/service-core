import { ConfigConstant } from "../../constant/config.constant";
import { SmsCommunicationService } from "../sms/sms.communication.service";
import { ConfigService } from "../../config/config.service";
import { CommunicationService } from "../communication.service";
import { Injectable } from "@nestjs/common";
import nodemailer from "nodemailer";

export interface MailOptions {
  from: string;
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  text?: string;
  html?: string;
}

@Injectable()
export class MailSmsCommunicationService extends CommunicationService {
  validateRecipents(): void {}
  prepareMessage(): void {}
  async communication() {
    const { fromName, fromEmail, replyTo, service, email, password } =
      ConfigService.getCustomConfig()["emailProvider"];

    const transporter = nodemailer.createTransport({
      service: service,
      auth: {
        user: email,
        pass: password,
      },
    });

    //   const mailOptions = {
    //     from: `${fromName} <${fromEmail}>`,
    //     to: "pritam@rxefy.com",
    //     subject: "Testing" ,
    //     text: ""
    //   };

    var mailOptions = {
      to: "pritam@rxefy.com",
      subject: "Email Communication",
      text: "Email Communication Done !!!",
    };

    try {
      console.log("mailOptions", mailOptions);
      return new Promise<boolean>(function (resolve, reject) {
        transporter.sendMail(mailOptions, (err: Error, info: any) => {
          if (err) {
            console.log("error: ", err);
            reject(err);
          } else {
            console.log(`Mail sent successfully!`);
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
    } catch (error) {
      throw error;
    }
  }
}
