import {
  clearCookieStorage,
  updateUserInCookieStorage
} from "../services/cookieStorage";
import openNotification from "../components/ReusableComponents/Notification";
import { getCurrentUser } from "../services/userService";

export const checkUser = () => {
  console.log("checkUser");
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
    .catch(err => {
      clearCookieStorage();
      openNotification({
        type: "error",
        message: "Что-то пошло не так.",
        description:
          "Если ошибка повторится, обратитесь к администратору. " +
          JSON.stringify(err)
      });
    });
};

export const redirectFromSignInFunction = ({ response, history }) => {
  if (!!response.token) {
    updateUserInCookieStorage(response);
    history.push(response.emailVerified ? "/" : "/email-not-verified");
    return true;
  }
};
