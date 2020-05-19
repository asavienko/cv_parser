import {
  SET_DICTIONARY_CITY,
  SET_SAVED,
  SET_FILTERS,
  SET_PAGINATION,
  SET_RAW_LIST,
  SET_CURRENT_SEARCH_ID
} from "../constants/constantsActions";
import { DEFAULT_FILTERS } from "../constants/filters";

export function setSavedListAction(savedCvLists) {
  return { type: SET_SAVED, savedCvLists };
}
export function setRawListAction(rawList = []) {
  return { type: SET_RAW_LIST, rawList };
}

export function setDictionaryCityAction(dictionaryCity = []) {
  return { type: SET_DICTIONARY_CITY, dictionaryCity };
}
export function setFiltersAction(filters = DEFAULT_FILTERS) {
  return { type: SET_FILTERS, filters };
}

export function setPaginationAction(pagination) {
  return { type: SET_PAGINATION, pagination };
}
export function setCurrentSearchId(currentSearchId) {
  return { type: SET_CURRENT_SEARCH_ID, currentSearchId };
}
