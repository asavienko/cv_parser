import { Select } from "antd";
import React from "react";
import { connect } from "react-redux";

const { Option } = Select;

function SelectCity({dictionaryCity}) {
  return (
    <Select defaultValue="Вся Украина" style={{ width: 80 }} showSearch>
      <Option value=".com">.com</Option>
      <Option value=".jp">.jp</Option>
      <Option value=".cn">.cn</Option>
      <Option value=".org">.org</Option>
    </Select>
  );
}
const mapStateToProps = ({ cvReducer: { dictionaryCity } }) => ({
  dictionaryCity
});

export default connect(
  mapStateToProps,
  null
)(SelectCity);
