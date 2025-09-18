import { Col, Row } from 'antd';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface SingleColumnLayoutProps {
  title: ReactNode;
  children: ReactNode;
}

export const SingleColumnLayout = ({
  title,
  children,
}: SingleColumnLayoutProps) => (
  <section>
    <Row className={styles.titleContainer}>
      <Col span={24}>{title}</Col>
    </Row>
    <Row className={styles.tabsContainer}>
      <Col span={24}>{children}</Col>
    </Row>
  </section>
);
