import Cookies from "js-cookie";

const clearCookieStorage = () => {
  const allCookies = Cookies.get();
  const arrayOfCookiesKey = Object.keys(allCookies);
  arrayOfCookiesKey.forEach(cookieName => Cookies.remove(cookieName));
};

export default clearCookieStorage;
