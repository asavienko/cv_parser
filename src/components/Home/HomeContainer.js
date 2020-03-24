import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setDictionaryCityAction } from "../../actions/cvActions";
import openNotification from "../../views/NotificationComponent";
import Home from "./Home";
import { getCityDictionary } from "../../services/dictionaryService";

function HomeContainer({ dictionaryCity, setDictionaryCity }) {
  const [searchRequest, setSearchRequest] = useState({
    regionId: 0,
    keywords: ""
  });
  const [loadingSites, setLoadingSites] = useState(false);

  useEffect(() => {
    if (!dictionaryCity.length) {
      setLoadingSites(true);
      getCityDictionary()
        .then(response => {
          setLoadingSites(false);
          response.length && setDictionaryCity(response);
        })
        .catch(() => {
          setLoadingSites(false);
          openNotification({
            type: "error",
            message: "Не удалось загрузить списко городов"
          });
        });
    }
  }, [dictionaryCity, setDictionaryCity]);

  const onSelectFilter = (input, option) =>
    option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  const onSelectChange = value => {
    const editedSearchRequest = searchRequest;
    editedSearchRequest.regionId = value;
    setSearchRequest(editedSearchRequest);
  };
  const onSearchPressed = async searchValue => {
    console.log(searchValue);
  };

  return (
    <Home
      onSearchPressed={onSearchPressed}
      onSelectFilter={onSelectFilter}
      onSelectChange={onSelectChange}
      dictionaryCity={dictionaryCity}
      loadingSites={loadingSites}
    />
  );
}

HomeContainer.propTypes = {
  dictionaryCity: PropTypes.arrayOf(PropTypes.object),
  setDictionaryCity: PropTypes.func
};

HomeContainer.defaultProps = {
  dictionaryCity: [{ id: 0, ru: "Харьков" }],
  setDictionaryCity: () => {}
};

const mapStateToProps = ({ cvReducer: { dictionaryCity } }) => ({
  dictionaryCity
});

const mapDispatchToProps = dispatch => ({
  setDictionaryCity: dictionaryCity =>
    dispatch(setDictionaryCityAction(dictionaryCity))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
