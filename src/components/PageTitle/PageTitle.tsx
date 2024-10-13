import { ReactNode } from 'react';
import React from 'react';
import { Typography } from 'antd';
import styles from './PageTitle.module.scss';

const { Title } = Typography;

interface PageTitleProps {
  children: ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return (
    <div className={styles.pageTitleWrap}>
      <Title className={styles.pageTitle}>{children}</Title>
    </div>
  );
};
