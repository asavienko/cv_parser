const target =
  process.env.REACT_APP_WEBAPP_SERVICE_URL || "http://localhost:5000";

async function request(url, method, { setHeaders, body }) {
  try {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    for (let key in setHeaders) {
      headers.append(key, setHeaders[key]);
    }
    const targetURL = new URL(url, target);
    const response = await fetch(targetURL, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
    return response.json();
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}

export const getRequest = async (url, headers = {}) => {
  return request(url, "GET", { setHeaders: headers });
};

export const postRequest = async (url, { headers = {}, body = {} }) => {
  return request(url, "POST", { setHeaders: headers, body });
};

export const putRequest = async (url, { headers = {}, body = {} }) => {
  return request(url, "PUT", { setHeaders: headers, body });
};

export const deleteRequest = async (url, headers = {}) => {
  return request(url, "DELETE", { setHeaders: headers });
};

export const generateAuthHeader = (token = "") => {
  return { Authorization: `Bearer ${token}` };
};
