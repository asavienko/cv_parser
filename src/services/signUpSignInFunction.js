import openNotification from "../components/ReusableComponents/Notification";
import Cookies from "js-cookie";
import { postRequest } from "./fetchUtils";

const signUpSignInFunction = ({
  response = {},
  history = {},
  loginData = {}
}) => {
  const validToken = !!response.token;
  const signUpData = !!loginData.email && !!loginData.password;

  switch (true) {
    case validToken:
      Cookies.set("Access-Token", response.token);
      return history.push(response.emailVerified ? "/" : "/email-not-verified");
    case signUpData:
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
