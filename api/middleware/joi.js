const _ = require("lodash");
const useSchema = require("../validationSchemas/useSchema");

const joiMiddleware = () => ({ path, body, headers }, res, next) => {
  //add routes that skip validation
  const exceptions = [""];

  const isException = exceptions.includes(path);
  if (!isException) {
    const hasBody = !_.isEmpty(body);
    const responseBody = hasBody && useSchema[path].validate(body);
    const responseHeaders = useSchema.header.validate(headers)
    const error = _.get({...responseBody, ...responseHeaders}, "error", {});
    error.name ? res.status(422).json({ err: error.name }) : next();
  } else {
    next();
  }
};

module.exports = joiMiddleware;
