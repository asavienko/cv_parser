import openNotification from "../components/ReusableComponents/Notification";
import { postRequest } from "./fetchUtils";
import { updateUserInCookieStorage } from "./cookieStorage";

const signUpSignInFunction = ({
  response = {},
  history = {},
  loginData = {}
}) => {
  const validToken = !!response.token;
  const hasSignUpData = !!loginData.email && !!loginData.password;

  if (validToken) {
    updateUserInCookieStorage(response);
    return history.push(response.emailVerified ? "/" : "/email-not-verified");
  }

  if (hasSignUpData) {
    return postRequest("/users/sign-in", loginData).then(response => {
      return signUpSignInFunction({ response, history });
    });
  }

  return openNotification({
    type: "error",
    message: "Неизвестная ошибка",
    description:
      "Произошла неизвстная ошибка, если ошибка повториться, обратитесь к администратору"
  });
};

export default signUpSignInFunction;
