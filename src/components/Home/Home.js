import {
  ResponsiveInput,
  StyledButton,
  StyledOptionDiv,
  StyledResponsiveSelect
} from "./Home.styles";
import React from "react";
import { Button, Col, Input, Row, Select } from "antd";

const Home = ({
  onSearchPressed,
  onSelectFilter,
  onSelectChange,
  dictionaryCity,
  loadingSites
}) => (
  <Row span={22}>
    <Col xs={24} sm={24} lg={4}>
      <StyledResponsiveSelect
        defaultValue={0}
        showSearch
        filterOption={onSelectFilter}
        onChange={onSelectChange}
        notFoundContent={"Город не найден"}
        loading={loadingSites}
        size={"large"}
      >
        <Select.Option value={0} key={0}>
          Вся Украина
        </Select.Option>
        {dictionaryCity.map(record => (
          <Select.Option value={record.id} key={record.id}>
            <StyledOptionDiv> {record.ru}</StyledOptionDiv>
          </Select.Option>
        ))}
      </StyledResponsiveSelect>
    </Col>
    <Col xs={24} sm={24} lg={17} xl={18}>
      <ResponsiveInput placeholder="Введите ключивые слова" size="large" />
    </Col>
    <Col xs={24} sm={24} lg={3} xl={2}>
      <StyledButton
        type="primary"
        icon="search"
        size="large"
        onClick={onSearchPressed}
        block
      >
        Найти
      </StyledButton>
    </Col>
  </Row>
);

export default Home;
