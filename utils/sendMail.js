const nodemailer = require("nodemailer");

const nodemailerMetaConfig = require("../configs/nodemailer-mail-config");

const transporter = nodemailer.createTransport(nodemailerMetaConfig);
const sendMail = async (verifyToken) => {
  console.log(verifyToken);
  const email = {
    to: "pedrogeks13@gmail.com",
    from: "pedrogeks11@yahoo.com",
    subject: "Welcome to verification test",
    text: `/users/verify/${verifyToken}`,
  };
  //   console.log(email);
  try {
    const result = await transporter.sendMail(email);
    // console.log(result);
    return result;
  } catch (error) {
    console.log("WWWWwwww!!!!");
    throw error;
  }
};

module.exports = sendMail;
