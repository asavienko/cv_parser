const { userSignUp, userSignIn } = require("./schemas");

module.exports = {
  "/users/sign-up": userSignUp,
  "/users/sign-in": userSignIn
};
