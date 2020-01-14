import React from "react";
import styled from "styled-components";
import { Input } from "antd";

const StylesForInput = styled(Input)`
  .ant-input-prefix {
    color: rgba(0, 0, 0, 0.25);
  }
`;

class StyledInput extends React.Component {
  render() {
    return <StylesForInput {...this.props} />;
  }
}

export default StyledInput;
