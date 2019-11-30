const initBrowser = require("./initBrowser");
const login = require("./login");
const getAuthTokenCookies = require("./getAuthTokenCookies");

const getAuthToken = async () => {
  const browser = await initBrowser();
  const page = await browser.newPage();
  const enteredPage = await login(page);
  const token = await getAuthTokenCookies(enteredPage);
  await browser.close();
  return token;
};

module.exports = getAuthToken;
