import React from "react";
import ru from "react-phone-number-input/locale/ru";
import { Button, Form, Input, Spin } from "antd";
import PropTypes from "prop-types";
import {
  LETTERS_VALIDATION,
  PASSWORD_POLICY
} from "../../constants/validation";
import {
  buttonItemLayout,
  formItemLayout,
  StyledPhoneInput
} from "./SignUp.styles";

const SignUp = ({
  handleSubmit,
  compareToFirstPassword,
  handleConfirmPasswordBlur,
  validatePhoneNumber,
  loading
}) => {
  const [form] = Form.useForm();
  return (
    <Spin spinning={loading}>
      <Form onFinish={()=> handleSubmit(form)} {...formItemLayout} form={form}>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "Вы ввели не коректный email."
            },
            {
              required: true,
              message: "Пожалуйста введите Ваш E-mail!."
            },
            { max: 90, message: "Максимальная длина поля 90 символов." }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите пароль."
            },
            {
              pattern: PASSWORD_POLICY,
              message:
                "Ваш пароль должен содержать минимум 8 знаков включая: буквы верхнего и нижнего регистра, цифры. Все буквы латинского алфавита (Например: abcdefG8)."
            },
            { max: 90, message: "Максимальная длина поля 90 символов." }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Подтвердите пароль"
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Пожалуйста подтвердите пароль."
            },
            compareToFirstPassword
          ]}
        >
          <Input.Password onBlur={handleConfirmPasswordBlur} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Телефон"
          rules={[
            {
              required: true,
              message: "Пожалуйста введите ваш номер телефона."
            },
            validatePhoneNumber
          ]}
        >
          <StyledPhoneInput
            country="UA"
            labels={ru}
            placeholder="Ваш телефон"
          />
        </Form.Item>
        <Form.Item
          name="name"
          label="Имя"
          rules={[
            {
              pattern: LETTERS_VALIDATION,
              message: "Это поле может содержать только буквы.",
              transform: value => value && value.trim()
            },
            { max: 90, message: "Максимальная длина поля 90 символов." }
          ]}
        >
          <Input placeholder="Введите имя" />
        </Form.Item>
        <Form.Item
          name="surname"
          label="Фамилия"
          rules={[
            {
              pattern: LETTERS_VALIDATION,
              message: "Это поле может содержать только буквы",
              transform: value => value && value.trim()
            },
            { max: 90, message: "Максимальная длина поля 90 символов" }
          ]}
        >
          <Input placeholder="Введите фамилию" />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit" block>
            Подтвердить
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

SignUp.propTypes = {
  handleSubmit: PropTypes.func,
  compareToFirstPassword: PropTypes.func,
  handleConfirmPasswordBlur: PropTypes.func,
  validatePhoneNumber: PropTypes.objectOf(PropTypes.func),
  loading: PropTypes.bool
};
SignUp.defaultProps = {
  handleSubmit: () => {},
  compareToFirstPassword: () => {},
  handleConfirmPasswordBlur: () => {},
  validatePhoneNumber: {
    validator(rule, value) {
      return undefined;
    }
  },
  loading: false
};

export default SignUp;
