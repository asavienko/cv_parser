const Joi = require("@hapi/joi");
const {
  PASSWORD_VALIDATION,
  PHONE_VALIDATION,
  LETTERS_VALIDATION,
  LETTERS_NUMBERS_DOTS
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

const header = Joi.object().pattern(LETTERS_NUMBERS_DOTS, [
  Joi.string()
    .max(150)
    .pattern(LETTERS_NUMBERS_DOTS),
  Joi.number()
]);

// max skip number 10 million
const getCvByRequest = Joi.object({
  skip: Joi.number()
    .min(0)
    .max(10 * Math.pow(10, 6)),
  options: Joi.object({ request: Joi.string() })
});

module.exports = { userSignUp, userSignIn, header, getCvByRequest };
