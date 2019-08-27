const querystring = require("querystring");
const fetch = require("node-fetch");

const countFoundCvs = async ({
  page,
  request: {
    keyword = "",
    regionid = 0,
    period = 7,
    searchtype = "everywhere",
    moveability = 0,
    sort = "date"
  }
}) => {
  const targetUrl = "https://rabota.ua/api/resume/search?";
  const searchStringRequest = querystring.stringify({
    keyword,
    regionid,
    period,
    searchtype,
    moveability,
    sort
  });
  const response = await fetch(targetUrl + searchStringRequest);
  const json = await response.json();
  const totalCvs = json.Total;
  return totalCvs;
};

module.exports = countFoundCvs;
