import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SaveResultsButton from "./SaveResultsButton";

const SaveResults = ({ loading, setTableRawSelection }) => {
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
    <SaveResultsButton
      saveActive={isActive}
      onPrimaryClick={onPrimaryClick}
      onCancelClick={onCancelClick}
      saveDisabled={loading}
      // selectedCvCounter={selectedCvCounter}
      // mainButtonText={mainButtonText}
    />
  );
};

SaveResults.propTypes = {
  loading: PropTypes.bool,
  setTableRawSelection: PropTypes.func
};

SaveResults.defaultProps = {
  loading: false,
  setTableRawSelection: () => {}
};

export default SaveResults;
