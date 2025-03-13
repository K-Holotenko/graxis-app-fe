import { Col, Row } from 'antd';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface RightContentSectionProps {
  topContent: ReactNode;
  bottomContent: ReactNode;
}

export const RightContentSection = ({
  topContent,
  bottomContent,
}: RightContentSectionProps) => (
  <Col span={24} className={styles.rightContentContainer}>
    <Row className={styles.rightContentTopContainer}>
      <Col span={24} className={styles.rightContentTopSection}>
        {topContent}
      </Col>
    </Row>
    <Row className={styles.rightContentBottomContainer}>
      <Col span={24} className={styles.rightContentBottomSection}>
        {bottomContent}
      </Col>
    </Row>
  </Col>
);
