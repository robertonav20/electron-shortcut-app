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

function MenuComponent() {
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

  const onClick = (e: any) => {
    if (e.key === "add") {
      openAddDialog();
    }
    if (e.key === "clear") {
      openClearDialog();
    }
    if (e.key === "export") {
      openExportDialog();
    }
    if (e.key === "import") {
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
      <AddShortcutComponent isOpen={addDialog} closeModal={() => setAddDialog(false)}/>
      <ClearShortcutComponent isOpen={clearDialog} closeModal={() => setClearDialog(false)}/>
      <ExportShortcutComponent isOpen={exportDialog} closeModal={() => setExportDialog(false)}/>
      <ImportShortcutComponent isOpen={importDialog} closeModal={() => setImportDialog(false)} />
    </>
  );
}

export default MenuComponent;
