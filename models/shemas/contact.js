const { Schema } = require("mongoose");

const contactShema = Schema({
  name: {
    type: String,
    required: [true, "Whooopps! Set name for contact!"],
    minLength: 1,
    maxLength: 50,
    validate: {
      validator(value) {
        return /^[A-Za-z0-9А-Яа-я ]{1,40}$/.test(value);
      },
    },
  },
  email: {
    type: String,
    required: [true, "Whooopps! Set email for contact!"],
    unique: true,
    validate: {
      validator(value) {
        return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
      },
    },
  },
  phone: {
    type: String,
    required: [true, "Whooopps! Set phone for contact!"],
    validate: {
      validator(value) {
        return /\b\d{3}[-.]?\d{3}[-.]?\d{2}[-.]?\d{2}\b/.test(value);
      },
    },
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

module.exports = contactShema;
