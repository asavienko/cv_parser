const fetch = require("node-fetch");
const _ = require("lodash");

const request = async (url, method, headers, body = null) => {
  try {
    const options = {
      method,
      headers,
      body
    };
    const response = await fetch(url, options);
    const json = await response.json();
    if (!_.has(json, "Documents")) {
      throw new Error(
        `No data in document. response.Message: ${json.Message}.`
      );
    }
    return json;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const getRequest = async (url, headers) => {
  return request(url, "GET", headers);
};

const postRequest = async (url, headers, body = {}) => {
  return request(url, "POST", headers, body);
};

module.exports = { getRequest, postRequest };
