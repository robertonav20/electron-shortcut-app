import { Button, Dropdown, Tooltip, Space } from "antd";
import { CodeOutlined, EditOutlined, DeleteOutlined, ToolOutlined } from "@ant-design/icons";
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
      label: <EditOutlined className="edit-button" onClick={() => editShortcut(props.shortcut.id)}/>,
      key: 'edit',
    },
    {
      label: <DeleteOutlined className="delete-button" onClick={() => deleteShortcut(props.shortcut.id)}/>,
      key: 'delete',
    }
  ]

  return (
    <div className="shortcut-button-card">
      <div className="shortcut-button-card-header">
        <Tooltip title={props.shortcut.title}><span className="shortcut-button-title">{props.shortcut.title}</span></Tooltip>
        <Dropdown menu={{ items }} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space><ToolOutlined className="shortcut-settings-button"/></Space>
          </a>
        </Dropdown>
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
    </div>
  );
}

export default ShortcutComponent;
