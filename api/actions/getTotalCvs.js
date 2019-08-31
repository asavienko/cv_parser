const fetch = require("node-fetch");

const getTotalCvs = async ({
  token = "",
  queryString= "",
}) => {
  const targetUrl = "https://rabota.ua/api/resume/search?";
  const options = { headers: { cookie: token } };
  const response = await fetch(targetUrl + queryString, options);
  const json = await response.json();
  return json.Total;
};

module.exports = getTotalCvs;
