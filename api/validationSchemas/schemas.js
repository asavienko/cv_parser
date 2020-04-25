const Joi = require("@hapi/joi");
const {
  PASSWORD_VALIDATION,
  PHONE_VALIDATION,
  LETTERS_VALIDATION,
  LETTERS_NUMBERS_DOTS_QUOTES
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

const header = Joi.object().pattern(LETTERS_NUMBERS_DOTS_QUOTES, [
  Joi.string()
    .max(500)
    .pattern(LETTERS_NUMBERS_DOTS_QUOTES),
  Joi.number()
]);

// max skip number 10 million
const getCvByRequest = Joi.object({
  keywords: Joi.string()
    .allow("")
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
  salaryFrom: Joi.number()
    .min(0)
    .max(1000000),
  salaryTo: Joi.number()
    .min(0)
    .max(1000000),
  ageFrom: Joi.number()
    .min(0)
    .max(150),
  ageTo: Joi.number()
    .min(0)
    .max(150),
  sex: Joi.number()
    .min(1)
    .max(2),
  hasPhoto: Joi.number()
    .min(0)
    .max(1),
  experienceId: Joi.number()
    .min(1)
    .max(3)
});

// max skip number 10 with 15 zeros
const getCvInfo = Joi.object({
  id: Joi.number()
    .min(1)
    .max(10 * Math.pow(10, 15))
});

module.exports = { userSignUp, userSignIn, header, getCvByRequest, getCvInfo };
