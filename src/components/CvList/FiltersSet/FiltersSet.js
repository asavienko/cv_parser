import React, { useState } from "react";
import { Button, Col, Dropdown, Menu, Popover, Radio, Row, Slider } from "antd";
import { DownOutlined, FilterFilled, UpOutlined } from "@ant-design/icons";
import {
  AgeInput,
  SalaryInput,
  StyledDivider,
  StyledDividerSpan,
  StyledExpander,
  StyledPopoverContent,
  StyledRadio
} from "./FiltersSet.styles";

const hasPhoto = (
  <Menu>
    <Radio.Group>
      <StyledRadio>Есть</StyledRadio>
      <StyledRadio>Нет</StyledRadio>
    </Radio.Group>
    <Menu.Divider />
    <Menu.Item type="link" danger>
      Очистить
    </Menu.Item>
  </Menu>
);

const gender = (
  <Menu>
    <Radio.Group>
      <StyledRadio>Мужской</StyledRadio>
      <StyledRadio>Женский</StyledRadio>
    </Radio.Group>
    <Menu.Divider />
    <Menu.Item type="link" danger>
      Очистить
    </Menu.Item>
  </Menu>
);

const FiltersSet = () => {
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState({});
  const [inputSalary, setInputSalary] = useState([0, 100000]);
  const [inputAge, setInputAge] = useState([0, 100]);

  const onSalaryChange = inputValue => {
    setInputSalary(inputValue);
  };
  const onAgeChange = inputValue => {
    setInputAge(inputValue);
  };

  const resetFilters = () => {
    setFilter({});
  };

  return (
    <Row justify="space-around">
      <Col>
        <Popover
          content={
            <StyledPopoverContent>
              <Slider
                range
                min={0}
                max={100000}
                step={100}
                defaultValue={[0, 100000]}
                value={[
                  typeof inputSalary[0] === "number" ? inputSalary[0] : 0,
                  typeof inputSalary[1] === "number" ? inputSalary[1] : 100000
                ]}
                onChange={onSalaryChange}
                tipFormatter={value =>
                  `${value} грн`.replace(/(100000)/, "$1+")
                }
              />

              <SalaryInput
                placeholder="грн"
                value={inputSalary[0]}
                step={100}
                onChange={value => onSalaryChange([value, inputSalary[1]])}
              />
              <StyledDividerSpan>-</StyledDividerSpan>
              <SalaryInput
                placeholder="грн"
                value={inputSalary[1]}
                step={100}
                onChange={value => onSalaryChange([inputSalary[0], value])}
                formatter={value => `${value}`.replace(/(100000)/, "$1+")}
              />
            </StyledPopoverContent>
          }
          title="Ожидаемая зарплата"
          trigger="click"
          key="salary"
        >
          <Button type="primary">Зарплата</Button>
        </Popover>
      </Col>

      <Col>
        <Popover
          content={
            <StyledPopoverContent>
              <Slider
                range
                min={0}
                max={100}
                defaultValue={[0, 100]}
                value={[
                  typeof inputAge[0] === "number" ? inputAge[0] : 0,
                  typeof inputAge[1] === "number" ? inputAge[1] : 100000
                ]}
                onChange={onAgeChange}
              />
              <AgeInput
                value={inputAge[0]}
                onChange={value => onAgeChange([value, inputAge[1]])}
              />
              <StyledDividerSpan>-</StyledDividerSpan>
              <AgeInput
                value={inputAge[1]}
                onChange={value => onAgeChange([inputAge[0], value])}
              />
            </StyledPopoverContent>
          }
          title="Возраст кандидата"
          trigger="click"
          key="age"
        >
          <Button type="primary">Возраст</Button>
        </Popover>
      </Col>

      <Col>
        <Dropdown overlay={gender}>
          <Button>Пол</Button>
        </Dropdown>
      </Col>

      <Col>
        <Dropdown overlay={hasPhoto}>
          <Button>Фото</Button>
        </Dropdown>
      </Col>
      <StyledDivider type="vertical" />
      <Col>
        <StyledExpander
          onClick={() => {
            setVisible(!visible);
          }}
        >
          {visible ? <UpOutlined /> : <DownOutlined />}
          {visible ? " Свернуть " : " Развернуть "}
          <FilterFilled />
        </StyledExpander>
      </Col>
      <Col>
        <Button type="primary" onClick={() => console.log(filter)}>
          Применить
        </Button>
      </Col>
      <Col>
        <Button onClick={resetFilters}>Очистить</Button>
      </Col>
    </Row>
  );
};

export default FiltersSet;
