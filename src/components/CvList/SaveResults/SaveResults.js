import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SaveResultsButton from "./SaveResultsButton";

const SaveResults = ({
  loading,
  handleRowSelectionChange,
  selectedResultsNumber,
  onSave
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {}, []);
  const onStartSelectClick = () => {
    handleRowSelectionChange(true);
    setIsActive(true);
  };

  const onCancelClick = () => {
    handleRowSelectionChange(false);
    setIsActive(false);
  };

  return (
    <SaveResultsButton
      saveActive={isActive}
      onStartSelectClick={onStartSelectClick}
      onCancelClick={onCancelClick}
      saveDisabled={loading}
      selectedResultsNumber={selectedResultsNumber}
      onSave={onSave}
      // mainButtonText={mainButtonText}
    />
  );
};

SaveResults.propTypes = {
  loading: PropTypes.bool,
  handleRowSelectionChange: PropTypes.func,
  onSave: PropTypes.func,
  selectedResultsNumber: PropTypes.number
};

SaveResults.defaultProps = {
  loading: false,
  handleRowSelectionChange: () => {},
  onSave: () => {},
  selectedResultsNumber: 0
};

export default SaveResults;
