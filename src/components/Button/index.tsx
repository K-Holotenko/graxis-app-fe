import { Button as AntButton } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';

import { ButtonTypes } from 'src/config/constants';

import styles from './styles.module.scss';

interface ButtonProps {
  label?: string;
  type?: ButtonTypes;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: SizeType;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  htmlType?: 'button' | 'submit' | 'reset';
  dataTestId?: string;
  onClick?: () => void;
}

export const Button = ({
  label,
  type = ButtonTypes.primary,
  className,
  isDisabled,
  icon,
  iconPosition,
  htmlType,
  dataTestId,
  isLoading,
  size,
  onClick,
}: ButtonProps) => (
  <AntButton
    block
    className={`${styles.button} ${className}`}
    type={type}
    icon={icon}
    iconPosition={iconPosition}
    disabled={isDisabled}
    htmlType={htmlType}
    data-testid={dataTestId}
    size={size}
    loading={isLoading}
    onClick={onClick}
  >
    {label}
  </AntButton>
);
