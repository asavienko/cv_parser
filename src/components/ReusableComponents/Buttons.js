import { Button } from "antd";
import React from "react";
import styled from "styled-components";

const StyledCloseButton = styled(Button)`
  margin-left: 5px;
`;

const StyledDivWrapper = styled.div`
  height: 40px;
`;

export function EditFavoriteListButton({
  addToFavoriteDisabled,
  onPrimaryClick,
  addToFavoriteActive,
  cvCounts,
  onCancelClick,
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
          ? `Изменить ${cvCounts} резюме`
          : buttonName}
      </Button>
      {addToFavoriteActive && (
        <StyledCloseButton
          type="danger"
          shape="circle"
          icon="close"
          onClick={onCancelClick}
        />
      )}
    </StyledDivWrapper>
  );
}