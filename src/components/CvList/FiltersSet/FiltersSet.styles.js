import styled from "styled-components";
import { Button, Col, Divider, InputNumber, Popover, Radio } from "antd";

export const SalaryInput = styled(InputNumber)`
  width: 90px;
`;

export const AgeInput = styled(InputNumber)`
  width: 60px;
`;

export const StyledDividerSpan = styled.span`
  display: inline-block;
  text-align: center;
  line-height: 2;
  font-weight: 700;
  color: #d9d9d9;
`;

export const StyledRadio = styled(Radio)`
  display: block;
  margin: 8px 8px 14px 8px;
`;

export const StyledDivider = styled(Divider)`
  height: 34px;
`;

export const StyledExpander = styled.a`
  line-height: 2;
`;
export const StyledPopoverContent = styled.div`
  text-align: center;
`;

export const StyledPopover = styled(Popover)`
  pointer-events: ${({ disabled }) => (disabled ? `none` : `unset`)};
`;

export const StyledCol = styled(Col)`
  cursor: ${({ disabled }) => (disabled ? `not-allowed` : `unset`)};
`;
