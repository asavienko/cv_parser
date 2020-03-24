import { Modal, Spin } from "antd";
import React from "react";
import PropTypes from "prop-types";
import { StyledBoldSpan } from "../../../../styles";

function SearchModal({
  modalVisible,
  modalLoading,
  handleModalCancel,
  handleModalOk,
  modalData: { totalCv },
  okButtonLoading
}) {
  const okButtonDisabled = !totalCv || modalLoading;
  return (
    <Modal
      visible={modalVisible}
      onCancel={handleModalCancel}
      okButtonProps={{ disabled: okButtonDisabled, loading: okButtonLoading }}
      onOk={handleModalOk}
      title="Сохранить резюме в базу"
      okText="Сохранить"
      cancelText="Отмена"
    >
      <Spin tip="Ищем резюме..." spinning={modalLoading}>
        <p>
          По вашему запросу найденно: 
          {' '}
          <StyledBoldSpan>{totalCv}</StyledBoldSpan>
          {" "}
          резюме
        </p>
      </Spin>
    </Modal>
  );
}

SearchModal.propTypes = {
  modalData: PropTypes.objectOf(PropTypes.number),
  modalVisible: PropTypes.bool,
  modalLoading: PropTypes.bool,
  okButtonLoading: PropTypes.bool,
  handleModalCancel: PropTypes.func,
  handleModalOk: PropTypes.func
};

SearchModal.defaultProps = {
  modalData: { totalCvs: 0 },
  modalVisible: false,
  modalLoading: false,
  okButtonLoading: false,
  handleModalCancel: () => {},
  handleModalOk: () => {}
};

export default SearchModal;
