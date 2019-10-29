import { getRequest } from "./fetchUtils";
const pkg = require("../../package.json");
const target = process.env.PROXY || "http://localhost:5000";

const getTotalCv = async ({ regionId: regionid, keywords }) => {
  const url = new URL("/total-cvs", target);
  url.search = new URLSearchParams({
    regionid,
    keywords,
    period: 7,
    searchtype: "everywhere",
    moveability: 0,
    sort: "date"
  });
  console.log(url);
  return await getRequest(url);
};

const getDictionaryCity = async () => await getRequest("/dictionary-city");

export { getTotalCv, getDictionaryCity };
