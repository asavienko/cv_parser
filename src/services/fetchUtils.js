const target =
  process.env.REACT_APP_WEBAPP_SERVICE_URL || "http://localhost:5000";

async function request(url, method, body) {
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
    console.log(response);
    return response.json();
  } catch (e) {
    console.error(e);
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
