import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

interface DocumentTitleProps {
  children: ReactNode;
}

export const DocumentTitle = ({ children }: DocumentTitleProps) => (
  <Helmet>
    <title>{children}</title>
  </Helmet>
);
