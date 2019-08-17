import { Button } from "antd";
import React from "react";
import styled from "styled-components";

const StyledCloseButton = styled(Button)`
  margin-left: 5px;
`;

const StyledDivWrapper = styled.div`
height: 40px;
`

export function EditFavoriteListButton({
  addToFavoriteDisabled,
  onPrimaryClick,
  addToFavoriteActive,
  cvCounts,
  onCancelClick
}) {
  return (
    <StyledDivWrapper>
      <Button
        type="primary"
        onClick={onPrimaryClick}
        disabled={addToFavoriteDisabled}
      >
        {addToFavoriteActive
          ? `Добавить ${cvCounts} резюме`
          : `Добавить в избранные`}
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
