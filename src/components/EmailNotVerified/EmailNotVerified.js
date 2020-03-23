import React from "react";
import { Result, Row } from "antd";
import { Link } from "react-router-dom";
import { clearCookieStorage } from "../../services/cookieStorage";
import { StyledPhone } from "./EmailNotVerified.styles";

const EmailNotVerified = () => {
  return (
    <Result
      status="info"
      title="Еще один шаг до конца регестрации!"
      subTitle={
        <React.Fragment>
          Для окончания регестрации, необходимо позвонить по телефону:
          <StyledPhone href="tel:123-456-7890">+38 099 123 4567</StyledPhone>
          Или дождаться когда мы свяжемся с Вами самостоятельно.
          <Row>
            <Link to="/sign-in" onClick={clearCookieStorage}>
              Выйти
            </Link>
          </Row>
        </React.Fragment>
      }
    />
  );
};

export default EmailNotVerified;
