import openNotification from "../components/ReusableComponents/Notification";
import Cookies from "js-cookie";
import { postRequest } from "./fetchUtils";

const signUpSignInFunction = ({
  response = {},
  history = {},
  loginData = {}
}) => {
  const validToken = !!response.token;
  const hasSignUpData = !!loginData.email && !!loginData.password;

  if (validToken) {
    Cookies.set("Access-Token", response.token);
    return history.push(response.emailVerified ? "/" : "/email-not-verified");
  }

  if (hasSignUpData) {
    return postRequest("/users/sign-in", { body: loginData }).then(response => {
      console.log(response);
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
