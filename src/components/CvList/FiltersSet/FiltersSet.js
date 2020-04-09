import React, { useState } from "react";
import { Button, Checkbox, Col, Popover, Row, Slider } from "antd";
import {
  AgeInput,
  SalaryInput,
  StyledDivider,
  StyledDividerSpan,
  StyledPopoverContent
} from "./FiltersSet.styles";

const FiltersSet = () => {
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState({});
  const [inputSalary, setInputSalary] = useState([0, 100000]);
  const [inputAge, setInputAge] = useState([0, 100]);
  const [sex, setSex] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [experience, setExperience] = useState([]);

  const onSalaryChange = inputValue => {
    setInputSalary(inputValue);
  };
  const onAgeChange = inputValue => {
    setInputAge(inputValue);
  };

  const resetFilters = () => {
    setFilter({});
  };
  const onSexChange = checkedValues => {
    !checkedValues.length || checkedValues.length === 2
      ? setSex(false)
      : setSex(checkedValues[0]);
  };
  const onHasPhotoChange = checkedValues => {
    !checkedValues.length || checkedValues.length === 2
      ? setHasPhoto(false)
      : setHasPhoto(checkedValues[0]);
  };
  const onExperienceChange = checkedValue => {
    setExperience([checkedValue[checkedValue.length - 1]]);
  };

  return (
    <>
      <Row gutter={10}>
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
            <Button>Зарплата</Button>
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
            <Button>Возраст</Button>
          </Popover>
        </Col>
        <Col>
          <Popover
            content={
              <Checkbox.Group
                options={[
                  { label: "Мужской", value: 1 },
                  { label: "Женский", value: 2 }
                ]}
                onChange={onSexChange}
              />
            }
            title="Пол"
            trigger="click"
            key="sex"
          >
            <Button>Пол</Button>
          </Popover>
        </Col>
        <Col>
          <Popover
            content={
              <Checkbox.Group
                options={[
                  { label: "Без фото", value: 0 },
                  { label: "С фото", value: 1 }
                ]}
                onChange={onHasPhotoChange}
              />
            }
            title="Фото"
            trigger="click"
            key="hasPhoto"
          >
            <Button>Фото</Button>
          </Popover>
        </Col>
        <Col>
          <Popover
            content={
              <Checkbox.Group value={experience} onChange={onExperienceChange}>
                <Checkbox value={1}>От 1-го до 2-х лет</Checkbox>
                <Checkbox value={2}> От 2-х до 5-ти лет</Checkbox>
                <Checkbox value={3}> Более 5-ти лет</Checkbox>
              </Checkbox.Group>
            }
            title="Опыт работы на данной позиции"
            trigger="click"
            key="experience"
          >
            <Button>Опыт работы</Button>
          </Popover>
        </Col>
      </Row>
      <Row gutter={20}>
        <StyledDivider type="vertical" />
        <Col>
          <Button type="primary" onClick={() => console.log(filter)}>
            Применить
          </Button>
        </Col>
        <Col>
          <Button type="danger" onClick={resetFilters}>
            Очистить
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default FiltersSet;
