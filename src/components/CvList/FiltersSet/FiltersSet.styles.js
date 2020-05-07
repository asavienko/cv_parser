import styled from "styled-components";
import {Col, Divider, Popover} from "antd";


export const StyledDivider = styled(Divider)`
  height: 34px;
`;



export const StyledPopover = styled(Popover)`
  pointer-events: ${({ disabled }) => (disabled ? `none` : `unset`)};
`;

export const StyledCol = styled(Col)`
  cursor: ${({ disabled }) => (disabled ? `not-allowed` : `unset`)};
`;
