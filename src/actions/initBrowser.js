const puppeteer = require("puppeteer");

const initBrowser = async () => {
  await console.log("browser initializing");
  const browser = await puppeteer.launch({
    headless: "headless"
  });
  return await browser.newPage();
};

module.exports = initBrowser;
