import { SET_FAVORITE } from "../constants/constantsActions";

export function setFavoriteList(favoriteList) {
  return { type: SET_FAVORITE, favoriteCvList: favoriteList };
}
