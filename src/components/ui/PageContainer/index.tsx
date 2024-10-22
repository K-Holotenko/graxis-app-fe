import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

interface PageContainerProps {
  children: ReactNode;
  pageTitle: string;
}

export const PageContainer = ({ children, pageTitle }: PageContainerProps) => (
  <>
    <Helmet>
      <title>{pageTitle}</title>
    </Helmet>
    {children}
  </>
);
