export const signUpSignInFunction = user => {
  document.cookie = user;
  console.log(JSON.parse(document.cookie));
  console.log(user);
};
