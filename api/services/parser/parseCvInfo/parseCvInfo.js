const { RESUME_INFO } = require("../../../constants/rabotaUaUrls");
const { getRequest } = require("../../../utils/fetchUtils");

const parseCvInfo = id => {
  try {
    const requestUrl = `${RESUME_INFO}${id}`;
    return getRequest(requestUrl);
  } catch (e) {
    return e;
  }
};

module.exports = parseCvInfo;
