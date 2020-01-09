import { Result } from "antd";
import React from "react";

const ShowResult = ({ status = "success", title, subTitle, buttonsArr }) => (
  <Result
    status={status}
    title={title}
    subTitle={subTitle}
    extra={buttonsArr}
  />
);

export default ShowResult;
