import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withRouter } from "react-router";
import employ_logo from "../../images/employ_logo.svg";
import lines_layout from "../../images/lines_layout.png";

const StyledMenu = styled(Menu)`
  line-height: 45px;
  ${({ show }) => show === "false" && `visibility: hidden;`}
`;
const HeaderLayer = styled.div`
  display: none;
  height: 46px;
  width: 100%;
  overflow: hidden;
  position: absolute;
  ${({ show }) => show === "false" && `display: block;`}
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
function TopMenu({ location: { pathname } }) {
  const [renderHeaderState, setStateRenderHeader] = useState("true");
  useEffect(() => {
    switch (pathname) {
      case "/sign-up":
        setStateRenderHeader("false");
        break;
      default:
        setStateRenderHeader("true");
    }
  }, [pathname]);
  console.log(renderHeaderState);
  return (
    <React.Fragment>
      <HeaderLayer show={renderHeaderState}>
        <img src={employ_logo} />
        <img src={lines_layout} />
      </HeaderLayer>
      <StyledMenu mode="horizontal" show={renderHeaderState}>
        <Menu.Item key="home">
          <Link to="/">Главная</Link>
        </Menu.Item>
        <Menu.Item key="favorites">
          <Link to="/favorites">Избранные</Link>
        </Menu.Item>
        <Menu.Item key="list">
          <Link to="/list">Список</Link>
        </Menu.Item>
      </StyledMenu>
    </React.Fragment>
  );
}

export default withRouter(TopMenu);
