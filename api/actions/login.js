const userName = require("../constants/userData").userName;
const userPassword = require("../constants/userData").userPassword;

const login = async page => {
  await page.goto("https://rabota.ua/employer/");
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
  await page.waitForNavigation()
  return await page;
};

//todo improve login, if error try again

module.exports = login;
