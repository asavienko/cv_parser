const getUserLinks = page => {
  const userLinks = page.evaluate(() => {
    return [...document.querySelectorAll(".cv-list__cv-title > a")].map(
      item => item.href
    );
  });
  return userLinks;
};

module.exports = getUserLinks;
