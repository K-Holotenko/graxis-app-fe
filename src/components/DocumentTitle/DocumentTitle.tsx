import { ReactNode } from 'react';
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface DocumentTitleProps {
  children: ReactNode;
}

export const DocumentTitle: React.FC<DocumentTitleProps> = ({ children }) => {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
};
