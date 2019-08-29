const querystring = require("querystring");
const fetch = require("node-fetch");

const getTotalCvs = async ({
  page,
  request: {
    keywords = "",
    regionid = 0,
    period = 7,
    searchtype = "everywhere",
    moveability = 0,
    sort = "date"
  }
}) => {
  const targetUrl = "https://rabota.ua/api/resume/search?";
  const searchStringRequest = querystring.stringify({
    keywords,
    regionid,
    period,
    searchtype,
    moveability,
    sort
  });
  console.log(searchStringRequest);
  const response = await fetch(targetUrl + searchStringRequest);
  const json = await response.json();
  return json.Total;
};

module.exports = getTotalCvs;
