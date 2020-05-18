import { postRequest } from "./fetchUtils";

const cvUrls = () => ({
  getTotalCv: "/total-cvs",
  getCvByRequest: "/cv/get-by-request",
  getCvInfo: "/cv/get-cv-info",
  getCvPage: "/cv/get-cv-page",
  cvList: "cv/list",
  updateCvList: "cv/update-list"
});

const getCvByRequest = body => postRequest(cvUrls().getCvByRequest, body);

const getCvInfo = id => postRequest(cvUrls().getCvInfo, { id });

const createCvList = data => postRequest(cvUrls().cvList, data);

// const getCvList = () => getRequest(cvUrls().cvList);
//
// const deleteCvList = id => deleteRequest(cvUrls(id).cvList);
//
// const updateCvList = data => postRequest(cvUrls().updateCvList, data);

export { getCvByRequest, getCvInfo, createCvList };
