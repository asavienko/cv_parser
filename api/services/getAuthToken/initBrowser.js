const puppeteer = require("puppeteer");
const browserHeadless = require("../../toDellete/constants/constants")
  .browserHeadless;

const initBrowser = async () => {
  return await puppeteer.launch({
    headless: browserHeadless
  });
};

module.exports = initBrowser;
