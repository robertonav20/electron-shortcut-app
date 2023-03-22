import type { NotificationPlacement } from "antd/es/notification/interface";
import { notification } from "antd";

const [api] = notification.useNotification();
const openNotification = (
  message: string,
  placement: NotificationPlacement
) => {
  api.info({
    message,
    placement,
  });
};

export default openNotification;
