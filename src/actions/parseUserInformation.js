const getUserInformation = async (page, links) => {
  const context = await page.browserContext();
  const target = await context.newPage();
  target.goto(link);
  await target.waitForResponse(response => response.status() === 200);
};

const parseUserInformation = async (page, userLinks) => {
  userLinks.forEach(link => {
    getUserInformation(page, link);
  });
};

module.exports = parseUserInformation;
