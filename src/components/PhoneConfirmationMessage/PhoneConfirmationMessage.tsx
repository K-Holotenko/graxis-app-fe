import { ReactNode } from 'react';

interface PhoneConfirmationMessageProps {
  children: ReactNode;
  className?: string;
}

export const PhoneConfirmationMessage = ({
  children,
  className,
}: PhoneConfirmationMessageProps) => <p className={className}>{children}</p>;
