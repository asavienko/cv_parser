import { Checkbox, Form } from "antd";
import React from "react";

const HasPhotoCheckboxGroup = () => (
  <Form.Item name="hasphoto">
    <Checkbox.Group
      options={[
        { label: "Без фото", value: 0 },
        { label: "С фото", value: 1 }
      ]}
    />
  </Form.Item>
);

export default HasPhotoCheckboxGroup;
