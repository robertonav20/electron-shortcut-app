import { Button } from "antd";
import { CodeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { launch } from "../service/shortcut";

import "../style/shortcut-style.scss"

function ShortcutComponent(props: { shortcut: any }) {
  const action = (action: string) => {
    launch(action);
  };
  const editShortcut = (id: any) => {};
  const deleteShortcut = (id: any) => {};

  return (
    <div className="shortcut-button-card">
      <div className="shortcut-button-card-header">
        <span className="shortcut-button-title">{props.shortcut.title}</span>
      </div>
      <div className="shortcut-button-card-content">
        <Button
          className="shortcut-button"
          shape="circle"
          size={props.shortcut.size}
          type="primary"
          icon={<CodeOutlined />}
          onClick={() => action(props.shortcut.action)}
        />
      </div>
      <div className="shortcut-button-card-footer">
        <div className="edit-button-container">
          <EditOutlined
            className="edit-button"
            onClick={() => editShortcut(props.shortcut.id)}
          />
        </div>
        <div className="delete-button-container">
          <DeleteOutlined
            className="delete-button"
            onClick={() => deleteShortcut(props.shortcut.id)}
          />
        </div>
      </div>
    </div>
  );
}

export default ShortcutComponent;
