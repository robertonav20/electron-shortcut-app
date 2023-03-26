import { Menu } from "antd";
import { Component } from "react";
import AddShortcutComponent from "./AddShortcutComponent";
import ClearShortcutComponent from "./ClearShortcutComponent";
import ExportShortcutComponent from "./ExportShortcutComponent";
import ImportShortcutComponent from "./ImportShortcutComponent";

const items = [
  {
    label: "Settings",
    key: "settings",
    children: [
      {
        type: "group",
        label: "Shortcuts",
        key: "shortcuts",
        children: [
          {
            label: "Add",
            key: "add",
          },
        ],
      },
      {
        type: "group",
        label: "DB Configuration",
        key: "configuration",
        children: [
          {
            label: "Refresh",
            key: "refresh",
          },
          {
            label: "Import",
            key: "import",
          },
          {
            label: "Export",
            key: "export",
          },
          {
            label: "Clear",
            key: "clear",
          },
        ],
      },
    ],
  },
];

class MenuComponent extends Component<any, any> {
  constructor(props: {refresh: any}) {
    super(props);

    this.state = {
      addDialog: false,
      clearDialog: false,
      exportDialog: false,
      importDialog: false,
    };
  }

  setAddDialog = (value: boolean) => {
    this.setState({ addDialog: value });
  };
  setClearDialog = (value: boolean) => {
    this.setState({ clearDialog: value });
  };
  setExportDialog = (value: boolean) => {
    this.setState({ clearDialog: value });
  };
  setImportDialog = (value: boolean) => {
    this.setState({ clearDialog: value });
  };

  onClick = (e: any) => {
    if (e.key === "add") {
      this.setAddDialog(true);
    }
    if (e.key === "clear") {
      this.setClearDialog(true);
    }
    if (e.key === "export") {
      this.setExportDialog(true);
    }
    if (e.key === "import") {
      this.setImportDialog(true);
    }
  };

  render() {
    return (
      <>
        <Menu
          onClick={this.onClick}
          selectedKeys={["shortcuts"]}
          mode="horizontal"
          theme="dark"
          items={items}
        ></Menu>
        <AddShortcutComponent
          isOpen={this.state.addDialog}
          closeModal={() => this.setAddDialog(false)}
          refresh={this.props.refresh}
        />
        <ClearShortcutComponent
          isOpen={this.state.clearDialog}
          closeModal={() => this.setClearDialog(false)}
          refresh={this.props.refresh}
        />
        <ExportShortcutComponent
          isOpen={this.state.exportDialog}
          closeModal={() => this.setExportDialog(false)}
          refresh={this.props.refresh}
        />
        <ImportShortcutComponent
          isOpen={this.state.importDialog}
          closeModal={() => this.setImportDialog(false)}
          refresh={this.props.refresh}
        />
      </>
    );
  }
}

export default MenuComponent;
