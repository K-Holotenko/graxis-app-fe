import { Input as AntInput } from 'antd';

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
  className?: string;
  onChange?: () => void;
}

export const Input = ({
  type,
  maxLength,
  addonBefore,
  placeholder,
  className,
  onChange,
}: InputProps) => {
  switch (type) {
    case InputType.PASSWORD:
      return <AntInput.Password placeholder={placeholder} />;
    default:
      return (
        <AntInput
          type={type}
          maxLength={maxLength}
          addonBefore={addonBefore}
          placeholder={placeholder}
          className={className}
          onChange={onChange}
        />
      );
  }
};
