import { Input as AntInput } from 'antd';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

export enum InputType {
  TEL = 'tel',
  PASSWORD = 'password',
  EMAIL = 'email',
}

interface InputProps {
  type?: InputType;
  maxLength?: number;
  addonBefore?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  id?: string;
  prefix?: ReactNode;
  showCount?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

export const Input = ({
  type,
  maxLength,
  addonBefore,
  placeholder,
  value,
  className,
  id,
  prefix,
  showCount,
  onChange,
  onBlur,
}: InputProps) => {
  switch (type) {
    case InputType.PASSWORD:
      return (
        <AntInput.Password
          className={`${styles.input} ${className}`}
          placeholder={placeholder}
          value={value}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
        />
      );
    default:
      return (
        <AntInput
          className={`${styles.input} ${className}`}
          type={type}
          maxLength={maxLength}
          addonBefore={addonBefore}
          placeholder={placeholder}
          prefix={prefix}
          value={value}
          id={id}
          showCount={showCount}
          onChange={onChange}
          onBlur={onBlur}
        />
      );
  }
};
