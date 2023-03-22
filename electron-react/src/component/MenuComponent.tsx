import { Menu } from "antd";
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

const onClick = (e: any) => {
  console.log("click ", e);
  if (e.key == "import") {
  }
};

const MenuComponent = () => (
  <Menu
    onClick={onClick}
    selectedKeys={["shortcuts"]}
    mode="horizontal"
    theme="dark"
    items={items}
  >
    <ImportShortcutComponent open={true} />
  </Menu>
);
export default MenuComponent;
