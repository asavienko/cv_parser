import { SET_FAVORITE, SET_RAW_LIST } from "../constants/constantsActions";

const initState = {
  favoriteCvList: [],
  rawList: []
};

function cvReducer(state = initState, action) {
  switch (action.type) {
    case SET_FAVORITE:
      return { ...state, favoriteCvList: action.favoriteCvList };
    case SET_RAW_LIST:
      return { ...state, rawList: action.rawList };
    default:
      return state;
  }
}

export default cvReducer;
