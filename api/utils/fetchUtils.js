const fetch = require("node-fetch");
const _ = require("lodash");

const getAuthToken = require("../services/parser/getAuthToken/getAuthTokenFromPage");
const checkIsAuthTokenValid = require("../services/parser/getAuthToken/checkIsAuthTokenValid");

const request = async (
  url,
  method,
  { checkAuth = false, ...options },
  body = null
) => {
  try {
    const headers = {};
    if (checkAuth) {
      const token = await checkIsAuthTokenValid();
      headers.Cookies = token || (await getAuthToken());
    }
    const requestOptions = {
      ...options,
      headers,
      method,
      body
    };
    const response = await fetch(url, requestOptions);
    const {status} = response;

    if (status !== 200) {
      throw new Error("error with request to resource");
    }
    const json = await response.json();
    if (!json) {
      throw new Error(
        `No data in document. response.Message: ${json.Message}.`
      );
    }
    return json;
  } catch (e) {
    throw new Error(e);
  }
};

const getRequest = async (url, options = {}) => {
  return request(url, "GET", options);
};

const postRequest = async (url, options = {}, body = {}) => {
  return request(url, "POST", options, body);
};

module.exports = { getRequest, postRequest };
