import { ConfigConstant } from "constant/config.constant";
import { validateEmail } from "./validation.schema";

interface MailRecipients {
  to: string[];
  cc: string[];
  bcc: string[];
}

interface CommunicationOptions {
  communicationTemplate: CommunicationTemplate;
  commData: Record<string, string>;
}

interface CommunicationTemplate {
  type: string;
  contentType?: string;
  subject: string;
  message: string;
  config?: Record<string, string>;
}

interface MessageObject {
  subject?: string;
  html?: string;
  text?: string;
  message?: string;
}

export class CommunicationUtils {
  static validateEmails(mailRecipients: MailRecipients): boolean {
    let valid = true;
    let { to = [], cc = [], bcc = [] } = mailRecipients;

    [...to, ...cc, ...bcc].forEach((eachRecipient: string) => {
      if (!validateEmail.validate(eachRecipient)) {
        valid = false;
      }
    });
    return valid;
  }

  static getMessageObject(commOptions: any) {
    try {
      let { communicationTemplate, commData } = commOptions;
      let messageObj: MessageObject = {};

      switch (communicationTemplate.type) {
        case ConfigConstant.commType.EMAIL:
          messageObj = {
            subject: communicationTemplate.subject,
          };
          if (
            communicationTemplate.contentType &&
            communicationTemplate.contentType.includes("html")
          ) {
            messageObj.html = communicationTemplate.message;
          } else {
            messageObj.text = communicationTemplate.message;
          }
          break;
        case ConfigConstant.commType.SMS:
          messageObj = {
            message: communicationTemplate.message,
          };
          break;
        case ConfigConstant.commType.WHATSAPP:
          messageObj = {
            message: JSON.stringify(communicationTemplate.config),
          };
          break;
        default:
          break;
      }

      Object.keys(commData).forEach((commDataKey: string) => {
        let regExpr = new RegExp("#" + commDataKey, "g");
        switch (communicationTemplate.type) {
          case ConfigConstant.commType.EMAIL:
            messageObj.subject = messageObj.subject.replace(
              regExpr,
              commData[commDataKey]
            );
            if (
              communicationTemplate.contentType &&
              communicationTemplate.contentType.includes("html")
            ) {
              messageObj.html = messageObj.html.replace(
                regExpr,
                commData[commDataKey]
              );
            } else {
              messageObj.text = messageObj.text.replace(
                regExpr,
                commData[commDataKey]
              );
            }
            break;
          case ConfigConstant.commType.SMS:
            messageObj.message = messageObj.message.replace(
              regExpr,
              commData[commDataKey]
            );
            break;
          default:
            break;
        }
      });

      return messageObj;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
