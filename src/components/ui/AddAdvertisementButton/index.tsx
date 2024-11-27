import { Button } from 'antd';

import { ButtonTypes, TEXT } from 'config/constants';
import { ReactComponent as PlusIcon } from 'assets/icons/plus-icon.svg';
import { ReactNode } from 'react';

interface AddAdvertisementButtonProps
  extends React.ComponentProps<typeof Button> {
  onClick: () => void;
  className?: string;
  type?: ButtonTypes;
  icon?: ReactNode;
}

export const AddAdvertisementButton = ({
  onClick,
  className,
  type = ButtonTypes.primary,
  icon = <PlusIcon />,
  ...props
}: AddAdvertisementButtonProps) => (
  <Button
    block
    type={type}
    icon={icon}
    iconPosition="end"
    className={className}
    onClick={onClick}
    style={{ padding: '15px 20px', height: '48px' }}
    {...props}
  >
    {TEXT.ADD_ADVERTISEMENT}
  </Button>
);
