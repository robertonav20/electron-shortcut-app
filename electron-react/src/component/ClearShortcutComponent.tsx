import { Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import openNotification from "./Notification";
import { deleteAll } from "../storage/crud";

import "../style/clear-style.scss"

function ClearShortcutComponent(props: { isOpen: boolean; closeModal: any }) {
  const close = () => {
    props.closeModal();
  };
  const refresh = () => {
    props.closeModal();
  };
  const clear = () => {
    deleteAll().then(() => {
      openNotification({
        message: "All data are deleted successfully",
      });
      refresh();
      close();
    });
  };

  return (
    <Modal
      open={props.isOpen}
      title="Clear Shortcut"
      onCancel={close}
      onOk={clear}
    >
      <div className="clear-modal-content">
        <DeleteOutlined className="icon" />
        <p>Are you sure delete data?</p>
      </div>
    </Modal>
  );
}
export default ClearShortcutComponent;
