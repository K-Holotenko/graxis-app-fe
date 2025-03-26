import { Col, Row } from 'antd';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface PublicationLayoutProps {
  breadcrumbs: ReactNode;
  main: ReactNode;
  sidebar: ReactNode;
  map: ReactNode;
}

export const PublicationLayout = ({
  breadcrumbs,
  main,
  sidebar,
  map,
}: PublicationLayoutProps) => (
  <>
    <Row>
      <Col span={24}>{breadcrumbs}</Col>
    </Row>
    <Row className={styles.topContentContainer}>
      <Col
        xl={{ span: 13 }}
        xs={{ span: 24 }}
        className={styles.leftContentSection}
      >
        {main}
      </Col>
      <Col
        xl={{ span: 10, offset: 1 }}
        xs={{ span: 24 }}
        className={styles.rightContentSection}
      >
        {sidebar}
      </Col>
    </Row>
    <Row className={styles.bottomContentContainer}>
      <Col span={24} className={styles.bottomContentSection}>
        {map}
      </Col>
    </Row>
  </>
);
