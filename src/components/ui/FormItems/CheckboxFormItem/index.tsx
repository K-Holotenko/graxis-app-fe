import { Checkbox, Form } from 'antd';
import { Rule } from 'antd/es/form';

interface CheckboxFormItemProps {
  label: string;
  name?: string;
  rules?: Rule[];
}
export const CheckboxFormItem = ({
  label = 'Remember me',
  name = 'checkbox',
  rules = [],
}: CheckboxFormItemProps) => (
  <Form.Item valuePropName="checked" name={name} rules={rules}>
    <Checkbox>{label}</Checkbox>
  </Form.Item>
);
