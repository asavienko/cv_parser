const _ = require("lodash");
const useSchema = require("../validationSchemas/useSchema");

const joiMiddleware = () => ({ path, body, headers }, res, next) => {
  const hasBody = !_.isEmpty(body);
  const responseBody = hasBody && useSchema[path].validate(body);
  const responseHeaders = useSchema.header.validate(headers);
  const response = { ...responseBody, ...responseHeaders };
  const error = _.get(response, "error", {});
  error.name ? res.status(422).json({ err: error.name }) : next();
};

module.exports = joiMiddleware;
