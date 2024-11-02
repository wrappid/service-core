import { v4 as uuidv4 } from "uuid";
import { constant } from "../constants/server.constant";
import { databaseActions } from "../database/actions.database";
import { coreConstant } from "../index";
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
  WrappidLogger.logFunctionStart("whatsapp.communicate");
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
        WrappidLogger.error(`Template not found: ${commTemplateID}`);
        throw new Error(`Template not found: ${commTemplateID}`);
      }

      const messageObject = communicationUtils.getMessageObject({
        communicationTemplate,
        commData,
      });
      //create
      //  FunctionsRegistry.createCommunicationHistory();
      const defaultProvider = await communicationUtils.getDefaultCommunicationConfig(commType);
      const senderData = await mapCommunicationConfig(defaultProvider, commType);
      // with status new give entry
      const newCreatedData = await databaseActions.create(
        "application",
        "CommunicationHistories",
        {
          type: commType,
          from: senderData?.sender,
          to: commRecipients.to[0],
          retryCount: 0,
          commId: uuidv4(),
          extraInfo: {},
          variable: {otp: commData?.otp},
          _status: "new",
          templateId: communicationTemplate?.id,
        }
      );
      let resData:any = {status: false, data: {}};
      if (directFlag) {
        switch (commType) {
          case constant.commType.EMAIL:
            resData = await communicateEmail({ ...commRecipients, ...messageObject });
            break;
          case constant.commType.SMS:
            resData = await communicateSMS({
              phone: commRecipients.to[0],
              ...messageObject,
              dlttemplateid: communicationTemplate.externalTemplateId,
            });
            break;
          case constant.commType.WHATSAPP:
            resData = await communicateWhatsApp({
              phone: commRecipients.to[0],
              messageObject,
            });
            break;
          default:
            WrappidLogger.error("Communication type is invalid.");
            throw new Error("Communication type is invalid.");
        }
        //check communcation status
        ///update status sent
        if(resData?.status){
          databaseActions.update(
            "application",
            "CommunicationHistories",
            { _status: "sent",
              extraInfo: {response: resData?.data}
            },
            { where: { id: newCreatedData?.id } }
          );
          return {success:true};
        }

      } else {
      // db entry
      }
    }else{
      WrappidLogger.error("Communcation Disabled!!");
      throw new Error("Communcation Disabled!!");
    }
  } catch (error:any) {
    //db entry with status sent faild
    databaseActions.update(
      "application",
      "CommunicationHistories",
      { _status: "faild" },
      { where: {  to: commRecipients.to[0],
        variable: {otp: commData?.otp},
        _status: "new", } }
    );
    // console.error(error);
    WrappidLogger.error(error);
    if (errorFlag) {
      throw error;
    }
  } finally {
    WrappidLogger.logFunctionEnd("whatsapp.communicate");
  }
};

/**
 *  This function help us to map communication config
 * @param configData config data
 * @param commType communication type
 * @returns 
 */
async function mapCommunicationConfig(configData:any, commType:string){
  try {
    WrappidLogger.logFunctionStart("mapCommunicationConfig");
    const returndata:any = {sender: ""};
    switch (commType) {
      case coreConstant.commType.EMAIL:
        returndata.sender = configData?.fromEmail;
        break;

      case coreConstant.commType.SMS:
        returndata.sender = configData?.sender;
        break;

      case coreConstant.commType.WHATSAPP:
        returndata.sender = configData?.api_url;
        break;
      
      default:
        break;
    }
    return returndata;
  } catch (error:any) {
    WrappidLogger.error(error);
    throw error;
  } 
}
