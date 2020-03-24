import styled from "styled-components";
import { Menu } from "antd";

const { Item } = Menu;

export const StyledMenu = styled(Menu)`
  display: flex;
  line-height: 45px;
  ${({ show }) => show === "false" && "visibility: hidden"}
`;
export const HeaderLayer = styled.div`
  display: ${({ show }) => (show === "true" ? "none" : "block")};
  height: 46px;
  width: 100%;
  overflow: hidden;
  position: absolute;
  img:first-child {
    transform: translate(17%, -33%) rotate(48deg) scaleX(-1);
    height: 141px;
  }
  img:nth-child(2) {
    width: 101%;
    position: absolute;
    opacity: 0.53;
    left: 0;
    transform: translate(0, -50%);
  }
`;

export const StyledLink = styled(Item)`
  margin-left: auto;
  padding-right: 20px;
`;

export const employLogo = `${process.env.PUBLIC_URL}images/temporaryImages/employ_logo.svg`;
export const linesLayout = `${process.env.PUBLIC_URL}images/temporaryImages/lines_layout.png`;
