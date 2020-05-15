import { Button } from "antd";
import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import {
  StyledCloseButton,
  StyledDivWrapper
} from "./SaveResultsButton.styles";

export default function SaveResultsButton({
  onStartSelectClick,
  onCancelClick,
  saveDisabled,
  saveActive,
  selectedResultsNumber,
  mainButtonText,
  type,
  buttonName,
  onSave
}) {
  const showButtonProp = !saveDisabled && saveActive;
  const allowSave = selectedResultsNumber > 0 && onSave;
  return (
    <StyledDivWrapper>
      {showButtonProp ? (
        <>
          <Button
            type={type}
            disabled={saveDisabled}
            placement="bottomCenter"
            onClick={allowSave}
          >
            {`${mainButtonText}: ${selectedResultsNumber} шт.`}
          </Button>
          <StyledCloseButton
            type="danger"
            shape="circle"
            size="small"
            icon={<CloseOutlined />}
            onClick={onCancelClick}
          />
        </>
      ) : (
        <Button
          type={type}
          disabled={saveDisabled}
          onClick={onStartSelectClick}
        >
          {buttonName}
        </Button>
      )}
    </StyledDivWrapper>
  );
}

SaveResultsButton.propTypes = {
  onStartSelectClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  onSave: PropTypes.func,
  saveDisabled: PropTypes.bool,
  saveActive: PropTypes.bool,
  selectedResultsNumber: PropTypes.number,
  mainButtonText: PropTypes.string,
  type: PropTypes.string,
  buttonName: PropTypes.string
};

SaveResultsButton.defaultProps = {
  onStartSelectClick: () => {},
  onCancelClick: () => {},
  onSave: () => {},
  saveDisabled: false,
  saveActive: false,
  selectedResultsNumber: 0,
  mainButtonText: "Сохранить",
  type: "primary",
  buttonName: "Сохранить"
};
