import { getRequest, postRequest } from './fetchUtils';

const cvUrls = () => ({
  getTotalCv: '/total-cvs',
  getCvByRequest: 'cv/get-by-request',
});

const getTotalCv = async ({ regionId: regionid, keywords }) => {
  const url = new URL(cvUrls.getTotalCv);
  url.search = new URLSearchParams({
    regionid,
    keywords,
    period: 7,
    searchtype: 'everywhere',
    moveability: 0,
    sort: 'date',
  });
  return await getRequest(url);
};

const getCvByRequest = (body = { skip: '5', options: { request: 'abc' } }) => postRequest(cvUrls().getCvByRequest, body);

export { getTotalCv, getCvByRequest };
