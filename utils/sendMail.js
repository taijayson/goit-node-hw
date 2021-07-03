const nodemailer = require("nodemailer");

const nodemailerMetaConfig = require("../configs/nodemailer-mail-config");

const transporter = nodemailer.createTransport(nodemailerMetaConfig);
const sendMail = async (email, verifyToken) => {
  const emailOptions = {
    to: email,
    from: "pedrogeks11@yahoo.com",
    subject: "Verify token",
    text: `Make GET request to http//:localhost:<YOUR_PORT>/api/users/verify/${verifyToken} to verify your email`,
  };
  try {
    const result = await transporter.sendMail(emailOptions);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;
