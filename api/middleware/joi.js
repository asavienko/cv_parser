const _ = require("lodash");

const joiMiddleware = (schema, property) => (req, res, next) => {
  const response = schema.validate(req[property]);
  const error = _.get(response, "error", {});
  error.name ? res.status(422).json({ message: error.name }) : next();
};

module.exports = joiMiddleware;
