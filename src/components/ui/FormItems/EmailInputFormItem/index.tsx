import { Form, Input } from 'antd';
import { Rule } from 'antd/es/form';

import { REGEXS, TEXT } from 'src/config/constants';

interface EmailInputFormItemProps {
  label: string;
  rules?: Rule[];
  placeholder?: string;
}

export const EmailInputFormItem = ({
  label = 'Email',
  rules = [],
  placeholder = TEXT.INPUT_EMAIL,
}: EmailInputFormItemProps) => {
  const form = Form.useFormInstance();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue(
      'email',
      e.target.value.replace(REGEXS.notAsciiChars, '')
    );
  };

  return (
    <Form.Item label={label} name="email" rules={rules}>
      <Input placeholder={placeholder} onChange={onChange} />
    </Form.Item>
  );
};
