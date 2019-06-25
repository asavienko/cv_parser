const initBrowser = require("./actions/initBrowser")
const getUserLinks = require("../toDellete/getUserLinks");
const parseUserInformation = require("./actions/parseUserInformation");
const parseCvs = require("./actions/parseCvs");
const login = require("./actions/login");


(async () => {
  const page = await initBrowser();
  const enteredPage = await login(page);
  await parseCvs(enteredPage);
})();
