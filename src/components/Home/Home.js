import { StyledSearch, StyledSelect } from "./Home.styles";
import React from "react";
import { Select } from "antd";

const { Option } = Select;

const Home = ({
  onSearchPressed,
  onSelectFilter,
  onSelectChange,
  dictionaryCity,
  notFoundContent
}) => (
  <StyledSearch
    placeholder="Введите ключивые слова"
    onSearch={onSearchPressed}
    enterButton
    size="large"
    addonBefore={
      <StyledSelect
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
      </StyledSelect>
    }
  />
);

export default Home;
