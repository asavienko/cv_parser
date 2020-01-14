const errorHandler = (err, req, res, next) => {
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ err: err });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ err: "Invalid Token" });
  }

  // default to 500 server error
  return res.status(500).json({ err: err.message });
};

module.exports = errorHandler;
