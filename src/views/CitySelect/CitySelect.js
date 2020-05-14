import { Form, Select } from "antd";
import React from "react";
import { StyledResponsiveSelect } from "./CitySelect.style";

const CitySelect = ({ onSelectChange, loadingCites, dictionaryCity }) => {
  const onSelectFilter = (input, { children = "" }) =>
    children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  return (
    <Form.Item name="regionId">
      <StyledResponsiveSelect
        defaultValue={0}
        showSearch
        filterOption={onSelectFilter}
        onChange={onSelectChange}
        notFoundContent="Город не найден"
        loading={loadingCites}
        size="large"
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
    </Form.Item>
  );
};

CitySelect.defaultProps = {
  onSelectFilter: () => {},
  onSelectChange: () => {}
};

export default CitySelect;
