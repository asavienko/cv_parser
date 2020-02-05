import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { clearCookieStorage } from "../../services/cookieStorage";
import { Link } from "react-router-dom";
import {
  employ_logo,
  HeaderLayer,
  lines_layout,
  StyledLink,
  StyledMenu
} from "./TopMenu.styles";

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
