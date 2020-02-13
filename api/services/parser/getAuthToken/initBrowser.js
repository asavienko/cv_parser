const puppeteer = require("puppeteer");
const initBrowser = async () => {
  return await puppeteer.launch();
};

module.exports = initBrowser;
