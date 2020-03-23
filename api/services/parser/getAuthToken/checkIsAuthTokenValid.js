const fetch = require("node-fetch");

const checkIsAuthTokenValid = token => {
  const options = { headers: { Cookie: token } };
  return fetch("https://rabota.ua/cv/15743079", options)
    .then(response => response.text())
    .then(htmlPage => htmlPage.indexOf("Выйти") !== -1);
};

module.exports = checkIsAuthTokenValid;
