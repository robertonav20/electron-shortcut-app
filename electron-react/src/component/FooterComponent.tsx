import { Tooltip } from "antd";
import { Button, Divider } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import "../style/footer-style.scss";
import { useState } from "react";
import ImportShortcutComponent from "./ImportShortcutComponent";
import AddShortcutComponent from "./AddShortcutComponent";
import ClearShortcutComponent from "./ClearShortcutComponent";
import ExportShortcutComponent from "./ExportShortcutComponent";

const FooterComponent = () => {
  const [addDialog, setAddDialog] = useState(false);
  const [clearDialog, setClearDialog] = useState(false);
  const [exportDialog, setExportDialog] = useState(false);
  const [importDialog, setImportDialog] = useState(false);

  const openAddDialog = () => {
    setAddDialog(true);
  };
  const openClearDialog = () => {
    setClearDialog(true);
  };
  const openExportDialog = () => {
    setExportDialog(true);
  };
  const openImportDialog = () => {
    setImportDialog(true);
  };
  const refresh = () => {};

  return (
    <div className="footer-container">
      <span className="footer-left-item">Shortcut size </span>
      <div className="footer-right-item">
        <Tooltip title="Add">
          <Button
            className="action-button"
            shape="circle"
            size={"large"}
            type="primary"
            icon={<PlusOutlined />}
            onClick={openAddDialog}
          ></Button>
        </Tooltip>
        <Divider type="vertical" className="action-divider" />
        <Tooltip title="Refresh">
          <Button
            className="action-button"
            shape="circle"
            size={"large"}
            type="primary"
            icon={<ReloadOutlined />}
            onClick={refresh}
          ></Button>
        </Tooltip>
        <Tooltip title="Import">
          <Button
            className="action-button"
            shape="circle"
            size={"large"}
            type="primary"
            icon={<ImportOutlined />}
            onClick={openImportDialog}
          ></Button>
        </Tooltip>
        <Tooltip title="Export">
          <Button
            className="action-button"
            shape="circle"
            size={"large"}
            type="primary"
            icon={<ExportOutlined />}
            onClick={openExportDialog}
          ></Button>
        </Tooltip>
        <Divider type="vertical" className="action-divider" />
        <Tooltip title="Clear">
          <Button
            className="action-button"
            shape="circle"
            size={"large"}
            type="primary"
            icon={<DeleteOutlined />}
            onClick={openClearDialog}
          ></Button>
        </Tooltip>
      </div>
      <AddShortcutComponent isOpen={addDialog} closeModal={() => setAddDialog(false)}/>
      <ClearShortcutComponent isOpen={clearDialog} closeModal={() => setClearDialog(false)}/>
      <ExportShortcutComponent isOpen={exportDialog} closeModal={() => setExportDialog(false)}/>
      <ImportShortcutComponent isOpen={importDialog} closeModal={() => setImportDialog(false)} />
    </div>
  );
};
export default FooterComponent;
