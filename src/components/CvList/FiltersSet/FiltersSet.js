import React from "react";
import { Button, Col, Form, Row } from "antd";
import PropTypes from "prop-types";
import { StyledCol, StyledDivider, StyledPopover } from "./FiltersSet.styles";
import SalarySliderWithInputs from "./ViewComponents/SalarySliderWithInputs";
import AgeSliderWithInputs from "./ViewComponents/AgeSliderWithInputs";
import HasPhotoCheckboxGroup from "./ViewComponents/HasPhotoCheckboxGroup";
import ExperienceCheckboxGroup from "./ViewComponents/ExperienceCheckboxGroup";
import SexCheckboxGroup from "./ViewComponents/SexCheckboxGroup";
import CitySelect from "../../../views/CitySelect/CitySelect";

const FiltersSet = ({
  form,
  disabled,
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
                <SalarySliderWithInputs
                  onSalarySliderChange={onSalarySliderChange}
                  onSalaryFromChange={onSalaryFromChange}
                  onSalaryToChange={onSalaryToChange}
                />
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
                <AgeSliderWithInputs
                  onAgeSliderChange={onAgeSliderChange}
                  onAgeFromChange={onAgeFromChange}
                  onAgeToChange={onAgeToChange}
                />
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
              content={<SexCheckboxGroup />}
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
              content={<HasPhotoCheckboxGroup />}
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
                <ExperienceCheckboxGroup
                  onExperienceChange={onExperienceChange}
                />
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
                <CitySelect
                  disabled={disabled}
                  dictionaryCity={dictionaryCity}
                  onSelectFilter
                  onSelectChange
                />
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
