const fetch = require("node-fetch");
const _ = require("lodash");
const generateRabotaUaUrls = require("../generateRabotaUaUrls");

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

const parseRabotauaPages = async ({ searchRequest = {}, options }) => {
  const requestUrl = generateRabotaUaUrls.getCvListUrl(searchRequest);
  try {
    const response = await fetch(requestUrl, options);
    const json = await response.json();
    if (!_.has(json, "Documents")) {
      throw new Error(
        `No data in document. response.Message: ${json.Message}.`
      );
    }
    return json;
  } catch (error) {
    return error;
  }
};

module.exports = parseRabotauaPages;
