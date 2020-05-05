import React, { useEffect } from "react";
import { Form } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DEFAULT_FILTERS } from "../../../constants/filters";
import FiltersSet from "./FiltersSet";
import { setFiltersAction } from "../../../actions/cvActions";

const FiltersSetContainer = ({
  disabled,
  requestToServer,
  setFilters,
  filters,
  dictionaryCity
}) => {
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

  const onFinish = newFilters => {
    setFilters({ ...filters, ...newFilters });
    requestToServer(newFilters, false);
  };
  const onResetFilters = () => {
    setFilters();
    requestToServer(DEFAULT_FILTERS, false);
  };

  return (
    <FiltersSet
      form={form}
      disabled={disabled}
      requestToServer={requestToServer}
      setFilters={setFilters}
      filters={filters}
      dictionaryCity={dictionaryCity}
      onSalarySliderChange={onSalarySliderChange}
      onSalaryFromChange={onSalaryFromChange}
      onSalaryToChange={onSalaryToChange}
      onAgeSliderChange={onAgeSliderChange}
      onAgeFromChange={onAgeFromChange}
      onAgeToChange={onAgeToChange}
      onExperienceChange={onExperienceChange}
      onFinish={onFinish}
      onResetFilters={onResetFilters}
    />
  );
};

const mapStateToProps = ({
  cvReducer: { filters, rawList, dictionaryCity }
}) => ({
  filters,
  rawList,
  dictionaryCity
});

FiltersSetContainer.propTypes = {
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
  dictionaryCity: PropTypes.arrayOf(PropTypes.object)
};

FiltersSetContainer.defaultProps = {
  disabled: false,
  filters: {},
  requestToServer: () => {},
  setFilters: () => {},
  dictionaryCity: [{ id: 0, ru: "Вся Украина" }]
};

const mapDispatchToProps = dispatch => ({
  setFilters: filters => dispatch(setFiltersAction(filters))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiltersSetContainer);
