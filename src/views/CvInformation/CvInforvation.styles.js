import styled from "styled-components";
import { Drawer, Spin } from "antd";

export const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
  }
  .ant-drawer-content-wrapper {
    width: 50% !important;
  }
`;

export const StyledSpin = styled(Spin)`
  height: 100vh !important;
  max-height: unset !important;
`;

export const StyledWrapper = styled.div`
  padding: 0 30px 30px;

  & #ctl00_centerZone_BriefResume1_CvView1_cvHeader_Breadcrumb1_breadcrumbs {
    display: none !important;
  }

  & .rua-p-t_13.rua-g-left {
    display: none !important;
  }
  & a.ga_print.rua-p-c-default.rua-b-none {
    display: none !important;
  }
  & .main-info {
    display: flex;
  }
  & .main-info div:nth-child(2) {
    padding-left: 40px !important;
  }
  & .rua-g-clearfix {
    padding-top: 0px !important;
  }
  & #ctl00_centerZone_BriefResume1_CvView1_cvHeader_plhNotLogged {
    display: none !important;
  }
  & .rua-g-right {
    display: none !important;
  }
`;
