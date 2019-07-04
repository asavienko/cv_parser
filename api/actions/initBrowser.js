const puppeteer = require("puppeteer");
const browserHeadless = require("../constants/userData").browserHeadless;

const initBrowser = async () => {
  await console.log("browser initializing");
  const browser = await puppeteer.launch({
    headless: browserHeadless
  });
  return await browser.newPage();
};

module.exports = initBrowser;
