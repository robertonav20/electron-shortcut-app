import { Button } from "antd";
import { CaretDownOutlined, CaretUpOutlined, CodeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../style/view-style.scss";

const data: Array<any> = [
  {
    id: 1,
    action: "action",
    size: "large",
  },
];

const action = (action: any) => {};
const moveUpShortcut = (id: any) => {};
const moveDownShortcut = (id: any) => {};
const editShortcut = (id: any) => {};
const deleteShortcut = (id: any) => {};

const View = () => (
  <div className="shortcuts-container">
    {data.map((d: any, index: number) => (
      <div className="shortcut-button-card" key={index}>
        <div className="shortcut-button-card-header">
          <span className="shortcut-button-title">{d.title}</span>
        </div>
        <div className="shortcut-button-card-content">
          <Button
            className="shortcut-button"
            shape="circle"
            size={d.size}
            type="primary"
            icon={<CodeOutlined/>}
            onClick={() => action(d.action)}
          />
        </div>
        <div className="shortcut-button-card-footer">
          <div className="move-up-button-container">
            <CaretUpOutlined
              className="move-up-button"
              onClick={() => moveUpShortcut(d.id)}
            />
          </div>
          <div className="move-down-button-container">
            <CaretDownOutlined
              className="move-down-button"
              onClick={() => moveDownShortcut(d.id)}
            />
          </div>
          <div className="edit-button-container">
            <EditOutlined
              className="edit-button"
              onClick={() => editShortcut(d.id)}
            />
          </div>
          <div className="delete-button-container">
            <DeleteOutlined
              className="delete-button"
              onClick={() => deleteShortcut(d.id)}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);
export default View;
