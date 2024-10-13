import { ReactNode } from 'react';
import React from 'react';

interface PhoneConfirmationMessage {
  children: ReactNode;
  className?: string;
}

export const PhoneConfirmationMessage: React.FC<PhoneConfirmationMessage> = ({
  children,
  className,
}) => {
  return <p className={className}>{children}</p>;
};
