import React from "react";
import { Button, Checkbox, Form, Icon, Row } from "antd";
import { PASSWORD_POLICY } from "../../constants/validation";
import { Link } from "react-router-dom";
import StyledInput from "../ReusableComponents/StyledInput";

const formLayout = {
  wrapperCol: {
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
      !err && onSuccess(values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
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
          })(<StyledInput prefix={<Icon type="mail" />} placeholder="Email" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            validate: [
              {
                trigger: "onBlur",
                rules: [
                  {
                    pattern: PASSWORD_POLICY,
                    message: "Вы ввели не верный пороль "
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
          <Row type="flex" justify="space-between">
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Запомнить меня</Checkbox>)}
            <Link to="/">Забыл пароль</Link>
          </Row>
          <Button type="primary" htmlType="submit" block>
            Войти
          </Button>
          <Row>
            Или <Link to="/sign-up">зарегестрироваться сейчас!</Link>
          </Row>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: "sign_in_form" })(SignIn);
