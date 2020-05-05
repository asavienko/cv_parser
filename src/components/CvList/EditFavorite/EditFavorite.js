import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import EditFavoriteListButton from "./EditFavoriteListButton";

const EditFavorite = ({ loading, setTableRawSelection }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {}, []);
  const onPrimaryClick = () => {
    setTableRawSelection({});
    setIsActive(true);
  };

  const onCancelClick = () => {
    setTableRawSelection(undefined);
    setIsActive(false);
  };

  return (
    <EditFavoriteListButton
      addToFavoriteActive={isActive}
      onPrimaryClick={onPrimaryClick}
      onCancelClick={onCancelClick}
      addToFavoriteDisabled={loading}
      // selectedCvCounter={selectedCvCounter}
      // mainButtonText={mainButtonText}
      // type={type}
      // buttonName={buttonName}
    />
  );
};

EditFavorite.propTypes = {
  loading: PropTypes.bool,
  setTableRawSelection: PropTypes.func
};

EditFavorite.defaultProps = {
  loading: false,
  setTableRawSelection: () => {}
};

export default EditFavorite;
