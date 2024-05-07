import { constant } from "../constants/server.constant";
import { databaseActions } from "../database/actions.database";
import { WrappidLogger } from "../logging/wrappid.logger";
import * as communicationUtils from "../utils/communication.utils";
import { checkIfCommunicationEnabled } from "../utils/communication.utils";
import communicateEmail from "./email/email.communication";
import communicateSMS from "./sms/sms.communication";
import communicateWhatsApp from "./whatsapp/whatsapp.communication";

/**
 * This function help us to initiate communication
 *
 * @param communicationObject : Communication Object
 * @param communicationObject.commType : commType value
 * @param communicationObject.commRecipients : commRecipients value
 * @param communicationObject.commData : commData value
 * @param communicationObject.commTemplateID : commTemplateID value
 * @param communicationObject.directFlag : directFlag value
 * @param communicationObject.errorFlag : errorFlag value
 * @returns
 */
export const communicate = async ({
  commType,
  commRecipients,
  commData,
  commTemplateID,
  directFlag,
  errorFlag,
}: any) => {
  WrappidLogger.logFunctionStart();
  try {
    //check communication type enabled or not
    if(await checkIfCommunicationEnabled(commType)){
      // get template
      const communicationTemplate = await databaseActions.findOne(
        "application",
        "CommunicationTemplates",
        {
          where: {
            name: commTemplateID,
            _status: constant.entityStatus.APPROVED,
          },
        }
      );
      if (!communicationTemplate) {
        throw new Error(`Template not found: ${commTemplateID}`);
      }

      const messageObject = communicationUtils.getMessageObject({
        communicationTemplate,
        commData,
      });
      //create
      //  FunctionsRegistry.createCommunicationHistory();
      if (directFlag) {
        switch (commType) {
          case constant.commType.EMAIL:
            return communicateEmail({ ...commRecipients, ...messageObject });
          case constant.commType.SMS:
            return communicateSMS({
              phone: commRecipients.to[0],
              ...messageObject,
              dlttemplateid: communicationTemplate.externalTemplateId,
            });
          case constant.commType.WHATSAPP:
            return communicateWhatsApp({
              phone: commRecipients.to[0],
              messageObject,
            });
          default:
            throw new Error("Communication type is invalid.");
        }
      //check communcation status
      ///update
      } else {
      // db entry
      }
    }else{
      throw new Error("Communcation Disabled!!");
    }
  } catch (error:any) {
    console.error(error);
    WrappidLogger.error(error);
    if (errorFlag) {
      throw error;
    }
  }
  WrappidLogger.logFunctionEnd();
};
