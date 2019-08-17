import { SET_FAVORITE } from "../constants/constantsActions";

export function setFavoriteList(favoriteCvList) {
  return { type: SET_FAVORITE, favoriteCvList};
}
