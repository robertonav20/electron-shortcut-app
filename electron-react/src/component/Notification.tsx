import { notification } from "antd";

const openNotification: React.FC = () => {
  notification.config({
    placement: 'topRight',
    duration: 3,
    rtl: true
  });

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string) => {
    api.success({ message });
  };
  return(<>{contextHolder}</>)
};


export default openNotification;
