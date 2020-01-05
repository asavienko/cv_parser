import React from "react";
import { Button, Form, Input } from "antd";
import openNotification from "../ReusableComponents/Notification";
import {
  LETTERS_VALIDATION,
  PASSWORD_POLICY
} from "../../constants/validation";

import "react-phone-number-input/style.css";
import ru from "react-phone-number-input/locale/ru";
import StyledPhoneInput from "./StyledPhoneInput";
import { isPossiblePhoneNumber } from "react-phone-number-input";

const formItemLayout = {
  labelCol: { sm: { span: 7 }, md: { span: 6 }, xxl: { span: 2, offset: 7 } },
  wrapperCol: { sm: { span: 15 }, md: { span: 13 }, xxl: { span: 6 } }
};
const buttonItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 15, offset: 7 },
    md: { span: 13, offset: 6 },
    xxl: { span: 6, offset: 9 }
  }
};

class SignUp extends React.Component {
  state = { confirmDirty: false };

  handleConfirmPasswordBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    !confirmDirty && this.setState({ confirmDirty: !!value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;

    const onSuccess = values => {
      const {
        name: rawName,
        surname: rawSurname,
        email,
        password,
        phone
      } = values;

      const name = rawName && rawName.trim();
      const surname = rawSurname && rawSurname.trim();

      console.log("Dispatch data: ", { name, surname, email, password, phone });
    };
    validateFields((err, values) => {
      err
        ? openNotification({
            type: "error",
            message: `Поля со звездочкой * обязательны для заполнения.`
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
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="E-mail" {...formItemLayout}>
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "Вы ввели не коректный email."
              },
              {
                required: true,
                message: "Пожалуйста введите Ваш E-mail!."
              },
              { max: 90, message: "Максимальная длина поля 90 символов." }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Пароль" hasFeedback {...formItemLayout}>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Пожалуйста, введите пароль."
              },
              {
                validator: this.validateToNextPassword
              },
              {
                pattern: PASSWORD_POLICY,
                message:
                  "Ваш пароль должен содержать минимум 8 знаков включая: буквы верхнего и нижнего регистра, цифры. Все буквы латинского алфавита (Например: abcdefG8)."
              },
              { max: 90, message: "Максимальная длина поля 90 символов." }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Подтвердите пароль" hasFeedback {...formItemLayout}>
          {getFieldDecorator("confirmPassword", {
            rules: [
              {
                required: true,
                message: "Пожалуйста подтвердите пароль."
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmPasswordBlur} />)}
        </Form.Item>
        <Form.Item label="Телефон" {...formItemLayout}>
          {getFieldDecorator("phone", {
            rules: [
              {
                required: true,
                message: "Пожалуйста введите ваш номер телефона."
              },
              {
                validator: this.validatePhoneNumber
              }
            ]
          })(
            <StyledPhoneInput
              country="UA"
              labels={ru}
              placeholder="Ваш телефон"
            />
          )}
        </Form.Item>
        <Form.Item label="Имя" {...formItemLayout}>
          {getFieldDecorator("name", {
            rules: [
              {
                pattern: LETTERS_VALIDATION,
                message: "Это поле может содержать только буквы.",
                transform: value => value && value.trim()
              },
              { max: 90, message: "Максимальная длина поля 90 символов." }
            ]
          })(<Input placeholder="Введите имя" />)}
        </Form.Item>
        <Form.Item label="Фамилия" {...formItemLayout}>
          {getFieldDecorator("surname", {
            rules: [
              {
                pattern: LETTERS_VALIDATION,
                message: "Это поле может содержать только буквы",
                transform: value => value && value.trim()
              },
              { max: 90, message: "Максимальная длина поля 90 символов" }
            ]
          })(<Input placeholder="Введите фамилию" />)}
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit" block>
            Подтвердить
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "validate_new_user" })(SignUp);