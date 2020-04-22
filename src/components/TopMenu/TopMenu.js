import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import PropTypes from "prop-types";
import { clearCookieStorage } from "../../services/cookieStorage";
import {
  employLogo,
  HeaderLayer,
  linesLayout,
  StyledLink,
  StyledMenu
} from "./TopMenu.styles";

const { Item } = Menu;

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
    <>
      <HeaderLayer show={StateShowMenu}>
        <img src={employLogo} alt="logo" />
        <img src={linesLayout} alt="logo_layout" />
      </HeaderLayer>
      <StyledMenu mode="horizontal" show={StateShowMenu}>
        <Item key="home">
          <Link to="/">Главная</Link>
        </Item>
        <Item key="favorites">
          <Link to="/favorites">Сохраненные</Link>
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
    </>
  );
}

TopMenu.propTypes = { location: PropTypes.objectOf(PropTypes.string) };

TopMenu.defaultProps = { location: { pathName: "/" } };

export default withRouter(TopMenu);
