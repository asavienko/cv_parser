import React from "react";
import { Result } from "antd";
import styled from "styled-components";

const StylePhone = styled.a`
  font-weight: bold;
  display: block;
`;
const EmailNotVerified = () => {
  return (
    <Result
      status="info"
      title="Еще один шаг до конца регестрации!"
      subTitle={
        <React.Fragment>
          Для окончания регестрации, необходимо позвонить по телефону:
          <StylePhone href="tel:123-456-7890">+38 099 123 4567</StylePhone>
          Или дождаться когда мы свяжемся с Вами самостоятельно.
        </React.Fragment>
      }
    />
  );
};

export default EmailNotVerified;
