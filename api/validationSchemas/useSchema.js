const {
  userSignUp,
  userSignIn,
  header,
  getCvByRequest,
  getCvInfo
} = require("./schemas");

module.exports = {
  "/users/sign-up": userSignUp,
  "/users/sign-in": userSignIn,
  header,
  "/cv/get-by-request": getCvByRequest,
  "/cv/get-cv-info": getCvInfo
};
