import { SET_USER_CREDENTIALS } from "../constants/constantsActions";

const initState = { emailVerified: false, token: false };

function userReducer(state = initState, action) {
  switch (action.type) {
    case SET_USER_CREDENTIALS:
      return {
        ...state,
        emailVerified: action.emailVerified,
        token: action.token
      };
    default:
      return { ...state };
  }
}

export default userReducer;
