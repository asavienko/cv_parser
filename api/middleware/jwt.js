const expressJwt = require("express-jwt");
const SECRET = process.env.SECRET;
const userService = require("../services/users/userServices");

const isRevoked = async (req, payload, done) => {
  const user = await userService.getById(payload.sub);
  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
};

const jwt = () => {
  return expressJwt({ secret: SECRET, isRevoked }).unless({
    path: ["/users/sign-up", "/users/sign-in"]
  });
};

module.exports = jwt;
