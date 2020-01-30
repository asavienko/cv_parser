import { SET_USER } from "../constants/constantsActions";

const initState = { user: {} };

function userReducer(state = initState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user
      };
    default:
      return { ...state };
  }
}

export default userReducer;
