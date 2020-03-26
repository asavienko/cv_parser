const serialize = obj => {
  const str = [];
  for (const key in obj)
    if (obj.hasOwnProperty(key)) {
      str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    }
  return str.join("&");
};

const generateRabotaUaUrls = {
  defaultListUrl: "https://rabota.ua/api/resume/search?",
  url:
    "https://rabota.ua/api/resume/search?period=6&searchtype=everywhere&sort=date&count=20",
  getCvListUrl({ period = 6, searchType = "default", sort = "date" }) {
    return `${this.defaultListUrl}${serialize({ period, searchType })}`;
  },
  cv() {}
};

module.exports = generateRabotaUaUrls;
