import React from "react";
import { Col, Row, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import {
  ResponsiveInput,
  StyledButton,
  StyledResponsiveSelect
} from "./Home.styles";

const Home = ({
  onSearchPressed,
  onSelectFilter,
  onSelectChange,
  dictionaryCity,
  loadingSites
}) => (
  <Row span={22}>
    <Col xs={24} sm={24} lg={7} xl={6}>
      <StyledResponsiveSelect
        defaultValue="Вся Украина"
        showSearch
        filterOption={onSelectFilter}
        onChange={onSelectChange}
        notFoundContent="Город не найден"
        loading={loadingSites}
        size="large"
      >
        <Select.Option value="Вся Украина" key={0}>
          Вся Украина
        </Select.Option>
        {dictionaryCity.map(record => (
          <Select.Option value={record.ru} key={record.id}>
            {record.ru}
          </Select.Option>
        ))}
      </StyledResponsiveSelect>
    </Col>
    <Col xs={24} sm={24} lg={14} xl={16}>
      <ResponsiveInput placeholder="Введите ключивые слова" size="large" />
    </Col>
    <Col xs={24} sm={24} lg={3} xl={2}>
      <StyledButton
        type="primary"
        icon={<SearchOutlined />}
        size="large"
        onClick={onSearchPressed}
        block
      >
        Найти
      </StyledButton>
    </Col>
  </Row>
);

Home.propTypes = {
  onSearchPressed: PropTypes.func,
  onSelectFilter: PropTypes.func,
  onSelectChange: PropTypes.func,
  dictionaryCity: PropTypes.arrayOf(PropTypes.object),
  loadingSites: PropTypes.bool
};
Home.defaultProps = {
  onSearchPressed: () => {},
  onSelectFilter: () => {},
  onSelectChange: () => {},
  dictionaryCity: [{ id: 0, ru: "Харьков" }],
  loadingSites: false
};

export default Home;
