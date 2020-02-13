const getAuthTokenCookies = async page => {
  const cookies = await page.cookies();
  const name = ".RAB2AUTH";
  const auth = cookies.find(cookie => cookie.name === name);
  const token = name + "=" + auth.value;
  return token;
};
module.exports = getAuthTokenCookies;
