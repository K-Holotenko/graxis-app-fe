import { Col, Row } from 'antd';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface MyPublicationsLayoutProps {
  title: ReactNode;
  tabs: ReactNode;
}

export const MyPublicationsLayout = ({
  title,
  tabs,
}: MyPublicationsLayoutProps) => (
  <section>
    <Row className={styles.titleContainer}>
      <Col span={24}>{title}</Col>
    </Row>
    <Row className={styles.tabsContainer}>
      <Col span={24}>{tabs}</Col>
    </Row>
  </section>
);
