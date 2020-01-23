import openNotification from "../components/ReusableComponents/Notification";
import Cookies from "js-cookie";
import { postRequest } from "./fetchUtils";

const signUpSignInFunction = ({ response, history, loginData = {} }) => {
  const isError = response && "err" in response;
  const isEmailVerifiedFalse =
    response && response.token && response.emailVerified === false;
  const isEmailVerifiedTrue =
    response && response.token && response.emailVerified === true;
  const isSignUpSuccess =
    response &&
    response.success &&
    "email" in loginData &&
    "password" in loginData;

  switch (true) {
    case isError:
      return openNotification({
        type: "error",
        message: "Ошибка",
        description: response.err
      });
    case isEmailVerifiedFalse:
      Cookies.set("Access-Token", response.token);
      Cookies.set("emailVerified", response.emailVerified);
      return history.push("/email-not-verified");
    case isEmailVerifiedTrue:
      Cookies.set("Access-Token", response.token);
      Cookies.set("emailVerified", response.emailVerified);
      return history.push("/");
    case isSignUpSuccess:
      openNotification({
        type: "success",
        message: "Регестрация успешна",
        description: `Пользователь с email ${loginData.email} успешно создан`
      });
      return postRequest("/users/sign-in", loginData).then(response =>
        signUpSignInFunction({ response, history })
      );
    default:
      return openNotification({
        type: "error",
        message: "Неизвестная ошибка",
        description:
          "Произошла неизвстная ошибка, если ошибка повториться, обратитесь к администратору"
      });
  }
};

export default signUpSignInFunction;
