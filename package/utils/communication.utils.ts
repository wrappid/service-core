import { EmailProvider, SmsProvider, WhatsappProvider } from "../config/types.config";
import { constant } from "../constants/server.constant";
import { ApplicationContext } from "../context/application.context";
import { WrappidLogger } from "../logging/wrappid.logger";
import { GenericObject } from "../types/generic.types";
import { validateEmail } from "../validation/default.validation";

/**
 * This function helps us to get the default communication configuration
 * 
 * @param commType ("email" | "sms" | "whatsapp")
 * @returns Defafault Communication Config
 */
export async function getDefaultCommunicationConfig(commType: "email" | "sms" | "whatsapp"): Promise<EmailProvider | SmsProvider | WhatsappProvider> {
  try {
    WrappidLogger.logFunctionStart();
    const { communication } = ApplicationContext.getContext(constant.CONFIG_KEY);

    const multipleDefaults = communication[commType]?.providers?.filter((provider: GenericObject) => provider.default === true);
    if (multipleDefaults.length > 1) {
      throw new Error(commType + " providers cannot have multiple 'default': true");
    }
    if (multipleDefaults.length == 0) {
      throw new Error(commType + " providers cannot have any 'default': true");
    }
    return multipleDefaults[0];
  } catch (error:any) {
    WrappidLogger.error(error);
    throw error;
  } finally {
    WrappidLogger.logFunctionEnd();
  }
}

/**
 * This functions helps us to identify 
 * if the communication is enabled or not 
 * for a particular communication type
 * 
 * @param commType ("email" | "sms" | "whatsapp")
 * @returns communication enabled : boolean
 */
export async function checkIfCommunicationEnabled(commType: "email" | "sms" | "whatsapp" ): Promise<boolean>{
  try {
    const { communication } = ApplicationContext.getContext(constant.CONFIG_KEY);
    
    //check communciation enabled or not
    if(!communication.enabled === true){
      throw new Error("Communication Disabled!!");
    }
    if(!communication[commType].enabled === true){
      throw new Error(commType+ " Communciaation Disabled!!");
    }
    return true;
  } catch (error:any) {
    console.log(error);
    throw error;
  }
}

/**
 * This function helps us to validate email
 * 
 * @param {*} mailRecipients { to = [], cc = [], bcc = [] }
 * @param mailRecipients.to email to recipients
 * @param mailRecipients.cc email cc recipients
 * @param mailRecipients.bcc email bcc recipients
 * @returns valid [if all the emails are valid]
 */
export function validateEmails(mailRecipients: { to: string[], cc: string[], bcc: string[] }) {
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
 * This function help us to prepare message object with template and data
 * 
 * @param commOptions { communicationTemplate: object, commData: object }
 * @param commOptions.communicationTemplate a message template
 * @param commOptions.commData a placeholder dataset
 * @returns messageObject
 */
export function getMessageObject(
  commOptions: {
    communicationTemplate: object,
    commData: object,
  } = {
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
