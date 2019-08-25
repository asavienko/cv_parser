import { SET_FAVORITE, SET_RAW_LIST } from "../constants/constantsActions";

export function setFavoriteListAction(favoriteCvList) {
  return { type: SET_FAVORITE, favoriteCvList };
}
export function setRawListAction(rawList) {
  return { type: SET_RAW_LIST, rawList };
}
