const userName = process.env.USER_NAME;
const userPassword = process.env.USER_PASSWORD;

const login = async page => {
  await page.goto("https://rabota.ua/employer/login");
  await page.waitFor('input[type="email"]');
  await page.waitFor('input[type="password"]');

  await page.type('input[type="email"]', userName);
  await page.type('input[type="password"]', userPassword);
  await page.waitFor("#ctl00_content_ZoneLogin_btnLogin");
  await page.click("#ctl00_content_ZoneLogin_btnLogin");
  await page.waitForNavigation();
  return page;
};

module.exports = login;
