import { getRequest, postRequest } from "./fetchUtils";

const userUrls = () => ({
  getCurrentUser: "/users/get-current-user",
  signInUser: "/users/sign-in",
  signUpUser: "/users/sign-up"
});

export const getCurrentUser = () => getRequest(userUrls().getCurrentUser);

export const signInUser = signInData =>
  postRequest(userUrls().signInUser, signInData);

export const signUpUser = signUpData =>
  postRequest(userUrls().signUpUser, signUpData);
