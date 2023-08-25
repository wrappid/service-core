const { constant } = require("../constants/server.constant");

/**
 * 
 */
const communicate = async ({
    recipients: {
        to: [],
        cc: [],
        bcc: []
    },
    template: { },
    commType: constant.commType.EMAIL,
    
}) => {

};

module.exports = communicate;