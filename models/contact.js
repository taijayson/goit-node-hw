const { model } = require("mongoose");

const { contactShema } = require("./shemas");

const Contact = model("contact", contactShema);

module.exports = Contact;
