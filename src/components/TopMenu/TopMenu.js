import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import PropTypes from "prop-types";
import SaveOutlined from "@ant-design/icons/lib/icons/SaveOutlined";
import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import LogoutOutlined from "@ant-design/icons/lib/icons/LogoutOutlined";
import { clearCookieStorage } from "../../services/cookieStorage";
import {
  employLogo,
  HeaderLayer,
  linesLayout,
  StyledLink,
  StyledMenu
} from "./TopMenu.styles";

const { Item } = Menu;

function TopMenu() {
  const [StateShowMenu, setStateRenderHeader] = useState("true");
  const [selectedKeys, setSelectedKeys] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    setSelectedKeys([pathname]);
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
      <StyledMenu
        mode="horizontal"
        show={StateShowMenu}
        selectedKeys={selectedKeys}
      >
        <Item key="/">
          <Link to="/">
            <HomeOutlined />
            {"  "}
            Главная
          </Link>
        </Item>
        <Item key="/saved">
          <Link to="/saved">
            <SaveOutlined />
            {"  "}
            Сохраненные
          </Link>
        </Item>
        <Item key="/list">
          <Link to="/list">
            <SearchOutlined />
            {"  "}
            Список
          </Link>
        </Item>
        <StyledLink key="/sign-in">
          <Link to="/sign-in" onClick={clearCookieStorage}>
            Выйти
            {"  "}
            <LogoutOutlined />
          </Link>
        </StyledLink>
      </StyledMenu>
    </>
  );
}

TopMenu.propTypes = { location: PropTypes.objectOf(PropTypes.string) };

TopMenu.defaultProps = { location: { pathName: "/" } };

export default TopMenu;
