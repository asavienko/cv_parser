const getAuthCookie = async page => {
  const cookies = await page.cookies();
  const name = ".RAB2AUTH";
  const auth = cookies.find(cookie => cookie.name === name);
  const cookie = name + "=" + auth.value;
  return cookie;
};
module.exports = getAuthCookie;
