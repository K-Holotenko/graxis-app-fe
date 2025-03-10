import { Col, Row } from 'antd';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface SearchLayoutProps {
  topContent: ReactNode;
  centerContent: ReactNode;
  bottomContent: ReactNode;
}

export const SearchLayout = ({
  topContent,
  centerContent,
  bottomContent,
}: SearchLayoutProps) => (
  <>
    <Row className={styles.topContentContainer}>
      <Col span={24} className={styles.topContentSection}>
        {topContent}
      </Col>
    </Row>
    <Row className={styles.centerContentContainer}>
      <Col span={24} className={styles.centerContentSection}>
        {centerContent}
      </Col>
    </Row>
    <Row className={styles.bottomContentContainer}>
      <Col span={24} className={styles.bottomContentSection}>
        {bottomContent}
      </Col>
    </Row>
  </>
);
