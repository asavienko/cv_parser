import React from "react";
import { Button, Form, Input } from "antd";
import { PASSWORD_POLICY } from "../../constants/validation";

import "react-phone-number-input/style.css";
import ru from "react-phone-number-input/locale/ru";
import StyledPhoneInput from "./StyledPhoneInput";
import { isPossiblePhoneNumber } from "react-phone-number-input";

class SignUp extends React.Component {
  state = { confirmDirty: false };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      err
        ? console.log("error", values)
        : console.log("Received values of form: ", values);
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Вы ввели разные пароли");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  validatePhoneNumber = (rule, value, callback) => {
    value
      ? isPossiblePhoneNumber(value)
        ? callback()
        : callback("Вы ввели не корректный номер")
      : callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "Вы ввели не коректный email"
              },
              {
                required: true,
                message: "Пожалуйста введите Ваш E-mail!"
              }
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
                validator: this.validateToNextPassword
              },
              {
                pattern: PASSWORD_POLICY,
                message:
                  "Ваш пароль должен содержать минимум 8 знаков включая: буквы верхнего и нижнего регистра, цифры. Все буквы латинского алфавита (Например: abcdefG8)"
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Подтвердите пароль" hasFeedback>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Пожалуйста подтвердите пароль"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator("phone", {
            rules: [
              {
                required: true,
                message: "Пожалуйста введите ваш номер телефона"
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "validate_new_user" })(SignUp);
