import { getUserFromCookieStorage } from "./cookieStorage";

const target =
  process.env.REACT_APP_WEBAPP_SERVICE_URL || "http://localhost:5000";

const checkResponseSuccess1 = response => {
  if (!response.ok) throw new Error();
};

const generateAuthHeader = (token = "") => {
  return { Authorization: `Bearer ${token}` };
};

async function request(url, method, body) {
  try {
    const { token, _id } = getUserFromCookieStorage();
    const extendedHeaders = {
      ...generateAuthHeader(token),
      _id
    };
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    Object.entries(extendedHeaders).forEach(([key, value]) =>
      headers.append(key, value)
    );
    const targetURL = new URL(url, target);
    const response = await fetch(targetURL, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
    checkResponseSuccess1(response);
    return response.json();
  } catch (e) {
    throw new Error(e);
  }
}

export const getRequest = async url => {
  return request(url, "GET");
};

export const postRequest = async (url, body = {}) => {
  return request(url, "POST", body);
};

export const putRequest = async (url, body = {}) => {
  return request(url, "PUT", body);
};

export const deleteRequest = async url => {
  return request(url, "DELETE");
};
