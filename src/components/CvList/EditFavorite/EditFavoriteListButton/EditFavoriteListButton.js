import {Button, Dropdown, Menu} from "antd";
import React from "react";
import {CloseOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import {StyledCloseButton, StyledDivWrapper} from "./EditFavoriteListButton.styles";

export default function EditFavoriteListButton({
  onPrimaryClick,
  onCancelClick,
  addToFavoriteDisabled,
  addToFavoriteActive,
  selectedCvCounter,
  mainButtonText,
  type,
  buttonName
}) {
  const menu = () => (
    <Menu>
      <Menu.Item>Сохранить все результаты</Menu.Item>
    </Menu>
  );

  return (
    <StyledDivWrapper>
      {!addToFavoriteDisabled && addToFavoriteActive ? (
        <>
          <Dropdown.Button
            type={type}
            disabled={addToFavoriteDisabled}
            overlay={menu}
            placement="bottomCenter"
          >
            {`${mainButtonText}: ${selectedCvCounter} шт.`}
          </Dropdown.Button>
          <StyledCloseButton
            type="danger"
            shape="circle"
            icon={<CloseOutlined />}
            onClick={onCancelClick}
          />
        </>
      ) : (
        <Button
          type={type}
          disabled={addToFavoriteDisabled}
          onClick={onPrimaryClick}
        >
          {buttonName}
        </Button>
      )}
    </StyledDivWrapper>
  );
}

EditFavoriteListButton.propTypes = {
  onPrimaryClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  addToFavoriteDisabled: PropTypes.bool,
  addToFavoriteActive: PropTypes.bool,
  selectedCvCounter: PropTypes.number,
  mainButtonText: PropTypes.string,
  type: PropTypes.string,
  buttonName: PropTypes.string
};

EditFavoriteListButton.defaultProps = {
  onPrimaryClick: () => {},
  onCancelClick: () => {},
  addToFavoriteDisabled: false,
  addToFavoriteActive: false,
  selectedCvCounter: 0,
  mainButtonText: "Сохранить",
  type: "primary",
  buttonName: "Сохранить"
};
