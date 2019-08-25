import { SET_FAVORITE } from "../constants/constantsActions";

const initState = {
  favoriteCvList: []
};

function cvReducer(state = initState, action) {
  switch (action.type) {
    case SET_FAVORITE:
      return { ...state, favoriteCvList: action.favoriteCvList };
    default:
      return state;
  }
}

export default cvReducer;
