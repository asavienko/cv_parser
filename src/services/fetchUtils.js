const target =
  process.env.REACT_APP_WEBAPP_SERVICE_URL || "http://localhost:5000";

async function request(url, method, { headers, body }) {
  try {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

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

export const getRequest = async (url, params = {}) => {
  const { headers } = params;
  return request(url, "GET", { headers });
};

export const postRequest = async (url, { headers = {}, body = {} }) => {
  return request(url, "POST", { headers, body });
};

export const putRequest = async (url, { headers = {}, body = {} }) => {
  return request(url, "PUT", { headers, body });
};

export const deleteRequest = async (url, params = {}) => {
  const { headers } = params;
  return request(url, "DELETE", { headers });
};
