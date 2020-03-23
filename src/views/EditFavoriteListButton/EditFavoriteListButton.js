import { Button } from "antd";
import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import {
  StyledCloseButton,
  StyledDivWrapper
} from "./EditFavoriteListButton.styles";

export default function EditFavoriteListButton({
  addToFavoriteDisabled,
  onPrimaryClick,
  addToFavoriteActive,
  cvCounts,
  onCancelClick,
  mainButtonText = "Изменить",
  type = "primary",
  buttonName = "Добавить в избранные"
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
