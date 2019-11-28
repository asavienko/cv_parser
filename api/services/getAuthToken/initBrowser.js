const puppeteer = require("puppeteer");
const browserHeadless = require("../../toDellete/constants/constants")
  .browserHeadless;

const initBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: browserHeadless
  });
  return browser;
};

module.exports = initBrowser;
