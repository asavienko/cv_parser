import {
  clearCookieStorage,
  getUserFromCookieStorage,
  updateUserInCookieStorage
} from "../services/cookieStorage";
import openNotification from "../components/ReusableComponents/Notification";
import {
  getCurrentUser,
  signInUser,
  signUpUser
} from "../services/userService";

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

export const signUpUserUtil = ({ signUpData, signInData, history }) =>
  signUpUser(signUpData)
    .then(response => {
      if (response.success) {
        openNotification({
          type: "success",
          message: "Регестрация успешна"
        });
        return true;
      }
      openNotification({
        type: "error",
        message: "Ошибка",
        description: response.err
      });
      return false;
    })
    .catch((error = {}) =>
      openNotification({
        type: "error",
        message: "Ошибка! Попробуйте снова",
        description: error.err
      })
    )
    .then(result => (result ? signInUser(signInData) : Promise.reject()))
    .then(response => {
      console.log(response);
      const result =
        response && redirectFromSignInFunction({ response, history });
      if (!result) {
        openNotification({
          type: "error",
          message: "Что-то пошло не так",
          description:
            "Попробуйте ввести E-mail и Пароль указанные при регестрации и нажать Войти"
        });
      }
    })
    .catch(error => {
      error &&
      openNotification({
        type: "error",
        message: "Что-то пошло не так",
        description: "error"
      });
    });
