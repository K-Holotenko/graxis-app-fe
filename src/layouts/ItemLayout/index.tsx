import { Col, Row } from 'antd';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface ItemLayoutProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
  bottomContent: ReactNode;
}

export const ItemLayout = ({
  leftContent,
  rightContent,
  bottomContent,
}: ItemLayoutProps) => {
  return (
    <>
      <Row className={styles.topContentContainer}>
        <Col
          xl={{ span: 14 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
          className={styles.leftContentSection}
        >
          {leftContent}
        </Col>
        <Col
          xl={{ span: 10 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
          className={styles.rightContentSection}
        >
          {rightContent}
        </Col>
      </Row>
      <Row className={styles.bottomContentContainer}>
        <Col span={24} className={styles.bottomContentSection}>
          {bottomContent}
        </Col>
      </Row>
    </>
  );
};
