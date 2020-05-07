import styled from "styled-components";
import { Select } from "antd";

export const StyledResponsiveSelect = styled(Select)`
  width: 100%;

  @media (min-width: 992px) {
    .ant-select-selection {
      border-radius: 4px 0 0 4px;
    }
  }
`;
