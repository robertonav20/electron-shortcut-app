import { Button, Dropdown, Tooltip, Space } from "antd";
import {
  CodeOutlined,
  EditOutlined,
  DeleteOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { launch } from "../service/shortcut";
import { removeShortcut } from "../storage/crud";

import "../style/shortcut-style.scss";

function ShortcutComponent(props: { shortcut: any; refresh: any }) {
  const action = (action: string) => {
    launch(action);
  };
  const editShortcut = (id: any) => {};
  const deleteShortcut = (id: any) => {
    removeShortcut(id, true).then(() => {
      props.refresh();
    });
  };

  const items = [
    {
      label: (
        <EditOutlined
          className="edit-button"
          onClick={() => editShortcut(props.shortcut.id)}
        />
      ),
      key: "edit",
    },
    {
      label: (
        <DeleteOutlined
          className="delete-button"
          onClick={() => deleteShortcut(props.shortcut.id)}
        />
      ),
      key: "delete",
    },
  ];

  const defaultColor = "#096dd9";
  const defaultIcon = "fi fi-ss-square-terminal";
  const defaultSize = "30px";

  console.log(props.shortcut);
  return (
    <div
      className="shortcut-button-card"
      style={{
        border:
          "1px solid " +
          (props.shortcut.color ? props.shortcut.color : defaultColor),
        borderLeftWidth: 10,
        borderLeftColor: props.shortcut.color
          ? props.shortcut.color
          : defaultColor,
        boxShadow:
          "1px 2px " +
          (props.shortcut.color ? props.shortcut.color : defaultColor),
      }}
    >
      <div className="shortcut-button-card-header">
        <Tooltip title={props.shortcut.title}>
          <span className="shortcut-button-title">{props.shortcut.title}</span>
        </Tooltip>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <ToolOutlined className="shortcut-settings-button" />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div className="shortcut-button-card-content">
        <Tooltip title={props.shortcut.action}>
          <span
            className={
              "shortcut-button " +
              (props.shortcut.icon ? props.shortcut.icon : defaultIcon)
            }
            style={{
              fontSize: props.shortcut.size
                ? props.shortcut.size + "px"
                : defaultSize,
              color: props.shortcut.color ? props.shortcut.color : defaultColor,
            }}
            onClick={() => action(props.shortcut.action)}
          ></span>
        </Tooltip>
      </div>
    </div>
  );
}

export default ShortcutComponent;
