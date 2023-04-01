import { Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { notificationSuccess } from "./Notification";
import { removeActiveLayout } from "../storage/crud";

import "../style/clear-style.scss"

function ClearLayoutComponent(props: { isOpen: boolean; closeModal: any, refresh: any }) {
  const close = () => {
    props.closeModal();
  };

  const clear = () => {
    removeActiveLayout().then(() => {
      props.refresh();
      close();
      notificationSuccess({
        message: "Layout is deleted successfully",
      });
    });
  };

  return (
    <Modal
      open={props.isOpen}
      title="Clear Layout"
      onCancel={close}
      onOk={clear}
    >
      <div className="clear-modal-content">
        <DeleteOutlined className="icon" />
        <p>Are you sure delete layout?</p>
      </div>
    </Modal>
  );
}

export default ClearLayoutComponent;
