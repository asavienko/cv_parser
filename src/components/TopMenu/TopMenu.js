import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledMenu = styled(Menu)`
  line-height: 45px;
`;

function TopMenu() {
  return (
    <StyledMenu mode="horizontal">
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
  );
}
export default TopMenu;
