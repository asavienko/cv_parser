import { postRequest } from "./fetchUtils";

const cvUrls = () => ({
  getTotalCv: "/total-cvs",
  getCvByRequest: "cv/get-by-request",
  getCvInfo: "cv/get-cv-info",
  getCvPage: "cv/get-cv-page"
});

const getCvByRequest = body => postRequest(cvUrls().getCvByRequest, body);

const getCvInfo = id => postRequest(cvUrls().getCvInfo, { id });

export { getCvByRequest, getCvInfo };
