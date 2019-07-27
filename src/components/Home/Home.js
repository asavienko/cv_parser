import React from "react";
import { Input, Select } from "antd";

const { Search } = Input;
const {Option} = Select

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const selectAfter = (  <Select defaultValue=".com" style={{ width: 80 }} showSearch>
  <Option value=".com">.com</Option>
  <Option value=".jp">.jp</Option>
  <Option value=".cn">.cn</Option>
  <Option value=".org">.org</Option>
</Select>)

function Home() {
  return (
    <Search
      placeholder="input search text"
      onSearch={value => console.log(value)}
      enterButton
      size="large"
      suffix={selectAfter}
    />

  );
}
export default Home;
