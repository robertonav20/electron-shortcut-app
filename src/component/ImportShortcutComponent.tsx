import { Modal } from "antd";
import { ImportOutlined } from "@ant-design/icons";
import { addShortcut, removeActiveLayout } from "../storage/crud";
import { importFile, showOpenDialog } from "../service/utils";
import { notificationSuccess } from "./Notification";

import "../style/import-style.scss";

function ImportShortcutComponent(props: {
  isOpen: boolean;
  closeModal: any;
  refresh: any;
}) {
  const close = () => {
    props.closeModal();
  };

  const importAll = () => {
    const options = {
      title: "Import shortcuts",
      buttonLabel: "Import",
      filters: [{ extensions: ["json"] }],
      properties: ["openFile"],
    };
    showOpenDialog(options).then(({ filePaths }) => {
      removeActiveLayout().then(() => props.refresh());
      if (filePaths != undefined && filePaths.length > 0) {
        const filename = filePaths[0];
        importFile(filename, "utf-8").then((data) => {
          const rows = JSON.parse(data);
          rows.forEach((row: any) =>
            addShortcut(
              row.action,
              row.color,
              row.icon,
              row.size,
              row.title,
              false
            )
          );
          close();
          notificationSuccess({
            message: "All data imported from file " + filename,
          });
        });
      }
    });
  };

  return (
    <Modal
      open={props.isOpen}
      title="Import Shortcut"
      onCancel={close}
      onOk={importAll}
    >
      <div className="import-modal-content">
        <ImportOutlined className="icon" />
        <p>Are you sure import all data?</p>
      </div>
    </Modal>
  );
}

export default ImportShortcutComponent;
