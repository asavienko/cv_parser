import React, { useEffect } from "react";
import { Result, Row } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import clearCookieStorage from "../services/clearCookieStorage";
import { getRequest } from "../services/fetchUtils";

const StylePhone = styled.a`
  font-weight: bold;
  display: block;
`;
const EmailNotVerified = () => {
  useEffect(async () => {
    console.log(await getRequest("/users"));
  });
  return (
    <Result
      status="info"
      title="Еще один шаг до конца регестрации!"
      subTitle={
        <React.Fragment>
          Для окончания регестрации, необходимо позвонить по телефону:
          <StylePhone href="tel:123-456-7890">+38 099 123 4567</StylePhone>
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
