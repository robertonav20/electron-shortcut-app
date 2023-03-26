import { notification } from "antd";

export function notificationSuccess({message}) {
  notification.success({
    placement: "topRight",
    duration: 3,
    message
  });
}

export function notificationError({message}) {
  notification.error({
    placement: "topRight",
    duration: 3,
    message
  });
}