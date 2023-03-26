import { Form, Input, Modal } from "antd";
import { notificationError } from "./Notification";
import { addShortcut } from "../storage/crud";

import "../style/add-style.scss";

function AddShortcutComponent(props: { isOpen: boolean; closeModal: any, refresh: any}) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const [form] = Form.useForm();

  const close = () => {
    props.closeModal();
  };

  const onOk = () => {
    form.submit();
  }

  const onFinish = (values: any) => {
    addShortcut(values.action, "code", "large", values.title, false, () => {
      props.refresh()
      onReset();
      close();
    });
  };

  const onFinishFailed = (values: any) => {
    notificationError({ message: "Values are invalid" });
  };

  const onReset = () => {
    form.resetFields();
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
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="action" label="Action" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default AddShortcutComponent;
