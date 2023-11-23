const nodemailer = require("nodemailer");
const configProvider = require("../../config/provider.config");
const { validateEmails } = require("../../utils/communication.utils");
const {
  fromName,
  fromEmail,
  replyTo,
  service,
  email,
  password
} = configProvider.emailProvider;

let transporter = nodemailer.createTransport({
  service: service,

  auth: {
    user: email,
    pass: password,
  },
});

const communicate = async (mailOptions) => {
  mailOptions = {
    ...mailOptions,
    from: `${fromName} <${fromEmail}>`,
    replyTo: replyTo
  };
  try {
    if (validateEmails(mailOptions)) {
      console.log("mailOptions", mailOptions);
      return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log("error: ", err);
            reject(err);
          } else {
            console.log(`Mail sent successfully!`);
            resolve(info);
          }
        });
      }).then(res => {
        console.log("Email sent.................");
        console.log(res);
        return true;
      }).catch(error => {
        console.log("Email sent failed.................");
        console.error(error);
        throw error;
      });
    } else {
      throw new Error("Invalid email recipients.");
    }
  } catch (error) {
    throw new error;
  }
};

module.exports = communicate;
