import styled from "styled-components";
import { Input, Select } from "antd";

const { Search } = Input;

export const StyledSelect = styled(Select)`
  width: 200px;
`;

export const StyledSearch = styled(Search)`
  padding: 15px;
`;

export const StyledResponsiveSelect = styled(Select)`
  width: 100%;
`;

/*export const StyledOption = styled(Option)`
  white-space: initial !important;
`;*/
