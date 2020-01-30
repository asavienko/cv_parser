const _ = require("lodash");
const useSchema = require("../validationSchemas/useSchema");

const joiMiddleware = () => (req, res, next) => {
  const exceptions = ["/users"];
  console.log(req.headers);
  const isException = exceptions.includes(req.path);
  const requestHasBody = ["POST", "PUT"].includes(req.method);
  if (!isException && requestHasBody) {
    const response = useSchema[req.path].validate(req.body);
    const error = _.get(response, "error", {});
    error.name ? res.status(422).json({ err: error.name }) : next();
  } else {
    next();
  }
};

module.exports = joiMiddleware;
