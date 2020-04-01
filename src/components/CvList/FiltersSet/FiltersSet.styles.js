import styled from "styled-components";
import { Input, Form, Drawer } from "antd";

export const SalaryInput = styled(Input)`
  width: 80px;
`;

export const StyledAge = styled(Input)`
  width: 40px;
`;

export const InlineFormItem = styled(Form.Item)`
  display: inline-block;
  margin-right: 0 !important;
`;

export const WrapperFormItem = styled(Form.Item)`
  margin-left: 10%;
`;

export const StyledSpan = styled.span`
  display: inline-block;
  text-align: center;
  line-height: 2;
  font-weight: 700;
  color: #d9d9d9;
`;

export const StyledDrawer = styled(Drawer)`
  position: absolute;
  .ant-drawer-body {
    padding: 8px 0 0 0;
  }
  .ant-drawer-mask {
    display: none;
  }

  top: ${({ visible }) => (visible ? "-8px" : 0)};
`;
