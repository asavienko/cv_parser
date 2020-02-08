import { Modal } from "antd";

function InformationModal({
  type = "info",
  title = "Информационное сообщение",
  content
}) {
  Modal[type]({
    title,
    content
  });
}

export default InformationModal;
