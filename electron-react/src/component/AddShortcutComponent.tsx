import { Modal } from "antd";

import "../style/add-style.scss"

function AddShortcutComponent(props: { isOpen: boolean; closeModal: any }) {
  const close = () => {
    props.closeModal();
  };

  return (
    <Modal
      open={props.isOpen}
      title="Add Shortcut"
      onCancel={close}
      onOk={close}
    >
      <div className="add-modal-content">
        <p>Are you sure add all data?</p>
      </div>
    </Modal>
  );
}

export default AddShortcutComponent;
