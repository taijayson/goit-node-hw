require("dotenv").config();

const { META_PASS, YAHOO_PASS } = process.env;

const config = {
  host: "smtp.mail.yahoo.com",
  port: 465,
  secure: true,
  auth: {
    user: "pedrogeks11@yahoo.com",
    pass: YAHOO_PASS,
  },
};

module.exports = config;
