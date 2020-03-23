import React from "react";
import openNotification from "../../views/NotificationComponent";
import "react-phone-number-input/style.css";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { redirectFromSignInFunction } from "../../utils/userUtils";
import SignUp from "./SignUp";
import { signInUser, signUpUser } from "../../services/userService";

class SignUpContainer extends React.Component {
  state = { confirmDirty: false, loading: false };

  handleConfirmPasswordBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    !confirmDirty && this.setState({ confirmDirty: !!value });
  };

  signUpUserUtil = ({ signUpData, signInData, history }) => {
    this.setState({ loading: true });

    return signUpUser(signUpData)
      .then(response => {
        if (response.success) {
          openNotification({
            type: "success",
            message: "Регестрация успешна"
          });
          return true;
        }
        this.setState({ loading: false });
        openNotification({
          type: "error",
          message: "Ошибка",
          description: response.err
        });
        return false;
      })
      .then(result => (result ? signInUser(signInData) : Promise.reject()))
      .then(response => {
        const result =
          response && redirectFromSignInFunction({ response, history });
        this.setState({ loading: false });
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
        this.setState({ loading: false });
        error &&
          openNotification({
            type: "error",
            message: "Что-то пошло не так",
            description: "error"
          });
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;

    const onSuccess = async values => {
      const { history } = this.props;
      const {
        name: rawName,
        surname: rawSurname,
        email,
        password,
        phone
      } = values;

      const name = rawName && rawName.trim();
      const surname = rawSurname && rawSurname.trim();

      const signUpData = { name, surname, email, password, phone };
      const signInData = { email, password };

      await this.signUpUserUtil({ signUpData, signInData, history });
    };
    validateFields((err, values) => {
      err
        ? openNotification({
            type: "warning",
            message: "Заполните все обязательные поля",
            description: "Поля со звездочкой * обязательны для заполнения."
          })
        : onSuccess(values);
    });
  };

  compareToFirstPassword = ({ getFieldValue }) => ({
    validator(rule, value) {
      return !value || getFieldValue("password") === value
        ? Promise.resolve()
        : Promise.reject("Вы ввели разные пароли");
    }
  });

  validatePhoneNumber = {
    validator(rule, value) {
      return !value || isPossiblePhoneNumber(value)
        ? Promise.resolve()
        : Promise.reject("Вы ввели не корректный номер");
    }
  };

  render() {
    return (
      <SignUp
        compareToFirstPassword={this.compareToFirstPassword}
        validateToNextPassword={this.validateToNextPassword}
        handleSubmit={this.handleSubmit}
        handleConfirmPasswordBlur={this.handleConfirmPasswordBlur}
        validatePhoneNumber={this.validatePhoneNumber}
        loading={this.state.loading}
      />
    );
  }
}

export default SignUpContainer;
