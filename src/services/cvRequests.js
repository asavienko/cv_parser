import { getRequest, postRequest } from "./fetchUtils";

const cvUrls = () => ({
  getTotalCv: "/total-cvs",
  getCvByRequest: "cv/get-by-request",
  getCvInfo: "cv/get-cv-info",
  getCvPage: "cv/get-cv-page"
});

const getTotalCv = async ({ regionId: regionid, keywords }) => {
  const url = new URL(cvUrls.getTotalCv);
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

const getCvByRequest = body => postRequest(cvUrls().getCvByRequest, body);

const getCvInfo = id => postRequest(cvUrls().getCvInfo, { id });

// const getCvPage = id => postRequest(cvUrls().getCvPage, { id });

export { getTotalCv, getCvByRequest, getCvInfo };
