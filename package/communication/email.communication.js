const nodemailer = require("nodemailer");
const {
  validateEmail,
} = require("../../module/communication/communication.validator");

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
    from: `${config[env].mailFrom} <${config[env].mailId}>`,
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