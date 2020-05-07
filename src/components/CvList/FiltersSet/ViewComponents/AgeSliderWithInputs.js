import { Form, Row, Slider } from "antd";
import React from "react";
import {
  AgeInput,
  StyledDividerSpan,
  StyledPopoverContent
} from "./ViewComponents.styles";

const AgeSliderWithInputs = ({
  onAgeSliderChange,
  onAgeFromChange,
  onAgeToChange
}) => (
  <StyledPopoverContent>
    <Form.Item name="ageSlider">
      <Slider range min={0} max={100} onChange={onAgeSliderChange} />
    </Form.Item>
    <Row justify="center">
      <Form.Item name="ageFrom">
        <AgeInput onChange={onAgeFromChange} />
      </Form.Item>
      <StyledDividerSpan>-</StyledDividerSpan>
      <Form.Item name="ageTo">
        <AgeInput onChange={onAgeToChange} />
      </Form.Item>
    </Row>
  </StyledPopoverContent>
);

export default AgeSliderWithInputs;
