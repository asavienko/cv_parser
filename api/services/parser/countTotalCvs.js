const fetch = require('node-fetch');

const countTotalCvs = async (queryString = '') => {
  const targetUrl = 'https://rabota.ua/api/resume/search?';
  const response = await fetch(targetUrl + queryString);
  const json = await response.json();
  return json.TotalFull;
};

module.exports = countTotalCvs;
