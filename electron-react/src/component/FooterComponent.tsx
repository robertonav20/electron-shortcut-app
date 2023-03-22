import { Tooltip } from "antd";
import { Button, Divider } from "antd";
import { PlusOutlined, DeleteOutlined, ExportOutlined, ImportOutlined, ReloadOutlined } from "@ant-design/icons";

import "../style/footer-style.scss";

const openAddDialog = () => {};
const openClearDialog = () => {};
const openExportDialog = () => {};
const openImportDialog = () => {};
const refresh = () => {};

const FooterComponent = () => (
  <div className="footer-container">
    <span className="footer-left-item">Shortcut size </span>
    <div className="footer-right-item">
      <Tooltip title="Add">
        <Button
          className="action-button"
          shape="circle"
          size={"large"}
          type="primary"
          icon={<PlusOutlined/>}
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
          icon={<ReloadOutlined/>}
          onClick={refresh}
        ></Button>
      </Tooltip>
      <Tooltip title="Import">
        <Button
          className="action-button"
          shape="circle"
          size={"large"}
          type="primary"
          icon={<ImportOutlined/>}
          onClick={openImportDialog}
        ></Button>
      </Tooltip>
      <Tooltip title="Export">
        <Button
          className="action-button"
          shape="circle"
          size={"large"}
          type="primary"
          icon={<ExportOutlined/>}
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
          icon={<DeleteOutlined/>}
          onClick={openClearDialog}
        ></Button>
      </Tooltip>
    </div>
  </div>
);
export default FooterComponent;
