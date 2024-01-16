const { constant } = require("../constants/server.constant");
const { validateEmail } = require("../validation/default.validation");

const communicationUtils = {
  /**
   *
   * @param {*} mailRecipients
   * @returns
   */
  validateEmails: (mailRecipients) => {
    try{
      let valid = true;
      let { to = [], cc = [], bcc = [] } = mailRecipients;

      [...to, ...cc, ...bcc].forEach((eachRecipient) => {
        if (!validateEmail.validate(eachRecipient)) {
          valid = false;
        }
      });
      return valid;
    }catch(error){
      console.log(error);
      throw error;
    }
  },

  /**
   *
   * @param {*} commOptions
   */
  getMessageObject: (
    commOptions = {
      communicationTemplate: {},
      commData: {},
    }
  ) => {
    try {
      let { communicationTemplate, commData } = commOptions;
      let messageObj = {};

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
        let regExpr = new RegExp("#" + commDataKey, "g");
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
  },
};

module.exports = communicationUtils;
