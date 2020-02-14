import { getRequest } from "./fetchUtils";

const getTotalCv = async ({ regionId: regionid, keywords }) => {
  const url = new URL("/total-cvs");
  url.search = new URLSearchParams({
    regionid,
    keywords,
    period: 7,
    searchtype: "everywhere",
    moveability: 0,
    sort: "date"
  });
  return await getRequest(url);
};

export { getTotalCv };
