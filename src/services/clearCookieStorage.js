import Cookies from "js-cookie";

const clearCookieStorage = () => {
  console.log(Cookies.remove("Access-Token"));
};

export default clearCookieStorage;
