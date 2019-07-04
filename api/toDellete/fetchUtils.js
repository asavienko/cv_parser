async function request(url, method, body) {
  try {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
    const { ok, status } = response;
    if (ok === false || status !== 200) {
      const { error } = await response.json();
      throw new Error(error);
    }
    return response.json();
  } catch (e) {
    // if (e.message === 'Failed to fetch') {
    //   logout();
    // }
    console.error(e.message);
    throw new Error(e);
  }
}

export const postRequest = async (url, body = {}) => {
  return request(url, "POST", body);
};
export const putRequest = async (url, body = {}) => {
  return request(url, "PUT", body);
};
export const getRequest = async url => {
  return request(url, "GET");
};
export const deleteRequest = async url => {
  return request(url, "DELETE");
};
