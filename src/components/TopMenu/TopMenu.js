import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import styled from "styled-components";
import { withRouter } from "react-router";
import { clearCookieStorage } from "../../services/cookieStorage";
import { Link } from "react-router-dom";

const employ_logo =
  process.env.PUBLIC_URL + "images/temporaryImages/employ_logo.svg";
const lines_layout =
  process.env.PUBLIC_URL + "images/temporaryImages/lines_layout.png";

const { Item } = Menu;

const StyledMenu = styled(Menu)`
  display: flex;
  line-height: 45px;
  ${({ show }) => show === "false" && `visibility: hidden`}
`;
const HeaderLayer = styled.div`
  display: ${({ show }) => (show === "true" ? `none` : `block`)};
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

const StyledLink = styled(Item)`
  margin-left: auto;
  padding-right: 20px;
`;

function TopMenu({ location: { pathname } }) {
  const [StateShowMenu, setStateRenderHeader] = useState("true");
  useEffect(() => {
    switch (pathname) {
      case "/sign-up":
        return setStateRenderHeader("false");
      case "/sign-in":
        return setStateRenderHeader("false");
      case "/email-not-verified":
        return setStateRenderHeader("false");
      default:
        return setStateRenderHeader("true");
    }
  }, [pathname]);
  return (
    <React.Fragment>
      <HeaderLayer show={StateShowMenu}>
        <img src={employ_logo} alt="logo" />
        <img src={lines_layout} alt="logo_layout" />
      </HeaderLayer>
      <StyledMenu mode="horizontal" show={StateShowMenu}>
        <Item key="home">
          <Link to="/">Главная</Link>
        </Item>
        <Item key="favorites">
          <Link to="/favorites">Избранные</Link>
        </Item>
        <Item key="list">
          <Link to="/list">Список</Link>
        </Item>
        <StyledLink key="logout">
          <Link to="/sign-in" onClick={clearCookieStorage}>
            Выйти
          </Link>
        </StyledLink>
      </StyledMenu>
    </React.Fragment>
  );
}

export default withRouter(TopMenu);
