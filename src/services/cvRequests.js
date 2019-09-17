import { getRequest } from "./fetchUtils";

const getTotalCv = async ({ regionId: regionid, keywords }) => {
  const url = new URL("/parse-cvs");
  url.search = new URLSearchParams({
    regionid,
    keywords,
    period: 7,
    searchtype: "everywhere",
    moveability: 0,
    sort: "date"
  });

  await getRequest(url);
};

const getDictionaryCity = async () => await getRequest("/dictionary-city")

export {getTotalCv, getDictionaryCity};