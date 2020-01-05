const Joi = require("@hapi/joi");
const {
  PASSWORD_VALIDATION,
  PHONE_VALIDATION,
  LETTERS_VALIDATION
} = require("../constants/validation");

const userSignUp = Joi.object({
  email: Joi.string()
    .required()
    .max(90)
    .email(),
  password: Joi.string()
    .required()
    .min(8)
    .max(90)
    .pattern(PASSWORD_VALIDATION),
  phone: Joi.string()
    .required()
    .min(6)
    .max(30)
    .pattern(PHONE_VALIDATION),
  name: Joi.string()
    .max(90)
    .pattern(LETTERS_VALIDATION),
  surname: Joi.string()
    .max(90)
    .pattern(LETTERS_VALIDATION)
});

const userSignIn = Joi.object({
  email: Joi.string()
    .required()
    .max(90)
    .email(),
  password: Joi.string()
    .required()
    .min(8)
    .max(90)
    .pattern(PASSWORD_VALIDATION)
});

module.exports = { userSignUp, userSignIn };
