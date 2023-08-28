const { constant } = require("../constants/server.constant");
const databaseActions = require("../database/actions.database");
const communicationUtils = require("../utils/communication.utils");
const communicateEmail = require("./email/email.communication");
const communicateSMS = require("./sms/sms.communication");
const communicateWhatsApp = require("./whatsapp/whatsapp.communication");

/**
 * 
 * @param {*} communicationObject
 */
const communicate = async ({ commType, commRecipients, commData, commTemplateID, directFlag, errorFlag }) => {
  try {
    // get template
    let communicationTemplate = await databaseActions.findOne("application", "CommunicationTemplates", {
      where: {
        name: commTemplateID,
        _status: constant.entityStatus.APPROVED,
      }
    });
    if (!communicationTemplate) {
      throw new Error(`Template not found: ${commTemplateID}`);
    }

    let messageObject = communicationUtils.getMessageObject({ communicationTemplate, commData });

    if (directFlag) {
      switch (commType) {
        case constant.commType.EMAIL:
          communicateEmail({ ...commRecipients, ...messageObject });
          break;
        case constant.commType.SMS:
          communicateSMS({});
          break;
        case constant.commType.WHATSAPP:
          communicateWhatsApp();
          break;
        default:
          throw new Error("Communication type is invalid.");
      }
    }
  } catch (error) {
    console.error(error);
    if (errorFlag) {
      throw error;
    }
  }
};

module.exports = communicate;