import styled from "styled-components";
import { Button, Input, Select } from "antd";

export const ResponsiveInput = styled(Input)`
  @media (min-width: 992px) {
    border-radius: 0;
    border-right: 0;
    border-left: 0;
  }
`;

export const StyledButton = styled(Button)`
  @media (min-width: 992px) {
    border-radius: 0 4px 4px 0;
  }
`;

export const StyledResponsiveSelect = styled(Select)`
  width: 100%;

  @media (min-width: 992px) {
    .ant-select-selection {
      border-radius: 4px 0 0 4px;
    }
  }
`;
