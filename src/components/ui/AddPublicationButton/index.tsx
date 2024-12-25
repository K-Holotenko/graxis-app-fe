import { Button } from 'antd';
import { ComponentProps, ReactNode } from 'react';

import { ButtonTypes, TEXT } from 'src/config/constants';
import { ReactComponent as PlusIcon } from 'src/assets/icons/plus-icon.svg';

interface AddPublicationButtonProps extends ComponentProps<typeof Button> {
  onClick: () => void;
  className?: string;
  type?: ButtonTypes;
  icon?: ReactNode;
}

export const AddPublicationButton = ({
  onClick,
  className,
  type = ButtonTypes.primary,
  icon = <PlusIcon />,
  ...props
}: AddPublicationButtonProps) => (
  <Button
    block
    type={type}
    icon={icon}
    iconPosition="end"
    className={className}
    onClick={onClick}
    style={{ padding: '15px 20px', height: '48px' }}
    data-testid="add-publication-btn"
    {...props}
  >
    {TEXT.ADD_PUBLICATION}
  </Button>
);
