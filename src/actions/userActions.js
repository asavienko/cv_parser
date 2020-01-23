import { SET_USER_CREDENTIALS } from "../constants/constantsActions";

export function setUserCredentials(credentials) {
  return { type: SET_USER_CREDENTIALS, credentials };
}
