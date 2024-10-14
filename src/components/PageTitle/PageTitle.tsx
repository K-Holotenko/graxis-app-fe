import { ReactNode } from 'react';
import { Typography } from 'antd';
import styles from './PageTitle.module.scss';

const { Title } = Typography;

interface PageTitleProps {
  children: ReactNode;
}

export const PageTitle = ({ children }: PageTitleProps) => (
  <div className={styles.pageTitleWrap}>
    <Title className={styles.pageTitle}>{children}</Title>
  </div>
);
