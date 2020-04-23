import React, {useEffect} from "react";
import {Button, Checkbox, Col, Form, Popover, Row, Slider} from "antd";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {AgeInput, SalaryInput, StyledDivider, StyledDividerSpan, StyledPopoverContent} from "./FiltersSet.styles";
import {setFiltersAction, setRawListAction} from "../../../actions/cvActions";
import {DEFAULT_FILTERS} from "../../../constants/filters";

const FiltersSet = ({ disabled, requestToServer, setFilters, filters }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(filters);
  });

  const onSalarySliderChange = ([salaryFrom, salaryTo]) => {
    form.setFieldsValue({ salaryFrom, salaryTo });
  };
  const onSalaryFromChange = value => {
    const [, sliderTo] = form.getFieldValue("salarySlider");
    form.setFieldsValue({ salarySlider: [value, sliderTo] });
  };
  const onSalaryToChange = value => {
    const [sliderFrom] = form.getFieldValue("salarySlider");
    form.setFieldsValue({ salarySlider: [sliderFrom, value] });
  };

  const onAgeSliderChange = ([ageFrom, ageTo]) => {
    form.setFieldsValue({ ageFrom, ageTo });
  };
  const onAgeFromChange = value => {
    const [, sliderTo] = form.getFieldValue("ageSlider");
    form.setFieldsValue({ ageSlider: [value, sliderTo] });
  };
  const onAgeToChange = value => {
    const [sliderFrom] = form.getFieldValue("ageSlider");
    form.setFieldsValue({ ageSlider: [sliderFrom, value] });
  };

  const onExperienceChange = checkedValue => {
    form.setFieldsValue({
      experienceid: [checkedValue[checkedValue.length - 1]]
    });
  };

  const onFinish = onConfirmFilters => {
    const {
      salarySlider,
      ageSlider,
      sex: sexArr = [],
      hasphoto: hasPhotoArr = [],
      experienceid: experienceIdArr = [],
      ...filtersSet
    } = onConfirmFilters;
    const objectSex = sexArr.length === 1 ? { sex: sexArr[0] } : {};
    const objectPhoto =
      hasPhotoArr.length === 1 ? { hasPhoto: hasPhotoArr[0] } : {};
    const objectExperience =
      experienceIdArr.length === 1 ? { experienceId: experienceIdArr[0] } : {};

    const filtersToSend = {
      ...filtersSet,
      ...objectSex,
      ...objectPhoto,
      ...objectExperience
    };

    setFilters({ ...filters, ...onConfirmFilters });
    requestToServer(filtersToSend, true);
  };
  const onResetFilters = () => {
    setFilters();
    requestToServer(DEFAULT_FILTERS, true);
  };

  return (
    <Form form={form} onFinish={onFinish} name="filterSet">
      <Row justify="space-between">
        <Row gutter={24}>
          <Col>
            <Popover
              content={(
                <StyledPopoverContent>
                  <Form.Item name="salarySlider">
                    <Slider
                      range
                      min={0}
                      max={100000}
                      step={100}
                      onChange={onSalarySliderChange}
                      tipFormatter={value =>
                        `${value} грн`.replace(/(100000)/, "$1+")}
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
                          `${value}`.replace(/(100000)/, "$1+")}
                      />
                    </Form.Item>
                  </Row>
                </StyledPopoverContent>
              )}
              title="Ожидаемая зарплата"
              trigger="click"
              key="salary"
            >
              <Button disabled={disabled}>Зарплата</Button>
            </Popover>
          </Col>
          <Col>
            <Popover
              content={(
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
              )}
              title="Возраст кандидата"
              trigger="click"
              key="age"
            >
              <Button disabled={disabled}>Возраст</Button>
            </Popover>
          </Col>
          <Col>
            <Popover
              content={(
                <Form.Item name="sex">
                  <Checkbox.Group
                    options={[
                      { label: "Мужской", value: 1 },
                      { label: "Женский", value: 2 }
                    ]}
                  />
                </Form.Item>
              )}
              title="Пол"
              trigger="click"
              key="sex"
            >
              <Button disabled={disabled}>Пол</Button>
            </Popover>
          </Col>
          <Col>
            <Popover
              content={(
                <Form.Item name="hasphoto">
                  <Checkbox.Group
                    options={[
                      { label: "Без фото", value: 0 },
                      { label: "С фото", value: 1 }
                    ]}
                  />
                </Form.Item>
              )}
              title="Фото"
              trigger="click"
              key="hasPhoto"
            >
              <Button disabled={disabled}>Фото</Button>
            </Popover>
          </Col>
          <Col>
            <Popover
              content={(
                <Form.Item name="experienceid">
                  <Checkbox.Group onChange={onExperienceChange}>
                    <Checkbox value={1}>От 1-го до 2-х лет</Checkbox>
                    <Checkbox value={2}> От 2-х до 5-ти лет</Checkbox>
                    <Checkbox value={3}> Более 5-ти лет</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              )}
              title="Опыт работы на данной позиции"
              trigger="click"
              key="experience"
            >
              <Button disabled={disabled}>Опыт работы</Button>
            </Popover>
          </Col>
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
  setFilters: PropTypes.func
};

FiltersSet.defaultProps = {
  disabled: false,
  filters: {},
  requestToServer: () => {},
  setFilters: () => {}
};

const mapStateToProps = ({ cvReducer: { filters, rawList } }) => ({
  filters,
  rawList
});

const mapDispatchToProps = dispatch => ({
  setFilters: filters => dispatch(setFiltersAction(filters)),
  setRawList: rawList => dispatch(setRawListAction(rawList))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersSet);
