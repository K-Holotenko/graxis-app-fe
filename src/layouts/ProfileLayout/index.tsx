import { Col, Row } from 'antd';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface ItemLayoutProps {
  headerContent: ReactNode;
  leftContent: ReactNode;
  topContent: ReactNode;
  bottomContent: ReactNode;
}

export const ProfileLayout = ({
  headerContent,
  leftContent,
  topContent,
  bottomContent,
}: ItemLayoutProps) => (
  <>
    <Row className={styles.headerContentContainer}>
      <Col span={24} className={styles.headerContentSection}>
        {headerContent}
      </Col>
    </Row>

    <Row className={styles.mainContentContainer}>
      <Col span={6} className={styles.leftContentSection}>
        {leftContent}
      </Col>

      <Col span={18} className={styles.rightContentContainer}>
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
    </Row>
  </>
);
