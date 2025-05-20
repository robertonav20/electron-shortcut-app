import { Card, Divider, Form, Input, Modal, Popover } from "antd";
import { notificationError } from "./Notification";
import { addShortcut } from "../storage/crud";
import { AnyColorFormat, Colorpicker } from "antd-colorpicker";

import "../style/add-style.scss";
import { useState } from "react";

function AddShortcutComponent(props: {
  isOpen: boolean;
  closeModal: any;
  refresh: any;
}) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const [form] = Form.useForm();

  const close = () => {
    props.closeModal();
  };

  const onOk = () => {
    form.setFieldValue("color", color.hex);
    form.submit();
  };

  const onFinish = (values: any) => {
    addShortcut(
      values.action,
      values.color,
      values.icon,
      values.size,
      values.title,
      false,
      () => {
        props.refresh();
        onReset();
        close();
      }
    );
  };

  const onFinishFailed = (values: any) => {
    notificationError({ message: "Values are invalid" });
  };

  const onReset = () => {
    form.resetFields();
  };

  const initialColor = "#096dd9";
  const [color, setColor] = useState<AnyColorFormat>({
    hex: initialColor,
  });
  const colorpicker = (
    <Colorpicker
      blockStyles={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
      }}
      onColorResult={(color) => setColor(color)}
      value={color}
    />
  );
  const initialIconClass = "fi fi-ss-square-terminal";
  const [isForceReload, setForceReload] = useState(false);
  const [iconClass, setIconClass] = useState(initialIconClass);
  const [iconSize, setIconSize] = useState(30);
  const iconPreview = (color: any, iconSize: number) => {
    return (
      <Form.Item>
        <span
          className={iconClass}
          style={{ color: color.hex, fontSize: iconSize + "px" }}
        ></span>
      </Form.Item>
    );
  };
  return (
    <Modal
      open={props.isOpen}
      title="Add Shortcut"
      onCancel={close}
      onOk={onOk}
    >
      <div className="add-modal-content">
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onReset={onReset}
          initialValues={{ color: initialColor, icon: initialIconClass }}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="action" label="Action" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="color" label="Color" rules={[{ required: false }]}>
            <Popover content={colorpicker}>
              <Input value={color.hex} />
            </Popover>
          </Form.Item>
          <Form.Item name="icon" label="Icon" rules={[{ required: false }]}>
            <Input
              onChange={(event: any) => {
                setIconClass(event.target.value);
                setForceReload(true);
                setForceReload(false);
              }}
            />
          </Form.Item>
          <Form.Item name="size" label="Size" rules={[{ required: false }]}>
            <Input
              onChange={(event: any) => {
                setIconSize(event.target.value);
                setForceReload(true);
                setForceReload(false);
              }}
            />
          </Form.Item>
          <Divider />
          {isForceReload ? <>Reload...</> : iconPreview(color, iconSize)}
        </Form>
      </div>
    </Modal>
  );
}

export default AddShortcutComponent;
