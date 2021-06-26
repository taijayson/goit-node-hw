const { Schema } = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = Schema({
  email: {
    type: String,
    require: [true, "Need mail"],
    unique: true,
    validate: {
      validator(value) {
        return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
      },
    },
  },
  password: {
    type: String,
    require: [true, "Need pass"],
    minLength: 8,
    validate: {
      validator(value) {
        return /^.*(?=.{6,})(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(
          value
        );
      },
    },
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
});

userSchema.methods.setPassword = function (password) {
  this.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(5));
};

userSchema.methods.validPassword = function (password) {
  return bcryptjs.compareSync(password, this.password);
};

module.exports = userSchema;
