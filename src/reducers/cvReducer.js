import {
  SET_DICTIONARY_CITY,
  SET_FAVORITE,
  SET_RAW_LIST
} from "../constants/constantsActions";

const initState = {
  favoriteCvList: [],
  rawList: [],
  rawListTotal: 0,
  dictionaryCity: []
};

function cvReducer(state = initState, action) {
  switch (action.type) {
    case SET_FAVORITE:
      return { ...state, favoriteCvList: action.favoriteCvList };
    case SET_RAW_LIST:
      return { ...state, rawList: action.rawList };
    case SET_DICTIONARY_CITY:
      return { ...state, dictionaryCity: action.dictionaryCity };
    default:
      return state;
  }
}

export default cvReducer;
