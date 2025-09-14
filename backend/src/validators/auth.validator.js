const Joi = require('joi');

const name = Joi.string().min(20).max(60).required();
const address = Joi.string().max(400).allow('', null);
const password = Joi.string().min(8).max(16)
  .pattern(new RegExp('(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])'))
  .required();
const email = Joi.string().email().required();

const signupSchema = Joi.object({ name, email, address, password });
const loginSchema = Joi.object({ email, password });

module.exports = { signupSchema, loginSchema };
