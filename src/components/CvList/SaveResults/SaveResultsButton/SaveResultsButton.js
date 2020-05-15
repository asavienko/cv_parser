import {Button, Dropdown, Menu} from "antd";
import React from "react";
import {CloseOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import {StyledCloseButton, StyledDivWrapper} from "./SaveResultsButton.styles";

export default function SaveResultsButton({
  onPrimaryClick,
  onCancelClick,
  saveDisabled,
  saveActive,
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
      {!saveDisabled && saveActive ? (
        <>
          <Dropdown.Button
            type={type}
            disabled={saveDisabled}
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
          disabled={saveDisabled}
          onClick={onPrimaryClick}
        >
          {buttonName}
        </Button>
      )}
    </StyledDivWrapper>
  );
}

SaveResultsButton.propTypes = {
  onPrimaryClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  saveDisabled: PropTypes.bool,
  saveActive: PropTypes.bool,
  selectedCvCounter: PropTypes.number,
  mainButtonText: PropTypes.string,
  type: PropTypes.string,
  buttonName: PropTypes.string
};

SaveResultsButton.defaultProps = {
  onPrimaryClick: () => {},
  onCancelClick: () => {},
  saveDisabled: false,
  saveActive: false,
  selectedCvCounter: 0,
  mainButtonText: "Сохранить",
  type: "primary",
  buttonName: "Сохранить"
};
