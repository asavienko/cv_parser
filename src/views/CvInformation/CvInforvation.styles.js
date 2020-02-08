import styled from "styled-components";
import { Col, Drawer, Row, Timeline } from "antd";

export const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
  }
  .ant-drawer-content-wrapper {
    width: 50% !important;
  }
`;
export const StyledRow = styled(Row)`
  position: fixed;
  overflow: auto;
  padding: 24px;
  height: calc(100% - 108px);
`;
export const StyledFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 10px 16px;
  display: flex;
  justify-content: space-around;
`;

export const ColStyledSpeciality = styled(Col)`
  text-align: center;
  margin-top: 10px;
`;
export const StyledSalary = styled.span`
  color: RGBA(208, 208, 208, 1);
  white-space: nowrap;
`;
export const CenteredCol = styled(Col)`
  text-align: center;
`;
export const StyledTitle = styled.div`
  color: rgba(0, 0, 0, 0.85);
  font-size: 17px;
  font-weight: 500;
`;
export const StyledBlockTitle = styled.div`
  border-bottom: 1px solid #e9e9e9;
  width: 100%;
  margin-top: 10px;
  font-weight: 500;
  font-size: 18px;
`;
export const StyledDescrEl = styled.div`
  margin-top: 10px;
`;
export const StyledAdditionalInfo = styled.span`
  display: block;
  font-size: 12px;
  color: RGBA(208, 208, 208, 1);
`;
export const StyledTimeline = styled(Timeline)`
  margin-top: 10px;
`;
export const StyledDatesDiff = styled.span`
  white-space: nowrap;
`;
