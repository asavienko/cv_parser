const puppeteer = require("puppeteer");
const { browserHeadless } = require("../../toDellete/constants/constants");
const initBrowser = async () => {
  return await puppeteer.launch({
    headless: browserHeadless
  });
};

module.exports = initBrowser;
