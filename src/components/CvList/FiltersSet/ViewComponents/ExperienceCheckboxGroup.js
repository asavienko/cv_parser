import { Checkbox, Form } from "antd";
import React from "react";

const ExperienceCheckboxGroup = ({ onExperienceChange }) => (
  <Form.Item name="experienceid">
    <Checkbox.Group onChange={onExperienceChange}>
      <Checkbox value={1}>От 1-го до 2-х лет</Checkbox>
      <Checkbox value={2}> От 2-х до 5-ти лет</Checkbox>
      <Checkbox value={3}> Более 5-ти лет</Checkbox>
    </Checkbox.Group>
  </Form.Item>
);

export default ExperienceCheckboxGroup;
