import {
  clearCookieStorage,
  getUserFromCookieStorage,
  updateUserInCookieStorage
} from "../services/cookieStorage";
import openNotification from "../views/NotificationComponent";
import { getCurrentUser } from "../services/userService";

export const checkUser = () => {
  const { token, _id } = getUserFromCookieStorage();
  token &&
    _id &&
    getCurrentUser()
      .then(response => {
        const [user] = response;
        return user
          ? updateUserInCookieStorage(user)
          : openNotification({
              message: "Не првильный пароль или email",
              description: "Введите данные повторно"
            });
      })
      .catch((err = {}) => {
        clearCookieStorage();
        openNotification({
          type: "error",
          message: "Что-то пошло не так.",
          description: `Если ошибка повторится, обратитесь к администратору. ${JSON.stringify(
            err
          )}`
        });
      });
};

export const redirectFromSignInFunction = ({ response, history }) => {
  if (!response.token) {
    return false;
  }

  updateUserInCookieStorage(response);
  history.push(response.emailVerified ? "/" : "/email-not-verified");
  return true;
};
