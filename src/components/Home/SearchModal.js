import { Modal } from "antd";
import React from "react";

function SearchModal({ modalVisible, handleModalCancel }) {
  return (
    <Modal
      title="Basic Modal"
      visible={modalVisible}
      onCancel={handleModalCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}
export default SearchModal;
