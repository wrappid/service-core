const nodemailer = require("nodemailer");
const {
  validateEmail,
} = require("../../module/communication/communication.validator");

const configProvider = require("../config/provider.config");

let {
  emailProvider,
  fromName,
  fromEmail,
  replyTo,
} = configProvider;

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailProvider.gmail.email,
    pass: emailProvider.gmail.password,
  },
});

const sentEmail = async (mailOptions) => {
  try {
    mailOptions = {
    ...mailOptions,
    from: `${fromName} <${fromEmail}>`,
    };
      
    if (validateEmail(mailOptions.to)) {
      console.log("mailOptions", mailOptions);
      var response = await transporter.sendMail(mailOptions);
      console.log("Email sent: ");
      console.log(response);
      return { status: 200, message: "Mail sent" };
    } else {
      throw new Error("Invalid email");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = sentEmail;