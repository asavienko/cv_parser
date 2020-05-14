import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import {
  LogoutOutlined,
  SaveOutlined,
  SearchOutlined,
  HomeOutlined
} from "@ant-design/icons/lib/icons";
import { clearCookieStorage } from "../../services/cookieStorage";
import {
  employLogo,
  HeaderLayer,
  linesLayout,
  StyledMenuItem,
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
            Главная
          </Link>
        </Item>
        <Item key="/saved">
          <Link to="/saved">
            <SaveOutlined />
            Сохраненные
          </Link>
        </Item>
        <Item key="/list">
          <Link to="/list">
            <SearchOutlined />
            Список
          </Link>
        </Item>
        <StyledMenuItem
          key="/sign-in"
          icon={<LogoutOutlined />}
          onClick={clearCookieStorage}
        >
          <Link to="/sign-in">Выйти</Link>
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}

export default TopMenu;
