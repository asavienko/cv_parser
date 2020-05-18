const {
  userSignUp,
  userSignIn,
  header,
  filtersForRequest,
  getCvInfo,
  createList,
  updateList
} = require("./schemas");

module.exports = {
  "/users/sign-up": userSignUp,
  "/users/sign-in": userSignIn,
  header,
  "/cv/get-by-request": filtersForRequest,
  "/cv/get-cv-info": getCvInfo,
  "/cv/list": createList,
  "/cv/update-list": updateList
};
