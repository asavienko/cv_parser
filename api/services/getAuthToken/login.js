const userName = process.env.USER_NAME;
const userPassword = process.env.USER_PASSWORD;

const login = async page => {
  await page.goto("https://rabota.ua/employer/");
  await page.waitForSelector('a>[for=f-overlay-chkbx]');
  await page.click('a>[for=f-overlay-chkbx]');

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
