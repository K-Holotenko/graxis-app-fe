import { Form, Input } from 'antd';

type FieldType = {
  email: string;
};

export const EmailFormItem = () => (
  <Form.Item<FieldType>
    label="email"
    name="email"
    rules={[{ required: true, message: 'Please input your username!' }]}
  >
    <Input />
  </Form.Item>
);
