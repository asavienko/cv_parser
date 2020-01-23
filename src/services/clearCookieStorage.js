import Cookies from "js-cookie";

const clearCookieStorage = () => {
  Cookies.remove("Access-Token");
};

export default clearCookieStorage;
