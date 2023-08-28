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
} = configProvider;

var transporter = nodemailer.createTransport({
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
      var response = await transporter.sendMail(mailOptions);
      console.log("Email sent: ");
      console.log(response);
      return { status: 200, message: "Mail sent" };
    } else {
      console.error("Invalid email");
      return { status: 500, message: "Invalid email" };
    }
  } catch (error) {
    if (error) {
      console.error(error);
      return { status: 500, message: "Error!!!" };
    }
  }
};

module.exports = communicate;
