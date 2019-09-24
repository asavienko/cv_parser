import {notification} from "antd";

const openNotification = ({type = "info", message, description}) => {
  notification[type]({
    message,
    description,
  });
};
export default openNotification