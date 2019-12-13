const puppeteer = require("puppeteer");
const initBrowser = async () => {
  return await puppeteer.launch({
    headless: true
  });
};

module.exports = initBrowser;
