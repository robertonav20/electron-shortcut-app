import { Modal } from "antd";
import { useState } from "react";
import { ImportOutlined } from "@ant-design/icons";
import { addShortcut } from "../storage/crud";
import { importFile, showOpenDialog } from "../service/utils";
import openNotification from "../service/notification";

const [open, setIsModalOpen] = useState(false);

const showModal = () => {
  setIsModalOpen(true);
};

const handleOk = () => {
  setIsModalOpen(false);
};

const handleCancel = () => {
  setIsModalOpen(false);
};

const closeModal = () => {}
const importAll = () => {
  const options = {
    title: "Import shortcuts",
    buttonLabel: "Import",
    filters: [{ extensions: ["json"] }],
    properties: ["openFile"],
  };
  showOpenDialog(options).then(({ filePaths }) => {
    if (filePaths != undefined && filePaths.length > 0) {
      const filename = filePaths[0];
      importFile(filename, "utf-8").then((data) => {
        const rows = JSON.parse(data);
        rows.forEach((row: any) =>
          addShortcut(row.action, row.icon, row.size, row.title, false)
        );
        openNotification("All data imported from file " + filename, "topRight");
        //this.refresh();
        handleCancel();
      });
    }
  });
}

const ImportShortcutComponent = (open: boolean) => (
  <Modal
    open={open}
    title="Import Shortcut"
    onCancel={closeModal}
    onOk={importAll}
  >
    <div className="ant-modal-body">
      <ImportOutlined className="icon" />
      <p>Are you sure import all data?</p>
    </div>
  </Modal>
);
export default ImportShortcutComponent;