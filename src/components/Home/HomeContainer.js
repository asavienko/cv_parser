import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Form } from "antd";
import {
  setDictionaryCityAction,
  setFiltersAction,
  setRawListAction
} from "../../actions/cvActions";
import openNotification from "../../views/NotificationComponent";
import Home from "./Home";
import { getCityDictionary } from "../../services/dictionaryService";

function HomeContainer({
  dictionaryCity,
  setDictionaryCity,
  filters,
  setFilters,
  setRawList
}) {
  const [searchRequest, setSearchRequest] = useState({
    regionId: 0,
    keywords: ""
  });
  const [loadingCites, setLoadingCites] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(filters);
    if (dictionaryCity.length) return;
    setLoadingCites(true);
    getCityDictionary()
      .then(response => {
        response.length && setDictionaryCity(response);
        setLoadingCites(false);
      })
      .catch(() => {
        setLoadingCites(false);
        openNotification({
          type: "error",
          message: "Не удалось загрузить списко городов"
        });
      });
  }, [dictionaryCity.length, setDictionaryCity, filters, form]);

  const onSelectChange = value => {
    const editedSearchRequest = searchRequest;
    editedSearchRequest.regionId = value;
    setSearchRequest(editedSearchRequest);
  };

  const history = useHistory();
  const onSearchSubmit = newFilters => {
    setFilters(newFilters);
    setRawList();
    history.push("/list");
  };

  return (
    <Home
      onSearchSubmit={onSearchSubmit}
      onSelectChange={onSelectChange}
      dictionaryCity={dictionaryCity}
      loadingCites={loadingCites}
      filters={filters}
      form={form}
    />
  );
}

HomeContainer.propTypes = {
  dictionaryCity: PropTypes.arrayOf(PropTypes.object),
  setDictionaryCity: PropTypes.func,
  setFilters: PropTypes.func,
  setRawList: PropTypes.func
};

HomeContainer.defaultProps = {
  dictionaryCity: [{ id: 0, ru: "Харьков" }],
  setDictionaryCity: () => {},
  setFilters: () => {},
  setRawList: () => {}
};

const mapStateToProps = ({ cvReducer: { dictionaryCity, filters } }) => ({
  dictionaryCity,
  filters
});

const mapDispatchToProps = dispatch => ({
  setFilters: filters => dispatch(setFiltersAction(filters)),
  setDictionaryCity: dictionaryCity =>
    dispatch(setDictionaryCityAction(dictionaryCity)),
  setRawList: newList => dispatch(setRawListAction(newList))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
