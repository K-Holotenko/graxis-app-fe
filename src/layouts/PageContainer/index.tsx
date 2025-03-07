import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  pageTitle: string;
}

export const PageContainer = ({ children, pageTitle }: PageContainerProps) => (
  <>
    <title>{pageTitle}</title>
    {children}
  </>
);
