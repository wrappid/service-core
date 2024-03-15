import { configProvider } from "../config/provider.config";
import { EmailProvider, SmsProvider, WhatsappProvider } from "../config/types.config";
import { constant } from "../constants/server.constant";
import { validateEmail } from "../validation/default.validation";

export async function getDefaultCommunicationConfig(commType: "email" | "sms" | "whatsapp"): Promise<EmailProvider | SmsProvider | WhatsappProvider> {
  try {
    const multipleDefaults = configProvider().communication[commType].providers.filter(provider => provider.default === true);
    if (multipleDefaults.length > 1) {
      throw new Error(commType + " providers cannot have multiple 'default': true");
    }
    if (multipleDefaults.length == 0) {
      throw new Error(commType + " providers cannot have any 'default': true");
    }
    return multipleDefaults[0];
  } catch (error:any) {
    console.log(error);
    throw error;
  }
}

export async function checkIfCommunicationEnabled(commType: "email" | "sms" | "whatsapp" ): Promise<boolean>{
  try {
    //check communciation enabled or not
    if(!configProvider().communication.enabled === true){
      throw new Error("Communication Disabled!!");
    }
    if(!configProvider().communication[commType].enabled === true){
      throw new Error(commType+ " Communciaation Disabled!!");
    }
    return true;
  } catch (error:any) {
    console.log(error);
    throw error;
  }
}
/**
 *
 * @param {*} mailRecipients
 * @returns
 */
export function validateEmails(mailRecipients: any) {
  try {
    let valid = true;
    const { to = [], cc = [], bcc = [] } = mailRecipients;

    [...to, ...cc, ...bcc].forEach((eachRecipient) => {
      if (!validateEmail.validate(eachRecipient)) {
        valid = false;
      }
    });
    return valid;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 *
 * @param {*} commOptions
 */
export function getMessageObject(
  commOptions = {
    communicationTemplate: {},
    commData: {},
  }
) {
  try {
    const { communicationTemplate, commData }: any = commOptions;
    let messageObj: any = {};

    switch (communicationTemplate.type) {
      case constant.commType.EMAIL:
        messageObj = {
          // contentType: communicationTemplate.contentType || "text/plain",
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
      case constant.commType.SMS:
        messageObj = {
          message: communicationTemplate.message,
        };
        break;
      case constant.commType.WHATSAPP:
        messageObj = {
          message: JSON.stringify(communicationTemplate.config),
        };
        break;
      default:
        break;
    }

    Object.keys(commData).forEach((commDataKey) => {
      const regExpr = new RegExp("#" + commDataKey, "g");
      switch (communicationTemplate.type) {
        case constant.commType.EMAIL:
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
        case constant.commType.SMS:
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
