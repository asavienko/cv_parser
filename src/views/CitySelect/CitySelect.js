import {Select} from "antd";
import React from "react";
import {StyledResponsiveSelect} from "./CitySelect.style";

const CitySelect = ({
  onSelectFilter,
  onSelectChange,
  loadingCites,
  dictionaryCity
}) => (
  <StyledResponsiveSelect
    defaultValue="Вся Украина"
    showSearch
    filterOption={onSelectFilter}
    onChange={onSelectChange}
    notFoundContent="Город не найден"
    loading={loadingCites}
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
);

export default CitySelect;
