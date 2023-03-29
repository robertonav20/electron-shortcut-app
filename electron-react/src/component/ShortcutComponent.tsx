import { Button, Tooltip } from "antd";
import { CodeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
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

  return (
    <div className="shortcut-button-card">
      <div className="shortcut-button-card-header">
        <span className="shortcut-button-title">{props.shortcut.title}</span>
      </div>
      <div className="shortcut-button-card-content">
        <Tooltip title={props.shortcut.action}>
          <Button
            className="shortcut-button"
            shape="circle"
            size={props.shortcut.size}
            type="primary"
            icon={<CodeOutlined />}
            onClick={() => action(props.shortcut.action)}
          />
        </Tooltip>
      </div>
      <div className="shortcut-button-card-footer">
        <div></div>
        <div
          className="edit-button-container"
          onClick={() => editShortcut(props.shortcut.id)}
        >
          <EditOutlined className="edit-button" />
        </div>
        <div
          className="delete-button-container"
          onClick={() => deleteShortcut(props.shortcut.id)}
        >
          <DeleteOutlined className="delete-button" />
        </div>
      </div>
    </div>
  );
}

export default ShortcutComponent;
