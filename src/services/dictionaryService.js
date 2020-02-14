import { getRequest } from "./fetchUtils";

const dictionaryUrls = () => ({
  getCityDictionary: "/dictionaries/cities"
});

export const getCityDictionary = () =>
  getRequest(dictionaryUrls().getCityDictionary);
