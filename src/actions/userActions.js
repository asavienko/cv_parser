import { SET_USER } from "../constants/constantsActions";

export function setUserAction(user) {
  return { type: SET_USER, user };
}
