import React from "react";
import { Result } from "antd";

const EmailNotVerified = () => {
  return (
    <Result
      status="info"
      title="Еще один шаг до конца регестрации"
      subTitle="Для того чтобы окончить регестрацию, необходимо связаться по номеру телефона: +38 099 123 4567. Или дождаться когда мы свяжемся с Вами."
    />
  );
};

export default EmailNotVerified;
