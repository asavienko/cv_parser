import React from "react";
import { Form } from "antd";
import openNotification from "../../views/NotificationComponent";
import "react-phone-number-input/style.css";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import { redirectFromSignInFunction } from "../../utils/userUtils";
import SignUp from "./SignUp";
import { signInUser, signUpUser } from "../../services/userService";

class SignUpContainer extends React.Component {
  state = { confirmDirty: false };

  handleConfirmPasswordBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    !confirmDirty && this.setState({ confirmDirty: !!value });
  };

  signUpUserUtil = ({ signUpData, signInData, history }) =>
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
      .then(result => (result ? signInUser(signInData) : Promise.reject()))
      .then(response => {
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

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    const { confirmDirty } = this.state;
    if (value && confirmDirty) {
      form.validateFields(["confirmPassword"], { force: true });
    }
    callback();
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      return callback("Вы ввели разные пароли");
    } else {
      return callback();
    }
  };

  validatePhoneNumber = (rule, value, callback) => {
    !value || isPossiblePhoneNumber(value)
      ? callback()
      : callback("Вы ввели не корректный номер");
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <SignUp
        compareToFirstPassword={this.compareToFirstPassword}
        validateToNextPassword={this.validateToNextPassword}
        handleSubmit={this.handleSubmit}
        getFieldDecorator={getFieldDecorator}
        handleConfirmPasswordBlur={this.handleConfirmPasswordBlur}
        validatePhoneNumber={this.validatePhoneNumber}
      />
    );
  }
}

export default Form.create({ name: "validate_new_user" })(SignUpContainer);
