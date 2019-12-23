const expressJwt = require("express-jwt");
const SECRET = process.env.SECRET;
// const userService = require("../users/user.service");
const userService = require("../services/user/service");

module.exports = jwt;

function jwt() {
  return expressJwt({ secret: SECRET, isRevoked }).unless({
    path: ["/sign-up", "/sign-in", "/sign"]
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}
