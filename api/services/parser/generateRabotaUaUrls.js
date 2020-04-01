const convertToSearchString = obj =>
  Object.entries(obj)
    .map(([key, value]) => {
      if (value) {
        return `${key}=${value}`;
      }
    })
    .filter(item => item)
    .join("&");

const generateRabotaUaUrls = {
  defaultSearchListUrl: "https://rabota.ua/api/resume/search",
  url:
    "https://rabota.ua/api/resume/search?period=6&searchtype=everywhere&sort=date&count=20",
  getCvListUrl({
    period = 6,
    searchtype = "default",
    sort = "date",
    ...restData
  }) {
    const searchString = convertToSearchString({
      period,
      searchtype,
      sort,
      ...restData
    });
    const requestUrl = new URL(this.defaultSearchListUrl);
    requestUrl.search = new URLSearchParams(searchString);
    console.log(requestUrl.href);
    return requestUrl.href;
  },
  cv() {}
};

module.exports = generateRabotaUaUrls;
