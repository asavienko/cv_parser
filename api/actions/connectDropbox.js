const Dropbox = require("dropbox").Dropbox;
const accessToken = require("../constants/userData").bdxAccessToken;
const fetch = require("node-fetch");

module.exports = async () => {
  const dbx = await new Dropbox({ fetch, accessToken });
  return dbx;
};
