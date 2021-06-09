const Joi = require("joi");

const contactShema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().min(7).max(30).required(),
  phone: Joi.string().min(10).max(20).required(),
});

module.exports = contactShema;
