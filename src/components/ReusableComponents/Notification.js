import { notification } from "antd";

const openNotification = ({
  type = "info",
  message,
  description,
  placement = "bottomLeft"
}) => {
  notification[type]({
    message,
    description,
    placement
  });
};
export default openNotification;
