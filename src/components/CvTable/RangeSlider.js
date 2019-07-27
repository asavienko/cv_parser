import React from "react";
import {Col, Row, Slider} from "antd";
import styled from "styled-components";
import * as numeral from "numeral";

const StyledWrapper = styled.div`
  padding: 8px;
  min-width: 300px;
`;
const StyledValueDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledButtonsDiv = styled.div`
  padding: 7px 8px 0;
  margin: 8px -8px 0px;
  overflow: hidden;
  border-top: 1px solid #e8e8e8;
`;
const StyledLeftButton = styled.a`
  float: left;
  color: RGBA(24, 144, 255, 1);
`;
const StyledRightButton = styled.a`
  float: right;
  color: RGBA(24, 144, 255, 1);
`;

function RangeSlider({
  salaryFilterRange = [],
  onSalaryRangeSet,
  onSalaryRangeReset,
  onSalaryRangeChange,
  salaryRang
}) {
  const [min = 0, max = 100] = salaryFilterRange;
  const tipFormatter = value => {
    const formattedPopulation = numeral(value).format("0.0a");
    return formattedPopulation;
  };
  return (
    <StyledWrapper>
      <Row type="flex" align="middle" gutter={10}>
        <Col span={4}>
          <StyledValueDiv>
            <strong>от:</strong>
            <span>{numeral(min).format("0.0a")}</span>
            <span>грн.</span>
          </StyledValueDiv>
        </Col>
        <Col span={16}>
          <Slider
            range={true}
            defaultValue={salaryFilterRange}
            min={min}
            max={max}
            tipFormatter={tipFormatter}
            onChange={onSalaryRangeChange}
            value={salaryRang}
          />
        </Col>
        <Col span={4}>
          <StyledValueDiv>
            <strong>до:</strong>
            <span>{numeral(max).format("0.0a")}</span>
            <span>грн.</span>
          </StyledValueDiv>
        </Col>
      </Row>
      <StyledButtonsDiv>
        <StyledLeftButton onClick={onSalaryRangeSet}>OK</StyledLeftButton>
        <StyledRightButton onClick={onSalaryRangeReset}>
          Reset
        </StyledRightButton>
      </StyledButtonsDiv>
    </StyledWrapper>
  );
}

export { RangeSlider };
