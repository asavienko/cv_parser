import React from "react";
import ru from "react-phone-number-input/locale/ru";
import {
  LETTERS_VALIDATION,
  PASSWORD_POLICY
} from "../../constants/validation";
import { Button, Form, Input } from "antd";
import {
  buttonItemLayout,
  formItemLayout,
  StyledPhoneInput
} from "./SignUp.styles";

const SignUp = ({
  getFieldDecorator,
  handleSubmit,
  validateToNextPassword,
  compareToFirstPassword,
  handleConfirmPasswordBlur,
  validatePhoneNumber
}) => (
  <Form onSubmit={handleSubmit} {...formItemLayout}>
    <Form.Item label="E-mail">
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
    <Form.Item label="Пароль" hasFeedback>
      {getFieldDecorator("password", {
        rules: [
          {
            required: true,
            message: "Пожалуйста, введите пароль."
          },
          {
            validator: validateToNextPassword
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
    <Form.Item label="Подтвердите пароль" hasFeedback>
      {getFieldDecorator("confirmPassword", {
        rules: [
          {
            required: true,
            message: "Пожалуйста подтвердите пароль."
          },
          {
            validator: compareToFirstPassword
          }
        ]
      })(<Input.Password onBlur={handleConfirmPasswordBlur} />)}
    </Form.Item>
    <Form.Item label="Телефон">
      {getFieldDecorator("phone", {
        rules: [
          {
            required: true,
            message: "Пожалуйста введите ваш номер телефона."
          },
          {
            validator: validatePhoneNumber
          }
        ]
      })(
        <StyledPhoneInput country="UA" labels={ru} placeholder="Ваш телефон" />
      )}
    </Form.Item>
    <Form.Item label="Имя">
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
    <Form.Item label="Фамилия">
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

export default SignUp;
