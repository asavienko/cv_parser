import {
  SET_DICTIONARY_CITY,
  SET_SAVED,
  SET_FILTERS,
  SET_PAGINATION,
  SET_RAW_LIST,
  SET_CURRENT_SEARCH_ID
} from "../constants/constantsActions";
import { DEFAULT_FILTERS } from "../constants/filters";

const initState = {
  currentSearchId: "",
  savedCvLists: [],
  rawList: [],
  filters: { ...DEFAULT_FILTERS },
  pagination: {},
  dictionaryCity: []
};

function cvReducer(state = initState, action) {
  switch (action.type) {
    case SET_SAVED:
      return { ...state, savedCvLists: action.savedCvLists };
    case SET_RAW_LIST:
      return { ...state, rawList: action.rawList };
    case SET_FILTERS:
      return { ...state, filters: action.filters };
    case SET_DICTIONARY_CITY:
      return { ...state, dictionaryCity: action.dictionaryCity };
    case SET_PAGINATION:
      return { ...state, pagination: action.pagination };
    case SET_CURRENT_SEARCH_ID:
      return { ...state, currentSearchId: action.currentSearchId };
    default:
      return state;
  }
}

export default cvReducer;
