import { Modal, Spin } from "antd";
import React from "react";
import { StyledBoldSpan } from "../../styles";

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
          По вашему запросу найденно: <StyledBoldSpan>{totalCv}</StyledBoldSpan>{" "}
          резюме
        </p>
      </Spin>
    </Modal>
  );
}
export default SearchModal;
