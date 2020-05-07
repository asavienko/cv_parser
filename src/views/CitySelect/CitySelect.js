import { Select } from "antd";
import React from "react";
import { StyledResponsiveSelect } from "./CitySelect.style";

const CitySelect = ({
  onSelectFilter,
  onSelectChange,
  loadingCites,
  dictionaryCity,
  ...props
}) => (
  <StyledResponsiveSelect
    defaultValue={0}
    showSearch
    filterOption={onSelectFilter}
    onChange={onSelectChange}
    notFoundContent="Город не найден"
    loading={loadingCites}
    size="large"
    {...props}
  >
    <Select.Option value={0} key={0}>
      Вся Украина
    </Select.Option>
    {dictionaryCity.map(record => (
      <Select.Option value={record.id} key={record.id}>
        {record.ru}
      </Select.Option>
    ))}
  </StyledResponsiveSelect>
);

CitySelect.defaultProps = {
  onSelectFilter: () => {},
  onSelectChange: () => {}
};

export default CitySelect;
