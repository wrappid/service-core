const { constant } = require("../constants/server.constant");
const { validateEmail } = require("../validation/default.validation");

const communicationUtils = {
    /**
     * 
     * @param {*} mailRecipients 
     * @returns 
     */
    validateEmails: (mailRecipients) => {
        let valid = true;
        let { to = [], cc = [], bcc = [] } = mailRecipients;

        [...to, ...cc, ...bcc].forEach(eachRecipient => {
            if (!validateEmail(eachRecipient)) {
                valid = false;
            }
        })
        return valid;
    },

    /**
     * 
     * @param {*} commOptions 
     */
    getMessageObject: (commOptions = {
        communicationTemplate: {},
        commData: {}
    }) => {
        try {
            let { communicationTemplate, commData } = commOptions;
            let messageObj = {
                message: ""
            };

            if (communicationTemplate.type === constant.commType.EMAIL) {
                messageObj.subject = "";
                messageObj.contentType = communicationTemplate.contentType;
            }

            messageObj.message = communicationTemplate.type === constant.commType.WHATSAPP ? JSON.stringify(communicationTemplate.config) : communicationTemplate.message;
            Object.keys(commData).forEach(commDataKey => {
                let regExpr = new RegExp("#" + commDataKey, "g");
                if (communicationTemplate.type === constant.commType.EMAIL) {
                    messageObj.subject = messageObj.subject.replace(regExpr, commData[commDataKey]);
                }
                messageObj.message = messageObj.message.replace(regExpr, commData[commDataKey]);
            });

            return messageObj;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = communicationUtils;