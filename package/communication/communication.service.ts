import { ConfigConstant } from "constant/config.constant";
import { Kit19Service } from "./kit19.service";
import { CommunicationUtils } from "./communication.utils";

export class CommunicationService {
  constructor(private readonly kit19Service: Kit19Service) {}

  async communicate(communicationObject: any): Promise<any> {
    try {
      // get template
      let communicationTemplate = await databaseActions.findOne(
        "application",
        "CommunicationTemplates",
        {
          where: {
            name: communicationObject.commTemplateID,
            _status: ConfigConstant.entityStatus.APPROVED,
          },
        }
      );
      if (!communicationTemplate) {
        throw new Error(
          `Template not found: ${communicationObject.commTemplateID}`
        );
      }

      let messageObject = CommunicationUtils.getMessageObject({
        communicationTemplate,
        commData: communicationObject.commData,
      });
      /**
       * @todo
       * FunctionsRegistry.createCommunicationHistory();
       */
      try {
        if (communicationObject.directFlag) {
          switch (communicationObject.commType) {
            case ConfigConstant.commType.EMAIL:
              return communicateEmail({
                ...communicationObject.commRecipients,
                ...messageObject,
              });
            case ConfigConstant.commType.SMS:
              return this.kit19Service.communicate({
                phone: communicationObject.commRecipients.to[0],
                ...messageObject,
                dlttemplateid: communicationTemplate.externalTemplateId,
              });
            case ConfigConstant.commType.WHATSAPP:
              return communicateWhatsApp();
            default:
              throw new Error("Communication type is invalid.");
          }
        } else {
          // db entry
        }
      } catch (error) {
        //Update communication status fails
      }
    } catch (error) {
      console.error(error);
      if (communicationObject.errorFlag) {
        throw error;
      }
    }
  }
}
