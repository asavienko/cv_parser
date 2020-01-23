import { notification } from "antd";

const openNotification = ({
  type = "info",
  message,
  description,
  placement = "bottomLeft"
}) => {
  // notification type accepts values 'success', 'info', 'warning', 'error'

  notification[type]({
    message,
    description,
    placement
  });
};
export default openNotification;
