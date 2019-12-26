const expressJwt = require("express-jwt");
const SECRET = process.env.SECRET;
const userService = require("../services/users");

function jwt() {
  return expressJwt({ secret: SECRET, isRevoked }).unless({
    path: ["/users/authenticate", "/users/register", "/users/create"]
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

module.exports = jwt;
