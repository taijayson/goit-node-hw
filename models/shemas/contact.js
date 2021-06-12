const { Schema } = require("mongoose");

const contactShema = Schema({
  name: {
    type: String,
    required: [true, "Whooopps! Set name for contact!"],
  },
  email: {
    type: String,
    required: [true, "Whooopps! Set email for contact!"],
  },
  phone: {
    type: Number,
    required: [true, "Whooopps! Set phone for contact!"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

module.exports = contactShema;
