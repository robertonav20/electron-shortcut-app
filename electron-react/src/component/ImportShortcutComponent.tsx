import { Modal } from "antd";
import { ImportOutlined } from "@ant-design/icons";
import { addShortcut } from "../storage/crud";
import { importFile, showOpenDialog } from "../service/utils";
import openNotification from "./Notification";

function ImportShortcutComponent(props: { isOpen: boolean, closeModal: any}) {
  const close = () => {props.closeModal();};
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
          openNotification("All data imported from file " + filename);
          //this.refresh();
          close();
        });
      }
      close();
    });
  };

  return (
    <Modal
      open={props.isOpen}
      title="Import Shortcut"
      onCancel={close}
      onOk={importAll}
    >
      <div className="ant-modal-body">
        <ImportOutlined className="icon" />
        <p>Are you sure import all data?</p>
      </div>
    </Modal>
  );
}

export default ImportShortcutComponent;

