import { Menu } from "antd";
import { useState } from "react";
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

const MenuComponent = () => {
  const [addDialog, setAddDialog] = useState(false);
  const [clearDialog, setClearDialog] = useState(false);
  const [exportDialog, setExportDialog] = useState(false);
  const [importDialog, setImportDialog] = useState(false);

  const openAddDialog = () => {
    setAddDialog(!addDialog);
  };
  const openClearDialog = () => {
    setClearDialog(!clearDialog);
  };
  const openExportDialog = () => {
    setExportDialog(!exportDialog);
  };
  const openImportDialog = () => {
    setImportDialog(true);
  };

  const onClick = (e: any) => {
    if (e.key == "add") {
      openAddDialog();
    }
    if (e.key == "clear") {
      openClearDialog();
    }
    if (e.key == "export") {
      openExportDialog();
    }
    if (e.key == "import") {
      openImportDialog();
    }
  };

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={["shortcuts"]}
        mode="horizontal"
        theme="dark"
        items={items}
      ></Menu>
      <AddShortcutComponent open={addDialog} />
      <ClearShortcutComponent open={clearDialog} />
      <ExportShortcutComponent open={exportDialog} />
      <ImportShortcutComponent isOpen={importDialog} closeModal={() => setImportDialog(false)} />
    </>
  );
};

export default MenuComponent;
