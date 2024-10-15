import { Form, Input } from 'antd';
import { Rule } from 'antd/lib/form';
import styles from './InputField.module.scss';

interface InputFieldProps {
  name: string;
  label: string;
  rules?: Rule[];
  placeholder: string;
  type?: 'text' | 'password' | 'email' | 'phone';
  addonBefore?: React.ReactNode;
  dependencies?: string[];
  hasFeedback?: boolean;
  className?: string;
}

export const InputField = ({
  name,
  label,
  rules,
  placeholder,
  type = 'text',
  addonBefore,
  dependencies,
  hasFeedback,
  className,
}: InputFieldProps) => (
  <Form.Item
    name={name}
    label={label}
    rules={rules}
    dependencies={dependencies}
    hasFeedback={hasFeedback}
  >
    <Input
      type={type}
      placeholder={placeholder}
      addonBefore={addonBefore}
      className={`${styles.customInput} ${className}`}
    />
  </Form.Item>
);
