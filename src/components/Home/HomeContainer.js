import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { setDictionaryCityAction } from "../../actions/cvActions";
import openNotification from "../../views/NotificationComponent";
import Home from "./Home";
import { getCityDictionary } from "../../services/dictionaryService";

function HomeContainer({ dictionaryCity, setDictionaryCity }) {
  const [searchRequest, setSearchRequest] = useState({
    regionId: 0,
    keywords: ""
  });
  const [loadingCites, setLoadingCites] = useState(false);

  useEffect(() => {
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
  }, [dictionaryCity.length, setDictionaryCity]);

  const onSelectChange = value => {
    const editedSearchRequest = searchRequest;
    editedSearchRequest.regionId = value;
    setSearchRequest(editedSearchRequest);
  };

  const history = useHistory();
  const onSearchPressed = () => {
    history.push("/list");
  };

  return (
    <Home
      onSearchPressed={onSearchPressed}
      onSelectChange={onSelectChange}
      dictionaryCity={dictionaryCity}
      loadingCites={loadingCites}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
