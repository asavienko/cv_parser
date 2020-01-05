const Joi = require("@hapi/joi");
const { EMAIL_VALIDATION } = require("../constants/validation");

const schema = Joi.object({
  email: Joi.string()
    .required()
    .max(90)
    .email(),
  password: Joi.string().required().max(90).valid(EMAIL_VALIDATION)

  /*
  confirm: delete from UI

  phone: only "+" and numbers
  name:
  surname:*/

});
