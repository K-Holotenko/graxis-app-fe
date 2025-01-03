import { Form, Input } from 'antd';
import { Rule } from 'antd/es/form';

import styles from './styles.module.scss';

interface TextAreaProps {
  name: string;
  label?: string;
  rules?: Rule[];
  placeholder?: string;
  showCount?: boolean;
  maxLength?: number;
  rows?: number;
}

export const TextArea = ({
  name = '',
  label,
  rules,
  placeholder,
  showCount = false,
  maxLength,
  rows = 1,
}: TextAreaProps) => (
  <Form.Item
    label={
      <p className={`${styles.formItemLabel} addPublicationLabel`}>{label}</p>
    }
    name={name}
    rules={rules}
    required={false}
  >
    <Input.TextArea
      placeholder={placeholder}
      showCount={showCount}
      maxLength={maxLength}
      rows={rows}
      autoSize={{ minRows: rows, maxRows: rows }}
    />
  </Form.Item>
);
