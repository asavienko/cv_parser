import React from "react";
import styled from "styled-components";
import { Input } from "antd";

const StylesForInput = styled(Input)`
  .ant-input-prefix {
    color: rgba(0, 0, 0, 0.25);
  }
`;

const StyledInput = props => {
  return <StylesForInput {...props} />;
};

export default StyledInput;
