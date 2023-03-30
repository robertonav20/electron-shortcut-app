import { notification } from "antd";

export function notificationSuccess(value: { message: string }) {
  notification.success({
    placement: "topRight",
    duration: 3,
    message: value.message,
  });
}

export function notificationError(value: { message: string }) {
  notification.error({
    placement: "topRight",
    duration: 3,
    message: value.message,
  });
}
