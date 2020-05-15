import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DEFAULT_FILTERS } from "../../../constants/filters";
import FiltersSet from "./FiltersSet";
import {
  setDictionaryCityAction,
  setFiltersAction
} from "../../../actions/cvActions";
import { getCityDictionary } from "../../../services/dictionaryService";
import openNotification from "../../../views/NotificationComponent";

const FiltersSetContainer = ({
  disabled,
  requestToServer,
  setFilters,
  filters,
  dictionaryCity,
  setDictionaryCity
}) => {
  const [form] = Form.useForm();

  const [cityLoader, setCityLoader] = useState(false);

  useEffect(() => {
    form.setFieldsValue(filters);
    if (!dictionaryCity.length) {
      setCityLoader(true);
      getCityDictionary()
        .then(list => setDictionaryCity(list))
        .catch(() => {
          openNotification({
            type: "error",
            message: "Не удалось загрузить списко городов"
          });
        })
        .finally(() => setCityLoader(false));
    }
  }, [form, filters, dictionaryCity.length, setDictionaryCity]);

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

  const onFinish = filtersFromForm => {
    const newFilters = { ...filters, ...filtersFromForm };
    setFilters(newFilters);
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
      dictionaryCity={dictionaryCity}
      cityLoader={cityLoader}
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
  dictionaryCity: PropTypes.arrayOf(PropTypes.object),
  setDictionaryCity: PropTypes.func
};

FiltersSetContainer.defaultProps = {
  disabled: false,
  filters: {},
  requestToServer: () => {},
  setFilters: () => {},
  dictionaryCity: [{ id: 0, ru: "Вся Украина" }],
  setDictionaryCity: () => {}
};

const mapStateToProps = ({
  cvReducer: { filters, rawList, dictionaryCity }
}) => ({
  filters,
  rawList,
  dictionaryCity
});

const mapDispatchToProps = dispatch => ({
  setFilters: filters => dispatch(setFiltersAction(filters)),
  setDictionaryCity: dictionaryCity =>
    dispatch(setDictionaryCityAction(dictionaryCity))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiltersSetContainer);
