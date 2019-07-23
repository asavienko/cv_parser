import React from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";


function TopMenu() {
  return (
    <Menu mode="horizontal" >
      <Menu.Item key="home">
        <Link to="/">Главная</Link>
      </Menu.Item>
      <Menu.Item key="favorites">
        <Link to="/favorites">Избранные</Link>
      </Menu.Item>
      <Menu.Item key="list">
        <Link to="/list">Список</Link>
      </Menu.Item>
    </Menu>
  );
}
export default TopMenu;
