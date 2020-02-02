const { userSignUp, userSignIn, header } = require("./schemas");

module.exports = {
  "/users/sign-up": userSignUp,
  "/users/sign-in": userSignIn,
  header
};
