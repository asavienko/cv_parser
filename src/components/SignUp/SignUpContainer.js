import React from "react";
import "react-phone-number-input/style.css";
import PropTypes from "prop-types";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { redirectFromSignInFunction } from "../../utils/userUtils";
import SignUp from "./SignUp";
import { signInUser, signUpUser } from "../../services/userService";

import openNotification from "../../views/NotificationComponent";

class SignUpContainer extends React.Component {
  state = { confirmDirty: false, loading: false };

  form = React.createRef();

  validatePhoneNumber = {
    validator(rule, value) {
      !value || isPossiblePhoneNumber(value)
        ? Promise.resolve()
        : Promise.reject(Error("Вы ввели не корректный номер"));
    }
  };

  compareToFirstPassword = ({ getFieldValue }) => ({
    validator(rule, value) {
      !value || getFieldValue("password") === value
        ? Promise.resolve()
        : Promise.reject(Error("Вы ввели разные пароли"));
    }
  });

  handleSubmit = ({ validateFields }) => {
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
    validateFields()
      .then(values => onSuccess(values))
      .catch(() =>
        openNotification({
          type: "warning",
          message: "Заполните все обязательные поля",
          description: "Поля со звездочкой * обязательны для заполнения."
        })
      );
  };

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

  render() {
    const { loading } = this.state;
    return (
      <SignUp
        compareToFirstPassword={this.compareToFirstPassword}
        handleSubmit={this.handleSubmit}
        handleConfirmPasswordBlur={this.handleConfirmPasswordBlur}
        validatePhoneNumber={this.validatePhoneNumber}
        loading={loading}
      />
    );
  }
}

SignUpContainer.propTypes = { history: PropTypes.objectOf(PropTypes.any) };

SignUpContainer.defaultProps = { history: {} };

export default SignUpContainer;
