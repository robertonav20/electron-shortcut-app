import { Tooltip } from "antd";
import { Button, Divider } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
} from "@ant-design/icons";

import { Component } from "react";
import ImportShortcutComponent from "./ImportShortcutComponent";
import AddShortcutComponent from "./AddShortcutComponent";
import ClearShortcutComponent from "./ClearShortcutComponent";
import ExportShortcutComponent from "./ExportShortcutComponent";

import "../style/footer-style.scss";

class FooterComponent extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      addDialog: false,
      clearShortcutDialog: false,
      clearLayoutDialog: false,
      exportDialog: false,
      importDialog: false,
    };
  }

  openAddDialog = () => {
    this.setState({ addDialog: true });
  };
  openClearDialog = () => {
    this.setState({ clearShortcutDialog: true });
  };
  openExportDialog = () => {
    this.setState({ exportDialog: true });
  };
  openImportDialog = () => {
    this.setState({ importDialog: true });
  };

  render() {
    return (
      <div className="footer-container">
        <div className="footer-right-item">
          <span className="footer-counter-item">{this.props.size}</span>
          <Divider type="vertical" className="action-divider" />
          <Tooltip title="Add">
            <Button
              className="action-button"
              shape="circle"
              size={"large"}
              type="primary"
              icon={<PlusOutlined />}
              onClick={this.openAddDialog}
            ></Button>
          </Tooltip>
          <Divider type="vertical" className="action-divider" />
          <Tooltip title="Import">
            <Button
              className="action-button"
              shape="circle"
              size={"large"}
              type="primary"
              icon={<ImportOutlined />}
              onClick={this.openImportDialog}
            ></Button>
          </Tooltip>
          <Tooltip title="Export">
            <Button
              className="action-button"
              shape="circle"
              size={"large"}
              type="primary"
              icon={<ExportOutlined />}
              onClick={this.openExportDialog}
            ></Button>
          </Tooltip>
          <Divider type="vertical" className="action-divider" />
          <Tooltip title="Clear Shortcut">
            <Button
              className="action-button"
              shape="circle"
              size={"large"}
              type="primary"
              icon={<DeleteOutlined />}
              onClick={this.openClearDialog}
            ></Button>
          </Tooltip>
        </div>
        <AddShortcutComponent
          isOpen={this.state.addDialog}
          closeModal={() => this.setState({ addDialog: false })}
          refresh={this.props.refresh}
        />
        <ImportShortcutComponent
          isOpen={this.state.importDialog}
          closeModal={() => this.setState({ importDialog: false })}
          refresh={this.props.refresh}
        />
        <ExportShortcutComponent
          isOpen={this.state.exportDialog}
          closeModal={() => this.setState({ exportDialog: false })}
          refresh={this.props.refresh}
        />
        <ClearShortcutComponent
          isOpen={this.state.clearShortcutDialog}
          closeModal={() => this.setState({ clearShortcutDialog: false })}
          refresh={this.props.refresh}
        />
      </div>
    );
  }
}

export default FooterComponent;
