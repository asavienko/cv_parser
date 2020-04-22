const { getRequest } = require("../../../utils/fetchUtils");
const { SEARCH_URL } = require("../../../constants/rabotaUaUrls");

const parseResumeByRequest = async requestBody => {
  try {
    const requestUrl = new URL(SEARCH_URL);
    requestUrl.search = new URLSearchParams(requestBody);
    return getRequest(requestUrl, { checkAuth: true });
  } catch (e) {
    return e;
  }
};

module.exports = parseResumeByRequest;
