import React from "react";
import { Button, Checkbox, Col, Form, Row, Select, Slider } from "antd";
import PropTypes from "prop-types";
import {
  AgeInput,
  SalaryInput,
  StyledCol,
  StyledDivider,
  StyledDividerSpan,
  StyledPopover,
  StyledPopoverContent
} from "./FiltersSet.styles";
import { StyledResponsiveSelect } from "../../Home/Home.styles";

const FiltersSet = ({
  form,
  disabled,
  requestToServer,
  setFilters,
  filters,
  dictionaryCity,
  onSalarySliderChange,
  onSalaryFromChange,
  onSalaryToChange,
  onAgeSliderChange,
  onAgeFromChange,
  onAgeToChange,
  onExperienceChange,
  onFinish,
  onResetFilters
}) => {
  return (
    <Form form={form} onFinish={onFinish} name="filterSet">
      <Row justify="space-between">
        <Row gutter={24}>
          <StyledCol disabled={disabled}>
            <StyledPopover
              disabled={disabled}
              trigger="click"
              content={
                <StyledPopoverContent>
                  <Form.Item name="salarySlider">
                    <Slider
                      range
                      min={0}
                      max={100000}
                      step={100}
                      onChange={onSalarySliderChange}
                      tipFormatter={value =>
                        `${value} грн`.replace(/(100000)/, "$1+")
                      }
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
                        formatter={value =>
                          `${value}`.replace(/(100000)/, "$1+")
                        }
                      />
                    </Form.Item>
                  </Row>
                </StyledPopoverContent>
              }
              title="Ожидаемая зарплата"
              key="salary"
            >
              <Button disabled={disabled}>Зарплата</Button>
            </StyledPopover>
          </StyledCol>
          <StyledCol disabled={disabled}>
            <StyledPopover
              disabled={disabled}
              content={
                <StyledPopoverContent>
                  <Form.Item name="ageSlider">
                    <Slider
                      range
                      min={0}
                      max={100}
                      onChange={onAgeSliderChange}
                    />
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
              }
              title="Возраст кандидата"
              trigger="click"
              key="age"
            >
              <Button disabled={disabled}>Возраст</Button>
            </StyledPopover>
          </StyledCol>
          <StyledCol disabled={disabled}>
            <StyledPopover
              disabled={disabled}
              content={
                <Form.Item name="sex">
                  <Checkbox.Group
                    options={[
                      { label: "Мужской", value: 1 },
                      { label: "Женский", value: 2 }
                    ]}
                  />
                </Form.Item>
              }
              title="Пол"
              trigger="click"
              key="sex"
            >
              <Button disabled={disabled}>Пол</Button>
            </StyledPopover>
          </StyledCol>
          <StyledCol disabled={disabled}>
            <StyledPopover
              disabled={disabled}
              content={
                <Form.Item name="hasphoto">
                  <Checkbox.Group
                    options={[
                      { label: "Без фото", value: 0 },
                      { label: "С фото", value: 1 }
                    ]}
                  />
                </Form.Item>
              }
              title="Фото"
              trigger="click"
              key="hasPhoto"
            >
              <Button disabled={disabled}>Фото</Button>
            </StyledPopover>
          </StyledCol>
          <StyledCol disabled={disabled}>
            <StyledPopover
              disabled={disabled}
              content={
                <Form.Item name="experienceid">
                  <Checkbox.Group onChange={onExperienceChange}>
                    <Checkbox value={1}>От 1-го до 2-х лет</Checkbox>
                    <Checkbox value={2}> От 2-х до 5-ти лет</Checkbox>
                    <Checkbox value={3}> Более 5-ти лет</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              }
              title="Опыт работы на данной позиции"
              trigger="click"
              key="experience"
            >
              <Button disabled={disabled}>Опыт работы</Button>
            </StyledPopover>
          </StyledCol>
          <StyledCol disabled={disabled}>
            <StyledPopover
              disabled={disabled}
              content={
                <Form.Item name="regionId">
                  <StyledResponsiveSelect
                    defaultActiveFirstOption
                    showSearch
                    notFoundContent="Город не найден"
                    loading={disabled}
                    size="large"
                  >
                    <Select.Option value="Вся Украина" key={0}>
                      Вся Украина
                    </Select.Option>
                    {dictionaryCity.map(record => (
                      <Select.Option value={record.ru} key={record.id}>
                        {record.ru}
                      </Select.Option>
                    ))}
                  </StyledResponsiveSelect>
                </Form.Item>
              }
              title="Выберите город"
              trigger="click"
              key="city"
            >
              <Button disabled={disabled}>Город</Button>
            </StyledPopover>
          </StyledCol>
        </Row>
        <Row gutter={24}>
          <StyledDivider type="vertical" />
          <Col>
            <Button type="primary" htmlType="submit" disabled={disabled}>
              Применить
            </Button>
          </Col>
          <Col>
            <Button
              type="danger"
              disabled={disabled}
              htmlType="button"
              onClick={onResetFilters}
            >
              Очистить
            </Button>
          </Col>
        </Row>
      </Row>
    </Form>
  );
};

FiltersSet.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  disabled: PropTypes.bool,
  filters: PropTypes.shape({
    keywords: PropTypes.string,
    searchType: PropTypes.string,
    sort: PropTypes.string,
    period: PropTypes.number,
    pg: PropTypes.number,
    salaryFrom: PropTypes.number,
    salaryTo: PropTypes.number,
    ageFrom: PropTypes.number,
    ageTo: PropTypes.number,
    salarySlider: PropTypes.array,
    ageSlider: PropTypes.array
  }),
  requestToServer: PropTypes.func,
  setFilters: PropTypes.func,
  dictionaryCity: PropTypes.arrayOf(PropTypes.object),
  onSalarySliderChange: PropTypes.func,
  onSalaryFromChange: PropTypes.func,
  onSalaryToChange: PropTypes.func,
  onAgeSliderChange: PropTypes.func,
  onAgeFromChange: PropTypes.func,
  onAgeToChange: PropTypes.func,
  onExperienceChange: PropTypes.func,
  onFinish: PropTypes.func,
  onResetFilters: PropTypes.func
};

FiltersSet.defaultProps = {
  form: {},
  disabled: false,
  filters: {},
  requestToServer: () => {},
  setFilters: () => {},
  dictionaryCity: [{ id: 0, ru: "Вся Украина" }],
  onSalarySliderChange: () => {},
  onSalaryFromChange: () => {},
  onSalaryToChange: () => {},
  onAgeSliderChange: () => {},
  onAgeFromChange: () => {},
  onAgeToChange: () => {},
  onExperienceChange: () => {},
  onFinish: () => {},
  onResetFilters: () => {}
};

export default FiltersSet;
