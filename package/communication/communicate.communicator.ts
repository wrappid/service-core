import { constant } from "../constants/server.constant";
import { databaseActions } from "../database/actions.database";
import * as communicationUtils from "../utils/communication.utils";
import communicateEmail from "./email/email.communication";
import communicateSMS from "./sms/sms.communication";
import communicateWhatsApp from "./whatsapp/whatsapp.communication";

/**
 *
 * @param {*} communicationObject
 */
export const communicate = async ({
  commType,
  commRecipients,
  commData,
  commTemplateID,
  directFlag,
  errorFlag,
}: any) => {
  try {
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
    try {
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
              ...messageObject,
            });
          default:
            throw new Error("Communication type is invalid.");
        }
        //check communcation status
        ///update
      } else {
        // db entry
      }
    } catch (error) {
      //Update communication status fails
    }
  } catch (error) {
    console.error(error);
    if (errorFlag) {
      throw error;
    }
  }
};
