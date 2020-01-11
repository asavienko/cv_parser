import React from "react";
import { Button, Checkbox, Form, Icon, Input, Row } from "antd";
import openNotification from "../ReusableComponents/Notification";
import { PASSWORD_POLICY } from "../../constants/validation";

const formItemLayout = {
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 16, offset: 4 },
    md: { span: 12, offset: 6 },
    lg: { span: 8, offset: 8 },
    xl: { span: 6, offset: 9 },
    xxl: { span: 4, offset: 10 }
  }
};

class SignIn extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;

    const onSuccess = values => {
      console.log(values);
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
  validateEmail = (rule, value, callback) => {};
  validatePassword = (rule, value, callback) => {
    rule ? callback() : callback("Test");
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { history } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout}>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Пожалуйста введите Ваш email" }]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="email"
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "Пожалуйста введита Ваш пароль" },
              { pattern: PASSWORD_POLICY },
              { validator: this.validatePassword }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Пароль"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Row type="flex" justify="space-between">
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Запомнить меня</Checkbox>)}
            <a className="login-form-forgot" href="">
              Забыл пароль
            </a>
          </Row>
          <Button type="primary" htmlType="submit" block>
            Войти
          </Button>

          <Row>
            Или{" "}
            <a onClick={() => this.history.push("/sign-up")}>
              зарегестрироваться сейчас!
            </a>
          </Row>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "sign_in_form" })(SignIn);
