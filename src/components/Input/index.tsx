import { Input as AntInput, InputRef } from 'antd';
import { ReactNode, Ref } from 'react';

import styles from './styles.module.scss';

export enum InputType {
  TEL = 'tel',
  PASSWORD = 'password',
  EMAIL = 'email',
  TEXT = 'text',
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
  ref?: Ref<InputRef>;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
  ref,
  defaultValue,
  onChange,
  onBlur,
  onPressEnter,
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
          onPressEnter={onPressEnter}
        />
      );
    default:
      return (
        <AntInput
          ref={ref}
          className={`${styles.input} ${className}`}
          type={type}
          maxLength={maxLength}
          addonBefore={addonBefore}
          placeholder={placeholder}
          prefix={prefix}
          value={value}
          id={id}
          showCount={showCount}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          onPressEnter={onPressEnter}
        />
      );
  }
};
