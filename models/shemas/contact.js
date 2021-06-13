const { Schema } = require("mongoose");

const contactShema = Schema({
  name: {
    type: String,
    required: [true, "Whooopps! Set name for contact!"],
    minLength: 1,
    maxLength: 50,
    validate: {
      validator(value) {
        return /^[A-Za-z0-9А-Яа-я]{1,40}$/.test(value);
      },
    },
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator(value) {
        return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
      },
    },
    required: [true, "Whooopps! Set email for contact!"],
  },
  phone: {
    type: String,
    validate: {
      validator(value) {
        return /\b\d{3}[-.]?\d{3}[-.]?\d{2}[-.]?\d{2}\b/.test(value);
      },
    },
    unique: true,
    required: [true, "Whooopps! Set phone for contact!"],
  },
  dateOfBirt: {
    type: String,
    validate: {
      validator(value) {
        return /^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$/.test(
          value
        );
      },
    },
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

module.exports = contactShema;
