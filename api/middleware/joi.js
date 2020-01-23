const _ = require("lodash");
const useSchema = require("../validationSchemas/useSchema");

const joiMiddleware = () => (req, res, next) => {
  const exceptions = ["/users"];

  const isException = exceptions.includes(req.path);
  if (!isException) {
    const response = useSchema[req.path].validate(req.body);
    const error = _.get(response, "error", {});
    error.name ? res.status(422).json({ message: error.name }) : next();
  } else {
    next();
  }
};

module.exports = joiMiddleware;
