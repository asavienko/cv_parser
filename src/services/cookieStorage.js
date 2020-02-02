import Cookies from "js-cookie";

export const clearCookieStorage = () => {
  const allCookies = Cookies.get();
  for (let key in allCookies) {
    Cookies.remove(key);
  }
};

export const getUserFromCookieStorage = () => {
  const userJson = Cookies.get("user");
  return userJson ? JSON.parse(userJson) : {};
};

export const updateUserInCookieStorage = user => {
  const oldUser = getUserFromCookieStorage();
  const newUser = { ...oldUser, ...user };
  return Cookies.set("user", JSON.stringify(newUser));
};
