const fetch = require("node-fetch");
const _ = require("lodash");

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

const parseRabotauaPages = async ({
  url = "https://rabota.ua/api/resume/search?period=6&searchtype=everywhere&sort=date&count=20",
  currentPage = 1,
  options
}) => {
  const requestUrl = `${url}&pg=${currentPage}`;
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
