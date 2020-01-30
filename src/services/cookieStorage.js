import Cookies from "js-cookie";

export const clearCookieStorage = () => {
  const allCookies = Cookies.get();
  const arrayOfCookiesKey = Object.keys(allCookies);
  arrayOfCookiesKey.forEach(cookieName => Cookies.remove(cookieName));
};

export const getUserFromCookieStorage = () => {
  const userJson = Cookies.get("user");
  return userJson ? { ...JSON.parse(userJson) } : {};
};

export const setUserToCookieStorage = user => {
  const oldUser = getUserFromCookieStorage();
  const newUser = Object.assign({}, oldUser, user);
  return Cookies.set("user", JSON.stringify(newUser));
};

export const getAuthHeader = () => {
  const { token } = JSON.parse(Cookies.get("user"));
  return token && { Authorization: `Bearer ${token}` };
};

export const getUserId = () => {
  const { _id } = JSON.parse(Cookies.get("user"));
  return { _id };
};
