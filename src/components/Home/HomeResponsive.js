import { StyledResponsiveSelect } from "./Home.styles";
import React from "react";
import { Button, Col, Input, Row, Select } from "antd";

const { Option } = Select;

const ColProps = { span: 24 };

const HomeResponsive = ({
  onSearchPressed,
  onSelectFilter,
  onSelectChange,
  dictionaryCity,
  notFoundContent
}) => (
  <Row gutter={[, 24]}>
    <Col {...ColProps}>
      <StyledResponsiveSelect
        defaultValue={0}
        showSearch
        filterOption={onSelectFilter}
        onChange={onSelectChange}
        notFoundContent={notFoundContent}
      >
        <Option value={0} key={0}>
          Вся Украина
        </Option>
        {dictionaryCity.map(record => (
          <Option
            value={record.id}
            key={record.id}
            style={{ "white-space": "initial" }}
          >
            {record.ru}
          </Option>
        ))}
      </StyledResponsiveSelect>
    </Col>
    <Col {...ColProps}>
      <Input placeholder="Введите ключивые слова" size="large" />
    </Col>
    <Col span={16} offset={4}>
      <Button type="primary" icon="search" onClick={onSearchPressed} block />
    </Col>
  </Row>
);

export default HomeResponsive;
