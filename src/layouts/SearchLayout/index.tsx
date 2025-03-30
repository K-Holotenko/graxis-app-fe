import { Col, Row } from 'antd';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface SearchLayoutProps {
  filters: ReactNode;
  publicationsGrids: ReactNode;
  loadMoreButton: ReactNode;
}

export const SearchLayout = ({
  filters,
  publicationsGrids,
  loadMoreButton,
}: SearchLayoutProps) => (
  <>
    <Row className={styles.topContentContainer}>
      <Col span={24} className={styles.topContentSection}>
        {filters}
      </Col>
    </Row>
    <Row className={styles.centerContentContainer}>
      <Col span={24} className={styles.centerContentSection}>
        {publicationsGrids}
      </Col>
    </Row>
    <Row className={styles.bottomContentContainer}>
      <Col span={24} className={styles.bottomContentSection}>
        {loadMoreButton}
      </Col>
    </Row>
  </>
);
