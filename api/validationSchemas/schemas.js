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
  keywords: Joi.string()
    .allow("")
    .min(0)
    .max(100),
  period: Joi.number()
    .min(1)
    .max(7),
  searchType: Joi.string()
    .min(0)
    .max(40),
  sort: Joi.string()
    .min(0)
    .max(40),
  pg: Joi.number()
    .min(0)
    .max(10 * Math.pow(10, 6)),
  agefrom: Joi.number()
    .min(0)
    .max(150),
  agefo: Joi.number()
    .min(0)
    .max(150),
  sex: Joi.number()
    .min(1)
    .max(2),
  salaryfrom: Joi.number()
    .min(0)
    .max(1000000),
  hasphoto: Joi.number()
    .min(0)
    .max(1),
  experienceid: Joi.number()
    .min(1)
    .max(3)
});


module.exports = { userSignUp, userSignIn, header, getCvByRequest };
