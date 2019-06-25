const userName = require("../constants/userData").userName;
const userPassword = require("../constants/userData").userPassword;

const login = async page => {
  await console.log("browser has initialized");
  await console.log("going to the employer page");
  await page.goto("https://rabota.ua/employer");
  console.log("trying to enter");
  await page.waitFor(
    "#ctl00_Header_header > div > header > div > div:nth-child(2) > ul > li:nth-child(3) > a.f-header-menu-list-link-with-border > label"
  );
  await page.click(
    "#ctl00_Header_header > div > header > div > div:nth-child(2) > ul > li:nth-child(3) > a.f-header-menu-list-link-with-border > label"
  );

  await page.waitFor('input[name="ctl00$Sidebar$login$txbLogin"]');
  await page.type('input[name="ctl00$Sidebar$login$txbLogin"]', userName);
  await page.waitFor('input[name="ctl00$Sidebar$login$txbPassword"]');
  await page.type(
    'input[name="ctl00$Sidebar$login$txbPassword"]',
    userPassword
  );
  await page.click("#ctl00_Sidebar_login_lnkLogin");
  await page.waitForResponse(response => response.status() === 200);
  return await page;
};

module.exports = login;
