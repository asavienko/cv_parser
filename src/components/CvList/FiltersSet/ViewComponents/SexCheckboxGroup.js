import { Checkbox, Form } from "antd";
import React from "react";

const SexCheckboxGroup = () => (
  <Form.Item name="sex">
    <Checkbox.Group
      options={[
        { label: "Мужской", value: 1 },
        { label: "Женский", value: 2 }
      ]}
    />
  </Form.Item>
);

export default SexCheckboxGroup;
