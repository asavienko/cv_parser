const { getRequest } = require("../../../utils/fetchUtils");
const getAuthToken = require("../getAuthToken/getAuthTokenFromPage");
const checkIsAuthTokenValid = require("../getAuthToken/checkIsAuthTokenValid");
const { SEARCH_URL } = require("../../../constants/rabotaUaUrls");

//     const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

const getResumeFromPages = async requestBody => {
  try {
    const token = await checkIsAuthTokenValid();
    const authToken = token || (await getAuthToken());
    const requestUrl = new URL(SEARCH_URL);
    requestUrl.search = new URLSearchParams(requestBody);
    return getRequest(requestUrl, { Cookie: authToken });
  } catch (e) {
    return e;
  }
};

module.exports = getResumeFromPages;
