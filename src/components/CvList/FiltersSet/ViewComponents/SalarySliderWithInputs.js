import { Form, Row, Slider } from "antd";
import React from "react";
import {
  SalaryInput,
  StyledDividerSpan,
  StyledPopoverContent
} from "./ViewComponents.styles";

const SalarySliderWithInputs = ({
  onSalarySliderChange,
  onSalaryFromChange,
  onSalaryToChange
}) => (
  <StyledPopoverContent>
    <Form.Item name="salarySlider">
      <Slider
        range
        min={0}
        max={100000}
        step={100}
        onChange={onSalarySliderChange}
        tipFormatter={value => `${value} грн`.replace(/(100000)/, "$1+")}
      />
    </Form.Item>
    <Row>
      <Form.Item name="salaryFrom">
        <SalaryInput
          placeholder="грн"
          step={100}
          onChange={onSalaryFromChange}
        />
      </Form.Item>
      <StyledDividerSpan>-</StyledDividerSpan>
      <Form.Item name="salaryTo">
        <SalaryInput
          placeholder="грн"
          step={100}
          onChange={onSalaryToChange}
          formatter={value => `${value}`.replace(/(100000)/, "$1+")}
        />
      </Form.Item>
    </Row>
  </StyledPopoverContent>
);

export default SalarySliderWithInputs;
