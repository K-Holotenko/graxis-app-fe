import { Button } from 'antd';

import { ButtonTypes, TEXT } from 'config/constants';
import { ReactComponent as UserIcon } from 'assets/icons/user-icon.svg';
import { ReactNode } from 'react';

interface SignInButtonProps extends React.ComponentProps<typeof Button> {
  onClick: () => void;
  className?: string;
  type?: ButtonTypes;
  icon?: ReactNode;
}

export const SignInButton = ({
  onClick,
  className,
  type = ButtonTypes.default,
  icon = <UserIcon />,
  ...props
}: SignInButtonProps) => (
  <Button
    block
    type={type}
    icon={icon}
    iconPosition="start"
    className={className}
    onClick={onClick}
    style={{ padding: '12px 35px', height: '48px' }}
    {...props}
  >
    {TEXT.AUTHORIZE}
  </Button>
);
