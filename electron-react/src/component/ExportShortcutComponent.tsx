import { Modal } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { getAllShortcut } from "../storage/crud";
import { exportFile, showSaveDialog } from "../service/utils";
import openNotification from "./Notification";

import "../style/export-style.scss"

function ExportShortcutComponent(props: { isOpen: boolean; closeModal: any }) {
  const close = () => {
    props.closeModal();
  };
  const exportAll = () => {
    getAllShortcut().then((rows) => {
      const options = {
        title: "Export shortcuts",
        defaultPath: "export_shortcuts.json",
        buttonLabel: "Export",
        filters: [{ name: "json", extensions: ["json"] }],
      };
      showSaveDialog(options).then(({ filePath }) => {
        if (filePath != undefined && filePath != "") {
          exportFile(filePath, JSON.stringify(rows), "utf-8").then(() => {
            openNotification({
              message: "All data exported successfully here " + filePath,
            });
          });
        }
      });
      close();
    });
  };

  return (
    <Modal
      open={props.isOpen}
      title="Export Shortcut"
      onCancel={close}
      onOk={exportAll}
    >
      <div className="export-modal-content">
        <ExportOutlined className="icon" />
        <p>Are you sure export all data?</p>
      </div>
    </Modal>
  );
}
export default ExportShortcutComponent;
