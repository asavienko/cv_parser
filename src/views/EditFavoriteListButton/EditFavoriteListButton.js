import { Button } from "antd";
import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import {
  StyledCloseButton,
  StyledDivWrapper
} from "./EditFavoriteListButton.styles";

export default function EditFavoriteListButton({
  onPrimaryClick,
  onCancelClick,
  addToFavoriteDisabled,
  addToFavoriteActive,
  cvCounts,
  mainButtonText,
  type,
  buttonName
}) {
  return (
    <StyledDivWrapper>
      <Button
        type={type}
        onClick={onPrimaryClick}
        disabled={addToFavoriteDisabled}
      >
        {addToFavoriteActive
          ? `${mainButtonText}: ${cvCounts} шт.`
          : buttonName}
      </Button>
      {addToFavoriteActive && (
        <StyledCloseButton
          type="danger"
          shape="circle"
          icon={<CloseOutlined />}
          onClick={onCancelClick}
        />
      )}
    </StyledDivWrapper>
  );
}

EditFavoriteListButton.propTypes = {
  onPrimaryClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  addToFavoriteDisabled: PropTypes.bool,
  addToFavoriteActive: PropTypes.bool,
  cvCounts: PropTypes.number,
  mainButtonText: PropTypes.string,
  type: PropTypes.string,
  buttonName: PropTypes.string
};

EditFavoriteListButton.defaultProps = {
  onPrimaryClick: () => {},
  onCancelClick: () => {},
  addToFavoriteDisabled: false,
  addToFavoriteActive: false,
  cvCounts: 0,
  mainButtonText: "Изменить",
  type: "primary",
  buttonName: "Добавить в избранные"
};
