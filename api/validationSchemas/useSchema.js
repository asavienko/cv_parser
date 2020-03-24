const { userSignUp, userSignIn, header, getCvByRequest } = require("./schemas");

module.exports = {
  "/users/sign-up": userSignUp,
  "/users/sign-in": userSignIn,
  header,
  "/cv/get-by-request": getCvByRequest
};
