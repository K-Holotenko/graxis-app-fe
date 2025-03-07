import { Button as AntButton } from 'antd';

import { ButtonTypes } from 'src/config/constants';

import styles from './styles.module.scss';

interface ButtonProps {
  label?: string;
  type?: ButtonTypes;
  className?: string;
  isDisabled?: boolean;
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
    onClick={onClick}
  >
    {label}
  </AntButton>
);
