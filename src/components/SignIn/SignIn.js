import React from "react";
import { Button, Form, Icon, Row, Spin } from "antd";
import { PASSWORD_POLICY } from "../../constants/validation";
import { Link } from "react-router-dom";
import { StyledInput } from "../../styles";
import openNotification from "../../views/NotificationComponent";
import { redirectFromSignInFunction } from "../../utils/userUtils";
import { signInUser } from "../../services/userService";
import { formLayout } from "./SignIn.styles";

class SignIn extends React.Component {
  state = { loading: false };
  handleSubmit = e => {
    e.preventDefault();

    const {
      history,
      form: { validateFields }
    } = this.props;

    const signInFunction = dataToSend => {
      this.setState({ loading: true });
      signInUser(dataToSend)
        .then(response => {
          const result = redirectFromSignInFunction({ response, history });
          if (!result) {
            openNotification({
              type: "error",
              message: "Пароль и email не совпадают.",
              description: "Пожалуйсто проверьте данные и введите их еще раз"
            });
          }
          this.setState({ loading: false });
        })
        .catch((error = {}) => {
          this.setState({ loading: false });
          openNotification({
            type: "error",
            message: "Что-то пошло не так",
            description: error.err
          });
        });
    };

    validateFields((err, values) => {
      !err && signInFunction(values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Spin spinning={this.state.loading}>
        <Form onSubmit={this.handleSubmit} {...formLayout}>
          <Form.Item>
            {getFieldDecorator("email", {
              validate: [
                {
                  trigger: "onBlur",
                  rules: [
                    {
                      type: "email",
                      message: "Вы ввели не коректный email."
                    },
                    { required: true, message: "Пожалуйста введите Ваш email" }
                  ]
                }
              ]
            })(
              <StyledInput prefix={<Icon type="mail" />} placeholder="Email" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              validate: [
                {
                  trigger: "onBlur",
                  rules: [
                    {
                      pattern: PASSWORD_POLICY,
                      message:
                        "Пароль должен содержать минимум 8 знаков включая: буквы верхнего и нижнего регистра, цифры. Все буквы латинского алфавита (Например: abcdefG8)."
                    },
                    {
                      required: true,
                      message: "Пожалуйста введита Ваш пароль"
                    }
                  ]
                }
              ]
            })(
              <StyledInput
                prefix={<Icon type="lock" />}
                type="password"
                placeholder="Пароль"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Войти
            </Button>
            <Row type="flex" justify="space-between">
              <Link to="/">Забыл пароль</Link>
              <Link to="/sign-up">Регистрация!</Link>
            </Row>
          </Form.Item>
        </Form>
      </Spin>
    );
  }
}

export default Form.create({ name: "sign_in_form" })(SignIn);
