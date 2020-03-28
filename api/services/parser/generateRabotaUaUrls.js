const serialize = obj => {
  const str = [];
  Object.entries(obj).map(([key, value]) => {
    if (value) {
      return str.push(`${key}=${value}`);
    }
  });
  return str.join("&");
};

const generateRabotaUaUrls = {
  defaultSearchListUrl: "https://rabota.ua/api/resume/search?",
  url:
    "https://rabota.ua/api/resume/search?period=6&searchtype=everywhere&sort=date&count=20",
  getCvListUrl({
    period = 6,
    searchtype = "default",
    sort = "date",
    ...restData
  }) {
    console.log(
      `${this.defaultSearchListUrl}${serialize({
        period,
        searchtype,
        sort,
        ...restData
      })}`
    );
    return `${this.defaultSearchListUrl}${serialize({
      period,
      searchtype,
      sort,
      ...restData
    })}`;
  },
  cv() {}
};

module.exports = generateRabotaUaUrls;
